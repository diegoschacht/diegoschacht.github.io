"use client";

import { useState, useEffect } from "react";

interface TypewriterOnceProps {
  text: string;
  speed?: number;
  delay?: number;
}

export default function TypewriterOnce({
  text,
  speed = 60,
  delay = 0,
}: TypewriterOnceProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (delay <= 0) {
      setStarted(true);
      return;
    }
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started || displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  const done = displayed.length >= text.length;

  return (
    <span className="inline-block border-l-2 border-accent bg-accent/10 px-3 py-1.5 text-xs font-semibold tracking-widest text-foreground uppercase">
      {displayed}
      {!done && (
        <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-accent align-middle" />
      )}
    </span>
  );
}
