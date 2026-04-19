"use client";

import { useState, useEffect, useRef } from "react";

const roles = [
  "Full-Stack Software Engineer",
  "AI Builder",
  "Product Engineer",
  "Cloud Architect",
  "Systems Thinker",
];

const TYPING_SPEED = 60;
const DELETING_SPEED = 35;
const PAUSE_AFTER_TYPING = 2200;
const PAUSE_AFTER_DELETING = 400;

export default function TypingRoles() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const roleRef = useRef(0);

  useEffect(() => {
    const current = roles[roleRef.current];

    let delay: number;

    if (!isDeleting) {
      if (text.length < current.length) {
        delay = TYPING_SPEED;
      } else {
        delay = PAUSE_AFTER_TYPING;
      }
    } else {
      if (text.length > 0) {
        delay = DELETING_SPEED;
      } else {
        delay = PAUSE_AFTER_DELETING;
      }
    }

    const timer = setTimeout(() => {
      const current = roles[roleRef.current];

      if (!isDeleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          roleRef.current = (roleRef.current + 1) % roles.length;
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  return (
    <span className="inline-block border-l-2 border-accent bg-accent/10 px-3 py-1.5 text-xs font-semibold tracking-widest text-foreground uppercase">
      {text}
      <span className="ml-0.5 inline-block w-[2px] h-3.5 bg-accent animate-pulse align-middle" />
    </span>
  );
}
