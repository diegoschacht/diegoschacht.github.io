import type { Metadata } from "next";
import Link from "next/link";
import { Download, Github, Linkedin, ArrowRight } from "lucide-react";
import { siteConfig, basePath } from "@/features/common/data/site";
import { experience } from "@/features/common/data/skills";
import { skillCategories } from "@/features/common/data/skills";

export const metadata: Metadata = {
  title: "CV",
  description: `Curriculum vitae of ${siteConfig.name} — full-stack software engineer building AI products for enterprise customer experience.`,
};

export default function CVPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      {/* Header */}
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            {siteConfig.name}
          </h1>
          <p className="text-lg text-muted-foreground">{siteConfig.role}</p>
        </div>
        <a
          href={`${basePath}/diego-schacht-cv.pdf`}
          download
          className="inline-flex items-center gap-2 shrink-0 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      </div>

      {/* Contact Info */}
      <section className="mb-12 flex flex-wrap gap-6 text-sm text-muted-foreground">
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </section>

      {/* Summary */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Summary
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          {siteConfig.shortBio}
        </p>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Experience
        </h2>
        <div className="space-y-8">
          {experience.map((entry) => (
            <div key={entry.company + entry.period}>
              <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold">
                  {entry.role}{" "}
                  <span className="text-muted-foreground">
                    — {entry.company}
                  </span>
                </h3>
                <span className="text-sm text-muted-foreground">
                  {entry.period}
                </span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
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

      {/* Skills */}
      <section className="mb-12">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Skills
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {skillCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="mb-1 text-sm font-semibold">{cat.title}</h3>
              <p className="text-sm text-muted-foreground">
                {cat.skills.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="border-t border-border/40 pt-8">
        <p className="mb-4 text-muted-foreground">
          Interested in working together?
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            View my work
          </Link>
        </div>
      </div>
    </div>
  );
}
