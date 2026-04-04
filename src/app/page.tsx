"use client";

import Link from "next/link";
import {
  ArrowRight,
  Github,
  Linkedin,
  Code2,
  Server,
  Brain,
  Cloud,
  Layers,
} from "lucide-react";
import Reveal from "@/components/reveal";
import HeroAvatar from "@/components/hero-avatar";
import ProjectCard from "@/components/project-card";
import { siteConfig } from "@/data/site";
import { getFeaturedProjects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ReactNode> = {
  Frontend: <Code2 className="h-5 w-5" />,
  Backend: <Server className="h-5 w-5" />,
  "AI & Product Engineering": <Brain className="h-5 w-5" />,
  "Cloud & DevOps": <Cloud className="h-5 w-5" />,
  "Architecture & Systems": <Layers className="h-5 w-5" />,
};

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 pb-28 pt-10 lg:flex-row lg:items-center lg:gap-16 lg:pt-28">
          {/* Left column — text content */}
          <div className="flex-1 text-center lg:text-left">
            <Reveal>
              <p className="mb-6 inline-block border-b-2 border-accent pb-1 text-lg font-bold tracking-wider text-accent uppercase italic">
                Hi there!
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
                I&apos;m{" "}
                <span className="text-accent">Diego</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mb-6 flex flex-col items-center gap-2 lg:items-start">
                <span className="inline-block border-l-2 border-accent bg-accent/10 px-3 py-1.5 text-xs font-semibold tracking-widest text-foreground uppercase">
                  Full-Stack Software Engineer
                </span>
                <span className="inline-block border-l-2 border-accent bg-accent/10 px-3 py-1.5 text-xs font-semibold tracking-widest text-foreground uppercase">
                  AI for Enterprise CX
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground lg:mx-0">
                {siteConfig.subheadline}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10 flex justify-center lg:justify-start">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold tracking-wide text-accent-foreground uppercase transition-colors hover:bg-accent/90"
                >
                  More About Me
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right column — avatar with arc & nav icons */}
          <div className="flex-shrink-0">
            <Reveal delay={0.1}>
              <HeroAvatar />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Credibility Strip ── */}
      <section className="border-y border-border/40 bg-card/50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 py-8 text-sm text-muted-foreground">
          {[
            "Full-Stack Engineering",
            "AI Product Building",
            "React / Next.js / TypeScript",
            "Node.js / Cloud Infrastructure",
            "Clean Architecture",
          ].map((item) => (
            <span key={item} className="whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 text-sm font-medium tracking-wider text-accent uppercase">
                Selected Work
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── Skills / Capabilities ── */}
      <section className="border-t border-border/40 bg-card/30">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="mb-2 text-sm font-medium tracking-wider text-accent uppercase">
              Capabilities
            </p>
            <h2 className="mb-12 text-3xl font-bold tracking-tight">
              Skills &amp; Expertise
            </h2>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.05}>
                <div className="rounded-xl border border-border/40 bg-card p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 text-accent">
                      {iconMap[cat.title]}
                    </div>
                    <h3 className="font-semibold tracking-tight">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Snapshot ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="mb-2 text-sm font-medium tracking-wider text-accent uppercase">
            About
          </p>
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            A bit about me
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {siteConfig.shortBio}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent/80"
          >
            Read more about me
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* ── Contact CTA ── */}
      <section
        id="contact"
        className="border-t border-border/40 bg-card/30"
      >
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <Reveal>
            <p className="mb-2 text-sm font-medium tracking-wider text-accent uppercase">
              Get in Touch
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Interested in working together?
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-muted-foreground">
              Whether you want to talk about a product, role, or collaboration
              — I&apos;d love to hear from you.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
