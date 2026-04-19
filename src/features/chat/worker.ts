import {
  pipeline,
  TextStreamer,
  DynamicCache,
  InterruptableStoppingCriteria,
  type TextGenerationPipeline as TGPipeline,
  type ProgressInfo,
} from "@huggingface/transformers";

const MODEL_ID = "onnx-community/Bonsai-1.7B-ONNX";

class TextGenerationPipeline {
  static instance: Promise<TGPipeline> | null = null;

  static getInstance(
    progressCallback?: (info: ProgressInfo) => void
  ): Promise<TGPipeline> {
    if (!this.instance) {
      this.instance = pipeline("text-generation", MODEL_ID, {
        device: "webgpu",
        dtype: "q1" as never,
        progress_callback: progressCallback,
      }) as Promise<TGPipeline>;
    }
    return this.instance;
  }
}

const stoppingCriteria = new InterruptableStoppingCriteria();
let pastKeyValuesCache: DynamicCache | null = null;

function disposePastKeyValues() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (pastKeyValuesCache as any)?.dispose?.();
  pastKeyValuesCache = null;
}

async function load() {
  // Probe WebGPU inside the worker before downloading anything
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gpu = (navigator as any).gpu;
    const adapter = gpu ? await gpu.requestAdapter() : null;
    if (!adapter) {
      console.log("[chat-worker] WebGPU not available");
      self.postMessage({ status: "unsupported" });
      return;
    }
  } catch {
    console.log("[chat-worker] WebGPU probe failed");
    self.postMessage({ status: "unsupported" });
    return;
  }

  console.log("[chat-worker] WebGPU available, starting model load...");
  self.postMessage({ status: "loading", data: "Loading model..." });

  try {
    const loadStart = performance.now();
    const generator = await TextGenerationPipeline.getInstance(
      (info: ProgressInfo) => {
        if (info.status === "progress") {
          self.postMessage({
            status: "progress_total",
            progress: Number((info as never as { progress: number }).progress ?? 0),
            loaded: Number((info as never as { loaded: number }).loaded ?? 0),
            total: Number((info as never as { total: number }).total ?? 0),
          });
        }
      }
    );

    console.log(`[chat-worker] Model loaded in ${((performance.now() - loadStart) / 1000).toFixed(1)}s`);
    self.postMessage({
      status: "loading",
      data: "Optimizing model for 1-bit execution",
    });

    const warmupStart = performance.now();
    const inputs = generator.tokenizer("a");
    await generator.model.generate({ ...inputs, max_new_tokens: 1 });
    console.log(`[chat-worker] Warmup done in ${((performance.now() - warmupStart) / 1000).toFixed(1)}s`);

    self.postMessage({ status: "ready" });
  } catch (e) {
    console.error("[chat-worker] Load error:", e);
    self.postMessage({ status: "error", data: String(e) });
  }
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

async function generate(messages: ChatMessage[]) {
  try {
    const generator = await TextGenerationPipeline.getInstance();

    const inputTokenCount = messages.reduce((acc, m) => acc + m.content.length, 0);
    console.log(`[chat-worker] Generating: ${messages.length} messages, ~${inputTokenCount} chars`);
    const prefillStart = performance.now();

    let startTime: number | undefined;
    let numTokens = 0;
    let tps: number | undefined;
    let prefillTime: number | undefined;

    const streamer = new TextStreamer(generator.tokenizer, {
      skip_prompt: true,
      skip_special_tokens: true,
      callback_function: (output: string) => {
        self.postMessage({ status: "update", output, tps, numTokens });
      },
      token_callback_function: () => {
        if (!startTime) {
          startTime = performance.now();
          prefillTime = startTime - prefillStart;
          console.log(`[chat-worker] Prefill took ${(prefillTime / 1000).toFixed(1)}s`);
          self.postMessage({ status: "prefill_done", prefillMs: prefillTime });
        }
        if (numTokens++ > 0) {
          tps = (numTokens / (performance.now() - startTime!)) * 1000;
        }
      },
    });

    self.postMessage({ status: "start" });

    pastKeyValuesCache ??= new DynamicCache();

    const output = await generator(messages, {
      max_new_tokens: 1024,
      do_sample: false,
      streamer,
      stopping_criteria: stoppingCriteria,
      past_key_values: pastKeyValuesCache,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const generated = output as any;
    const lastMessage =
      generated?.[0]?.generated_text?.at?.(-1)?.content ?? "";

    const totalTime = ((performance.now() - prefillStart) / 1000).toFixed(1);
    console.log(`[chat-worker] Generation complete: ${numTokens} tokens in ${totalTime}s (prefill: ${((prefillTime ?? 0) / 1000).toFixed(1)}s)`);

    self.postMessage({ status: "complete", output: lastMessage });
  } catch (e) {
    console.error("[chat-worker] Generate error:", e);
    self.postMessage({ status: "error", data: String(e) });
  }
}

self.addEventListener("message", async (e: MessageEvent) => {
  const { type, data } = e.data;
  switch (type) {
    case "load":
      load();
      break;
    case "generate":
      stoppingCriteria.reset();
      generate(data);
      break;
    case "interrupt":
      stoppingCriteria.interrupt();
      break;
    case "reset":
      disposePastKeyValues();
      stoppingCriteria.reset();
      break;
  }
});
