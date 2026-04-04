import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex flex-col rounded-xl border border-border/40 bg-card p-6 transition-all hover:border-border hover:bg-card/80",
        className
      )}
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      <h3 className="mb-2 text-lg font-semibold tracking-tight">
        {project.title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.summary}
      </p>

      <div className="flex items-center gap-1 text-sm font-medium text-accent">
        View case study
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
