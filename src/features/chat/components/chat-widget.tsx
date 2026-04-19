"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, RotateCcw, Send, Square } from "lucide-react";
import { cn } from "@/features/utils";
import { SYSTEM_PROMPT } from "@/features/chat/data/system-prompt";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

type Stage = "idle" | "loading" | "ready" | "error" | "unsupported";

const SUGGESTIONS = [
  "Who is Diego?",
  "What does he work on?",
  "Tell me about his projects",
  "What's his tech stack?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadLoaded, setLoadLoaded] = useState(0);
  const [loadTotal, setLoadTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [tps, setTps] = useState<number | null>(null);
  const [thinkingElapsed, setThinkingElapsed] = useState(0);

  const workerRef = useRef<Worker | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const autoScrollRef = useRef(true);
  const messagesHistoryRef = useRef<ChatMessage[]>([]);
  const optimizeMessageTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const thinkingTimerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const thinkingStartRef = useRef<number>(0);

  // Cleanup on unmount (prevents "message channel closed" errors during Fast Refresh)
  useEffect(() => {
    return () => {
      clearTimeout(optimizeMessageTimeoutRef.current);
      clearInterval(thinkingTimerRef.current);
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const getWorker = useCallback(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL("../worker.ts", import.meta.url),
        { type: "module" }
      );
      workerRef.current.addEventListener("message", (e) => {
        const d = e.data;
        switch (d.status) {
          case "progress_total":
            setLoadProgress(d.progress);
            setLoadLoaded(d.loaded);
            setLoadTotal(d.total);
            if (Number(d.progress) >= 100) {
              clearTimeout(optimizeMessageTimeoutRef.current);
              optimizeMessageTimeoutRef.current = setTimeout(() => {
                setLoadProgress(100);
              }, 100);
            }
            break;
          case "loading":
            break;
          case "ready":
            clearTimeout(optimizeMessageTimeoutRef.current);
            setStage("ready");
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 200);
            break;
          case "start":
            setIsThinking(true);
            setIsStreaming(false);
            setTps(null);
            setThinkingElapsed(0);
            thinkingStartRef.current = Date.now();
            clearInterval(thinkingTimerRef.current);
            thinkingTimerRef.current = setInterval(() => {
              setThinkingElapsed(
                Math.floor((Date.now() - thinkingStartRef.current) / 1000)
              );
            }, 1000);
            break;
          case "prefill_done":
            clearInterval(thinkingTimerRef.current);
            setIsThinking(false);
            setIsStreaming(true);
            setMessages((m) => [...m, { role: "assistant", content: "" }]);
            break;
          case "update":
            if (d.tps != null) setTps(d.tps);
            setMessages((m) => {
              if (m.length === 0) return m;
              const copy = [...m];
              const last = copy[copy.length - 1];
              if (!last || last.role !== "assistant") return m;
              copy[copy.length - 1] = {
                ...last,
                content: last.content + d.output,
              };
              return copy;
            });
            break;
          case "complete":
            setIsStreaming(false);
            break;
          case "error":
            clearTimeout(optimizeMessageTimeoutRef.current);
            setErrorMessage(d.data);
            setStage("error");
            setIsThinking(false);
            setIsStreaming(false);
            break;
        }
      });
    }
    return workerRef.current;
  }, []);

  const handleBubbleClick = async () => {
    if (stage === "idle") {
      // Probe WebGPU properly: check navigator.gpu and requestAdapter()
      try {
        const gpu = (navigator as unknown as { gpu?: { requestAdapter: () => Promise<unknown> } }).gpu;
        const adapter = gpu ? await gpu.requestAdapter() : null;
        if (!adapter) {
          setStage("unsupported");
          setIsOpen(true);
          return;
        }
      } catch {
        setStage("unsupported");
        setIsOpen(true);
        return;
      }
      setStage("loading");
      setLoadProgress(0);
      const worker = getWorker();
      worker.postMessage({ type: "load" });
    } else if (stage === "loading") {
      // Already loading, do nothing
    } else if (stage === "ready") {
      setIsOpen((prev) => !prev);
      if (!isOpen) {
        setTimeout(() => inputRef.current?.focus(), 200);
      }
    } else if (stage === "error" || stage === "unsupported") {
      setIsOpen((prev) => !prev);
    }
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming || isThinking) return;
    setInput("");
    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const nextHistory = [...messagesHistoryRef.current, userMsg];
    setMessages(nextHistory);
    messagesHistoryRef.current = nextHistory;
    setIsThinking(true);

    const withSystem: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...nextHistory,
    ];
    getWorker().postMessage({ type: "generate", data: withSystem });
  };

  const interruptGeneration = () => {
    getWorker().postMessage({ type: "interrupt" });
  };

  const resetChat = () => {
    getWorker().postMessage({ type: "interrupt" });
    setInput("");
    setMessages([]);
    messagesHistoryRef.current = [];
    setIsThinking(false);
    setIsStreaming(false);
    setTps(null);
    setThinkingElapsed(0);
    clearInterval(thinkingTimerRef.current);
    autoScrollRef.current = true;
    getWorker().postMessage({ type: "reset" });
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Track assistant message completions in history ref
  useEffect(() => {
    if (!isStreaming && messages.length > 0) {
      messagesHistoryRef.current = messages;
    }
  }, [isStreaming, messages]);

  // Auto-scroll
  const handleMessagesScroll = useCallback(() => {
    const container = messagesRef.current;
    if (!container) return;
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    autoScrollRef.current = distanceFromBottom < 96;
  }, []);

  useEffect(() => {
    if (!autoScrollRef.current) return;
    const container = messagesRef.current;
    if (!container) return;
    const id = requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: isStreaming ? "auto" : "smooth",
      });
    });
    return () => cancelAnimationFrame(id);
  }, [messages, isThinking, isStreaming]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  let tpsDisplay = "—";
  if (isThinking) tpsDisplay = "···";
  else if (tps !== null) tpsDisplay = tps.toFixed(1);

  // Progress ring SVG calculations
  const ringRadius = 24;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (loadProgress / 100) * ringCircumference;

  const formatBytes = (bytes: number) => {
    if (!bytes) return "0 MB";
    if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
    return `${(bytes / 1e6).toFixed(0)} MB`;
  };

  return (
    <>
      {/* Floating bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleBubbleClick}
          className={cn(
            "group relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 bg-background/60 backdrop-blur-xl",
            stage === "loading"
              ? "cursor-wait shadow-[0_0_0_1px_rgba(59,130,246,0.3)]"
              : "shadow-[0_0_10px_rgba(59,130,246,0.15),0_0_0_1px_rgba(59,130,246,0.5)] hover:shadow-[0_0_24px_rgba(59,130,246,0.35),0_0_0_1px_rgba(59,130,246,0.8)] cursor-pointer hover:scale-105"
          )}
          aria-label={
            stage === "loading"
              ? `Loading AI model: ${Math.round(loadProgress)}%`
              : isOpen
                ? "Close chat"
                : "Open AI chat"
          }
        >
          {/* Progress ring during loading */}
          {stage === "loading" && (
            <svg
              className="absolute inset-0 -rotate-90"
              width="56"
              height="56"
              viewBox="0 0 56 56"
            >
              {/* Background ring */}
              <circle
                cx="28"
                cy="28"
                r={ringRadius}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-muted"
              />
              {/* Progress ring */}
              <circle
                cx="28"
                cy="28"
                r={ringRadius}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                className="text-accent transition-all duration-300 ease-out"
                style={{
                  filter: "drop-shadow(0 0 6px var(--color-accent))",
                }}
              />
            </svg>
          )}

          {/* Pulse glow when loading */}
          {stage === "loading" && (
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/20" />
          )}

          {/* Icon or percentage */}
          {stage === "loading" ? (
            <span className="relative z-10 text-xs font-mono font-bold text-accent-foreground">
              {Math.round(loadProgress)}%
            </span>
          ) : isOpen ? (
            <X className="relative z-10 h-6 w-6 text-accent" />
          ) : (
            <Sparkles className="relative z-10 h-6 w-6 text-accent group-hover:text-white transition-colors animate-sparkle-pulse" />
          )}
        </button>

        {/* Loading tooltip */}
        {stage === "loading" && loadTotal > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-16 right-0 rounded-lg bg-card border border-border/40 px-3 py-2 text-xs font-mono text-muted-foreground shadow-lg whitespace-nowrap"
          >
            {loadProgress < 100
              ? `${formatBytes(loadLoaded)} / ${formatBytes(loadTotal)}`
              : "Optimizing model…"}
          </motion.div>
        )}
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && stage !== "loading" && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed bottom-24 right-6 z-50 flex h-[550px] w-[400px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl bg-background/60 backdrop-blur-xl",
              stage === "error" || stage === "unsupported"
                ? "shadow-[0_0_20px_rgba(59,130,246,0.15),0_0_0_1px_rgba(59,130,246,0.5)]"
                : "border border-border/40 shadow-2xl"
            )}
          >
            {/* Unsupported — no WebGPU */}
            {stage === "unsupported" && (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="text-4xl">💻</div>
                <h3 className="text-lg font-semibold text-foreground">
                  Desktop Required
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This AI assistant runs a language model directly in your
                  browser using WebGPU, which isn&apos;t available on this
                  device. Try again from a laptop or desktop with Chrome, Edge,
                  Safari, or a recent version of Firefox.
                </p>
              </div>
            )}

            {/* Error state */}
            {stage === "error" && (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="text-4xl">❌</div>
                <h3 className="text-lg font-semibold text-foreground">
                  Failed to Load
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {errorMessage}
                </p>
                <button
                  onClick={() => {
                    setStage("idle");
                    setIsOpen(false);
                    setErrorMessage(null);
                  }}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Chat state */}
            {stage === "ready" && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/40 bg-background px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground leading-none">
                        Diego&apos;s AI
                      </h3>
                      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                        {tpsDisplay} tok/s · Bonsai 1.7B · WebGPU
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={resetChat}
                      className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      aria-label="Reset chat"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      aria-label="Close chat"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div
                  ref={messagesRef}
                  onScroll={handleMessagesScroll}
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                >
                  {messages.length === 0 && !isThinking ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                      <Sparkles className="h-10 w-10 text-accent/50 animate-sparkle-pulse" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          Ask me anything about Diego
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Running locally in your browser · No data leaves your
                          device
                        </p>
                      </div>
                      <div className="grid w-full grid-cols-1 gap-2 mt-2">
                        {SUGGESTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={() => sendMessage(s)}
                            className="rounded-lg border border-border/40 bg-background px-3 py-2.5 text-left text-xs text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/30 transition-all duration-200"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {messages.map((m, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex flex-col gap-1 max-w-[85%]",
                            m.role === "user"
                              ? "ml-auto items-end"
                              : "items-start"
                          )}
                        >
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                            {m.role === "user" ? "You" : "Bonsai 1.7B"}
                          </span>
                          <div
                            className={cn(
                              "rounded-lg px-3 py-2 text-sm leading-relaxed",
                              m.role === "user"
                                ? "bg-accent text-accent-foreground rounded-br-sm"
                                : "bg-muted/50 text-foreground border border-border/40 rounded-bl-sm"
                            )}
                          >
                            {m.role === "assistant" ? (
                              <div className="prose prose-invert prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                                {m.content || (
                                  <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
                                )}
                              </div>
                            ) : (
                              <span className="whitespace-pre-wrap">
                                {m.content}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                      {isThinking && (
                        <div className="flex flex-col gap-1 max-w-[85%] items-start">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                            Bonsai 1.7B
                          </span>
                          <div className="relative rounded-lg px-3 py-2.5 text-sm rounded-bl-sm flex items-center gap-3 text-muted-foreground border border-accent/30 animate-hud-glow-border">
                            <Sparkles className="h-4 w-4 text-accent animate-sparkle-pulse shrink-0" />
                            <span className="text-xs">Thinking</span>
                            <span className="text-[10px] font-mono text-muted-foreground/60 tabular-nums">
                              {thinkingElapsed}s
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Composer */}
                <div className="border-t border-border/40 bg-background p-3 flex gap-2 items-end">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Diego…"
                    rows={1}
                    className="flex-1 resize-none rounded-lg border border-border/40 bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-colors min-h-[40px] max-h-[120px]"
                  />
                  {isStreaming || isThinking ? (
                    <button
                      onClick={interruptGeneration}
                      className="group/hud relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md overflow-hidden bg-transparent text-muted-foreground transition-all duration-300 ease-out shadow-[0_0_0_1px_rgba(59,130,246,0.2)] hover:shadow-[0_0_16px_rgba(59,130,246,0.2),0_0_0_1px_rgba(59,130,246,0.5)] hover:text-accent active:scale-[0.98]"
                      aria-label="Stop generating"
                    >
                      <Square className="relative z-10 h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim()}
                      className="group/hud relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md overflow-hidden bg-transparent text-accent font-medium transition-all duration-300 ease-out shadow-[0_0_10px_rgba(59,130,246,0.15),0_0_0_1px_rgba(59,130,246,0.5)] hover:shadow-[0_0_24px_rgba(59,130,246,0.35),0_0_0_1px_rgba(59,130,246,0.8)] hover:text-accent-foreground active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-[0_0_10px_rgba(59,130,246,0.15),0_0_0_1px_rgba(59,130,246,0.5)]"
                      aria-label="Send message"
                    >
                      <Send className="relative z-10 h-4 w-4" />
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
