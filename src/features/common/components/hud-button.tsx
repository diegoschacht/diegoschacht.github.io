"use client";

import Link from "next/link";
import { cn } from "@/features/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline";
type Size = "sm" | "md" | "lg";

interface HudButtonBaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type HudLinkProps = HudButtonBaseProps & {
  as?: "link";
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">;

type HudAnchorProps = HudButtonBaseProps & {
  as: "a";
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, "className" | "children">;

type HudButtonElementProps = HudButtonBaseProps & {
  as: "button";
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

type HudButtonProps = HudLinkProps | HudAnchorProps | HudButtonElementProps;

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-3.5 text-sm gap-2",
};

const variantClasses: Record<Variant, string> = {
  primary: [
    "bg-transparent text-accent font-medium",
    "shadow-[0_0_10px_rgba(59,130,246,0.15),0_0_0_1px_rgba(59,130,246,0.5)]",
    "hover:shadow-[0_0_24px_rgba(59,130,246,0.35),0_0_0_1px_rgba(59,130,246,0.8)]",
    "hover:text-accent-foreground",
    "active:shadow-[0_0_8px_rgba(59,130,246,0.2),0_0_0_1px_rgba(59,130,246,0.5)]",
    "active:scale-[0.98]",
  ].join(" "),
  outline: [
    "bg-transparent text-muted-foreground font-medium",
    "shadow-[0_0_0_1px_rgba(59,130,246,0.2)]",
    "hover:shadow-[0_0_16px_rgba(59,130,246,0.2),0_0_0_1px_rgba(59,130,246,0.5)]",
    "hover:text-accent",
    "active:shadow-[0_0_6px_rgba(59,130,246,0.15),0_0_0_1px_rgba(59,130,246,0.3)]",
    "active:scale-[0.98]",
  ].join(" "),
};

const baseClasses = [
  "group/hud relative inline-flex items-center justify-center",
  "rounded-md overflow-hidden",
  "transition-all duration-300 ease-out",
  "cursor-pointer select-none",
].join(" ");

export default function HudButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: HudButtonProps) {
  const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

  const ringOverlay = (
    <>
      {/* Static ring border */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        aria-hidden="true"
      >
        <span className="absolute inset-[-1px] rounded-[inherit] bg-accent/50 transition-all duration-300 group-hover/hud:bg-accent/80" />
        <span className="absolute inset-[0.5px] rounded-[inherit] bg-background" />
      </span>
    </>
  );

  const content = (
    <>
      {ringOverlay}
      <span className="relative z-10 inline-flex items-center gap-[inherit]">{children}</span>
    </>
  );

  const as = (rest as { as?: string }).as ?? "link";

  if (as === "button") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as: _as, ...buttonProps } = rest as HudButtonElementProps;
    return (
      <button className={classes} {...buttonProps}>
        {content}
      </button>
    );
  }

  if (as === "a") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as: _as, href, ...anchorProps } = rest as HudAnchorProps;
    return (
      <a className={classes} href={href} {...anchorProps}>
        {content}
      </a>
    );
  }

  // Default: Next.js Link
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as: _as, href, ...linkProps } = rest as HudLinkProps;
  return (
    <Link className={classes} href={href} {...linkProps}>
      {content}
    </Link>
  );
}
