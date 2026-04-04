import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects, getProjectBySlug } from "@/features/projects/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const sections = [
    { label: "Overview", content: project.summary },
    { label: "Problem", content: project.problem },
    { label: "Solution", content: project.solution },
    { label: "Architecture & Technical Decisions", content: project.architecture },
    { label: "My Role", content: project.role },
    { label: "Challenges & Trade-offs", content: project.challenges },
    { label: "Outcome & Impact", content: project.outcome },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      {/* Back link */}
      <Link
        href="/projects"
        className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All projects
      </Link>

      {/* Header */}
      <header className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          {project.title}
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">{project.summary}</p>

        {/* Stack */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Github className="h-4 w-4" />
              Repository
            </a>
          )}
        </div>
      </header>

      {/* Case Study Sections */}
      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.label}>
            <h2 className="mb-3 text-xl font-semibold tracking-tight">
              {section.label}
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {section.content}
            </p>
          </section>
        ))}

        {/* Stack Detail */}
        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">
            Technology Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Back to projects */}
      <div className="mt-16 border-t border-border/40 pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all projects
        </Link>
      </div>
    </div>
  );
}
