import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import HudButton from "@/features/common/components/hud-button";
import { siteConfig } from "@/features/common/data/site";
import { skillCategories } from "@/features/common/data/skills";
import { experience } from "@/features/common/data/skills";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, working style, technologies, and the kinds of problems I solve as a full-stack software engineer building AI products.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      {/* Intro */}
      <div className="mb-12 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-2 border-border/40 sm:h-48 sm:w-48">
          <Image
            src="/Diego_Schacht.jpg"
            alt="Diego Schacht"
            fill
            className="object-cover object-[center_20%]"
            priority
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium tracking-wider text-accent uppercase">
            About
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            About {siteConfig.name}
          </h1>
        </div>
      </div>

      <div className="prose-section mb-16 space-y-4 text-lg leading-relaxed text-muted-foreground">
        <p>{siteConfig.shortBio}</p>
        <p>
          I care deeply about building things that work well — from the system
          architecture down to the developer experience and the end-user
          interface. I value clean code, clear communication, and shipping
          iteratively.
        </p>
      </div>

      {/* What I Build */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          What I Build
        </h2>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          I work across the stack to build modern web products, AI-powered
          experiences, and platform capabilities. I&apos;m most energized by
          work that sits at the intersection of product thinking and
          engineering depth — where good architecture decisions compound into
          great user experiences.
        </p>
      </section>

      {/* How I Work */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          How I Work
        </h2>
        <ul className="space-y-3 text-muted-foreground">
          {[
            "Ship iteratively — start small, validate, improve.",
            "Write clear, maintainable code that teams can build on.",
            "Own problems end-to-end: from design discussions to deployed features.",
            "Communicate proactively and think in systems, not just features.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Technologies */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          Technologies
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {cat.title}
              </h3>
              <p className="text-foreground">{cat.skills.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          Experience
        </h2>
        <div className="space-y-8">
          {experience.map((entry) => (
            <div
              key={entry.company + entry.period}
              className="border-l-2 border-accent/30 pl-6"
            >
              <h3 className="font-semibold">
                {entry.role}{" "}
                <span className="text-muted-foreground">— {entry.company}</span>
              </h3>
              <p className="mb-3 text-sm text-muted-foreground">
                {entry.period}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* What Fits */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">
          What Kinds of Problems Fit Me
        </h2>
        <ul className="space-y-3 text-muted-foreground">
          {[
            "Greenfield product development where engineering decisions have outsized impact.",
            "Platform and infrastructure work that enables other teams to build faster.",
            "AI product integration — making advanced capabilities production-ready and user-friendly.",
            "Cross-functional collaboration with product, design, and engineering teams.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="rounded-xl border border-border/40 bg-card p-8">
        <h2 className="mb-2 text-xl font-semibold tracking-tight">
          Want to work together?
        </h2>
        <p className="mb-6 text-muted-foreground">
          I&apos;m always open to discussing new opportunities, interesting
          projects, or potential collaborations.
        </p>
        <div className="flex flex-wrap gap-4">
          <HudButton href="/#contact">
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </HudButton>
          <HudButton href="/cv" variant="outline">
            View my CV
          </HudButton>
        </div>
      </div>
    </div>
  );
}
