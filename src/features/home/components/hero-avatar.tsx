"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { User, Briefcase, Monitor, Send } from "lucide-react";

const navIcons = [
  { icon: User, href: "/about", label: "About" },
  { icon: Briefcase, href: "/projects", label: "Projects" },
  { icon: Monitor, href: "/cv", label: "CV" },
  { icon: Send, href: "/#contact", label: "Contact" },
];

const iconPositions = [
  { top: "3.75%", left: "50%" },
  { top: "26.9%", left: "90.1%" },
  { top: "73.1%", left: "90.1%" },
  { top: "96.25%", left: "50%" },
];

/* Concentric ring configs: radius, dash pattern, rotation direction, delay */
const rings = [
  { r: 170, dash: "6 8",  dir: 1,  delay: 0.0, speed: 40 },
  { r: 182, dash: "3 12", dir: -1, delay: 0.25, speed: 55 },
  { r: 194, dash: "10 6", dir: 1,  delay: 0.5, speed: 35 },
];

/* Gauge tick marks on the outermost ring */
const r2 = (n: number) => Math.round(n * 100) / 100;

const tickCount = 60;
const ticks = Array.from({ length: tickCount }, (_, i) => {
  const angle = (i / tickCount) * 360;
  const rad = (angle * Math.PI) / 180;
  const long = i % 5 === 0;
  return {
    angle,
    x1: r2(200 + (long ? 195 : 197) * Math.cos(rad)),
    y1: r2(200 + (long ? 195 : 197) * Math.sin(rad)),
    x2: r2(200 + 202 * Math.cos(rad)),
    y2: r2(200 + 202 * Math.sin(rad)),
    long,
  };
});

/* Arc segments — 8 segments of ~40° each, with small gaps */
const arcSegments = Array.from({ length: 8 }, (_, i) => {
  const startAngle = i * 45 + 3;
  const endAngle = startAngle + 39;
  const r = 160;
  const x1 = r2(200 + r * Math.cos((startAngle * Math.PI) / 180));
  const y1 = r2(200 + r * Math.sin((startAngle * Math.PI) / 180));
  const x2 = r2(200 + r * Math.cos((endAngle * Math.PI) / 180));
  const y2 = r2(200 + r * Math.sin((endAngle * Math.PI) / 180));
  return { d: `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`, delay: i * 0.12 };
});

/* Particles — pre-computed for SSR safety */
const particles = [
  { angle: 25, dist: 40 }, { angle: 67, dist: 55 }, { angle: 110, dist: 35 },
  { angle: 145, dist: 60 }, { angle: 190, dist: 45 }, { angle: 220, dist: 50 },
  { angle: 260, dist: 38 }, { angle: 295, dist: 58 }, { angle: 330, dist: 42 },
  { angle: 355, dist: 52 }, { angle: 50, dist: 48 }, { angle: 170, dist: 44 },
];

