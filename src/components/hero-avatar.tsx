"use client";

import { useRef } from "react";
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

/*
 * Icon positions are percentages in a 400x400 coordinate system.
 * They sit on a right-side semicircle (r = 185, center 200,200) at angles
 * -90°, -30°, 30°, 90° measured from 3-o'clock (60° apart for 4 icons).
 * `transform: translate(-50%,-50%)` centres each 40px circle on the point.
 */
const iconPositions = [
  { top: "3.75%", left: "50%" },        // -90° (top)
  { top: "26.9%", left: "90.1%" },      // -30°
  { top: "73.1%", left: "90.1%" },      //  30°
  { top: "96.25%", left: "50%" },       //  90° (bottom)
];

export default function HeroAvatar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-35% 0px -35% 0px" });

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      {/* Container — overflow visible so icons at the edge aren't clipped */}
      <div className="relative h-[320px] w-[320px] overflow-visible lg:h-[400px] lg:w-[400px]">

        {/* SVG Arc — right-side curve passing through all icons */}
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 400 400"
          fill="none"
        >
          <defs>
            <filter id="neon-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            </filter>
            <filter id="neon-blur-wide" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            </filter>
            {/* Brightness mask: dim at top/bottom, bright in the middle */}
            <linearGradient id="brightness-grad" gradientUnits="userSpaceOnUse" x1="200" y1="0" x2="200" y2="400">
              <stop offset="0%" stopColor="white" stopOpacity="0.1" />
              <stop offset="40%" stopColor="white" stopOpacity="1" />
              <stop offset="60%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
            <mask id="arc-brightness-mask" maskUnits="userSpaceOnUse" x="-50" y="-50" width="500" height="500">
              <rect x="-50" y="-50" width="500" height="500" fill="url(#brightness-grad)" />
            </mask>
          </defs>
          {/*
           * Arc from (200,15) to (200,385) — a 180° clockwise sweep
           * on the right side of the photo, through the icon positions.
           * r=185, centre at (200,200), angles -90° to +90°.
           *
           * Arc length ≈ π × 185 ≈ 581px.
           * The neon pulse is a 160px dash (dim→bright→dim via gradient)
           * travelling along 581px, so dasharray = "160 421".
           */}
          {/* Dim base arc — always visible after draw */}
          <motion.path
            d="M 200 15 A 185 185 0 0 1 200 385"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.15"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
          />
          {/* Neon pulse group — masked so it's dim at top/bottom, bright in the middle */}
          <g mask="url(#arc-brightness-mask)">
          {/* Outer neon glow — wide and soft, moves along the arc */}
          <motion.path
            d="M 200 15 A 185 185 0 0 1 200 385"
            stroke="var(--color-accent)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            filter="url(#neon-blur-wide)"
            strokeDasharray="160 421"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={
              isInView
                ? { strokeDashoffset: -581, opacity: [0, 0.5, 0.5] }
                : { strokeDashoffset: 0, opacity: 0 }
            }
            transition={
              isInView
                ? {
                    strokeDashoffset: {
                      duration: 3.5,
                      ease: "linear",
                      repeat: Infinity,
                      delay: 2.1,
                    },
                    opacity: {
                      duration: 0.4,
                      delay: 2.1,
                      times: [0, 0.01, 1],
                    },
                  }
                : { duration: 0 }
            }
          />
          {/* Inner neon glow — tighter, brighter */}
          <motion.path
            d="M 200 15 A 185 185 0 0 1 200 385"
            stroke="var(--color-accent)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            filter="url(#neon-blur)"
            strokeDasharray="160 421"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={
              isInView
                ? { strokeDashoffset: -581, opacity: [0, 0.8, 0.8] }
                : { strokeDashoffset: 0, opacity: 0 }
            }
            transition={
              isInView
                ? {
                    strokeDashoffset: {
                      duration: 3.5,
                      ease: "linear",
                      repeat: Infinity,
                      delay: 2.1,
                    },
                    opacity: {
                      duration: 0.4,
                      delay: 2.1,
                      times: [0, 0.01, 1],
                    },
                  }
                : { duration: 0 }
            }
          />
          {/* Core bright pulse — crisp line that travels along the arc */}
          <motion.path
            d="M 200 15 A 185 185 0 0 1 200 385"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="160 421"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={
              isInView
                ? { strokeDashoffset: -581, opacity: [0, 1, 1] }
                : { strokeDashoffset: 0, opacity: 0 }
            }
            transition={
              isInView
                ? {
                    strokeDashoffset: {
                      duration: 3.5,
                      ease: "linear",
                      repeat: Infinity,
                      delay: 2.1,
                    },
                    opacity: {
                      duration: 0.4,
                      delay: 2.1,
                      times: [0, 0.01, 1],
                    },
                  }
                : { duration: 0 }
            }
          />
          </g>
          {/* Dot at arc start (top) */}
          <motion.circle
            cx="200"
            cy="15"
            r="5"
            fill="var(--color-accent)"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          />
          {/* Dot at arc end (bottom) */}
          <motion.circle
            cx="200"
            cy="385"
            r="5"
            fill="var(--color-accent)"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, delay: 2.0 }}
          />
        </svg>

        {/* Circular profile photo */}
        <div className="absolute inset-[12%] overflow-hidden rounded-full border-2 border-border/30">
          <Image
            src="/Diego_Schacht.jpg"
            alt="Diego Schacht"
            fill
            priority
            className="object-cover object-[center_20%]"
            sizes="(max-width: 1024px) 320px, 400px"
          />
        </div>

        {/* Navigation icons — positioned on the arc */}
        {navIcons.map((item, i) => (
          <motion.div
            key={item.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              top: iconPositions[i].top,
              left: iconPositions[i].left,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{
              duration: 0.3,
              delay: 1.0 + i * 0.15,
              ease: "easeOut",
            }}
          >
            <div className="relative h-10 w-10">
              <Link
                href={item.href}
                aria-label={item.label}
                className="group absolute left-0 top-0 flex h-10 items-center rounded-full border border-border/60 bg-card/80 px-3 text-muted-foreground backdrop-blur-sm transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="inline-block max-w-0 overflow-hidden whitespace-nowrap pl-0 text-xs font-medium opacity-0 transition-all duration-500 ease-in-out group-hover:max-w-[80px] group-hover:pl-2 group-hover:opacity-100">
                  {item.label}
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