export default function HeroAvatar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-35% 0px -35% 0px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Close expanded nav icon when tapping outside (touch devices only)
  useEffect(() => {
    if (expandedIndex === null) return;
    const handleTouchOutside = (e: TouchEvent) => {
      if (!(e.target as HTMLElement).closest("[data-nav-icon]")) {
        setExpandedIndex(null);
      }
    };
    document.addEventListener("touchstart", handleTouchOutside);
    return () => document.removeEventListener("touchstart", handleTouchOutside);
  }, [expandedIndex]);

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <div className="relative h-[320px] w-[320px] overflow-visible lg:h-[400px] lg:w-[400px]">

        {/* ── Holographic Boot Sequence HUD ── */}
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 400 400"
          fill="none"
        >
          <defs>
            <filter id="hud-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
            </filter>
            <filter id="hud-glow-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
            </filter>
          </defs>

          {/* ── CONCENTRIC RINGS — expand outward with tick marks ── */}
          {rings.map((ring, i) => (
            <motion.g
              key={i}
              initial={{ rotate: 0 }}
              animate={isInView ? { rotate: ring.dir * 360 } : { rotate: 0 }}
              transition={{
                duration: ring.speed,
                ease: "linear",
                repeat: Infinity,
                delay: 1.0 + ring.delay,
              }}
              style={{ transformOrigin: "200px 200px" }}
            >
              <motion.circle
                cx="200" cy="200" r={ring.r}
                stroke="var(--color-accent)"
                strokeWidth={i === 0 ? "1.2" : "0.8"}
                strokeDasharray={ring.dash}
                fill="none"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: i === 0 ? 0.35 : 0.2 } : { scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + ring.delay }}
                style={{ transformOrigin: "200px 200px" }}
              />
            </motion.g>
          ))}

          {/* Gauge ticks on outermost ring */}
          {ticks.map((t, i) => (
            <motion.line
              key={i}
              x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke="var(--color-accent)"
              strokeWidth={t.long ? "1.2" : "0.6"}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: t.long ? 0.4 : 0.2 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + i * 0.008 }}
            />
          ))}

          {/* ── ARC SEGMENTS — draw in sequentially like loading ── */}
          {arcSegments.map((seg, i) => (
            <motion.path
              key={`seg-${i}`}
              d={seg.d}
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 + seg.delay }}
            />
          ))}

          {/* ── PARTICLES — scatter outward like holographic static ── */}
          {particles.map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const startR = 120;
            const endR = startR + p.dist;
            return (
              <motion.circle
                key={`p-${i}`}
                cx={200 + startR * Math.cos(rad)}
                cy={200 + startR * Math.sin(rad)}
                r="1.5"
                fill="var(--color-accent)"
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={
                  isInView
                    ? {
                        opacity: [0, 0.7, 0],
                        x: (endR - startR) * Math.cos(rad),
                        y: (endR - startR) * Math.sin(rad),
                      }
                    : { opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  delay: 1.0 + i * 0.1,
                  ease: "easeOut",
                  opacity: { times: [0, 0.3, 1] },
                }}
              />
            );
          })}

          {/* ── RIGHT-SIDE ARC (base for nav icons) ── */}
          <motion.path
            d="M 200 15 A 185 185 0 0 1 200 385"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.2 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Neon pulse traveling along arc */}
          <motion.path
            d="M 200 15 A 185 185 0 0 1 200 385"
            stroke="var(--color-accent)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            filter="url(#hud-glow)"
            strokeDasharray="80 501"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={
              isInView
                ? { strokeDashoffset: -581, opacity: [0, 0.5, 0.5] }
                : { strokeDashoffset: 0, opacity: 0 }
            }
            transition={
              isInView
                ? {
                    strokeDashoffset: { duration: 3, ease: "linear", repeat: Infinity, delay: 2.8 },
                    opacity: { duration: 0.4, delay: 2.8, times: [0, 0.01, 1] },
                  }
                : { duration: 0 }
            }
          />
          <motion.path
            d="M 200 15 A 185 185 0 0 1 200 385"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="80 501"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={
              isInView
                ? { strokeDashoffset: -581, opacity: [0, 0.9, 0.9] }
                : { strokeDashoffset: 0, opacity: 0 }
            }
            transition={
              isInView
                ? {
                    strokeDashoffset: { duration: 3, ease: "linear", repeat: Infinity, delay: 2.8 },
                    opacity: { duration: 0.4, delay: 2.8, times: [0, 0.01, 1] },
                  }
                : { duration: 0 }
            }
          />

          {/* Arc endpoint dots */}
          <motion.circle
            cx="200" cy="15" r="4"
            fill="var(--color-accent)"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          />
          <motion.circle
            cx="200" cy="385" r="4"
            fill="var(--color-accent)"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, delay: 1.8 }}
          />
        </svg>

        {/* ── PHOTO ── */}
        <div className="absolute inset-[12%] overflow-hidden rounded-full border border-accent/20">
          <Image
            src="/Diego_Schacht.jpg"
            alt="Diego Schacht"
            fill
            priority
            className="object-cover object-[center_20%]"
            sizes="(max-width: 1024px) 320px, 400px"
          />
        </div>

        {/* ── NAV ICONS — slide in along arc with bounce ── */}
        {navIcons.map((item, i) => {
          const isExpanded = expandedIndex === i;
          return (
            <motion.div
              key={item.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                top: iconPositions[i].top,
                left: iconPositions[i].left,
              }}
              initial={{ opacity: 0, scale: 0.3, x: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.3, x: -20 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: 2.0 + i * 0.15,
              }}
            >
              <div className="relative h-10 w-10" data-nav-icon>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  onClick={(e) => {
                    // On hover-capable devices, let normal link behavior proceed
                    if (window.matchMedia("(hover: hover)").matches) return;
                    // Touch: first tap expands, second tap navigates
                    if (!isExpanded) {
                      e.preventDefault();
                      setExpandedIndex(i);
                    } else {
                      setExpandedIndex(null);
                    }
                  }}
                  className={`group absolute left-0 top-0 flex h-10 items-center rounded-full border bg-card/80 px-3 backdrop-blur-sm transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] ${
                    isExpanded
                      ? "border-accent text-accent shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                      : "border-border/60 text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span
                    className={`inline-block overflow-hidden whitespace-nowrap text-xs font-medium transition-all duration-500 ease-in-out group-hover:max-w-[80px] group-hover:pl-2 group-hover:opacity-100 ${
                      isExpanded
                        ? "max-w-[80px] pl-2 opacity-100"
                        : "max-w-0 pl-0 opacity-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
