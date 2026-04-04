import type { Metadata } from "next";
import ProjectCard from "@/components/project-card";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects showcasing full-stack engineering, AI product building, and cloud architecture.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="mb-2 text-sm font-medium tracking-wider text-accent uppercase">
        Portfolio
      </p>
      <h1 className="mb-4 text-4xl font-bold tracking-tight">Projects</h1>
      <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
        A selection of projects I&apos;ve worked on — from AI platforms and
        developer tooling to cloud migrations and product engineering.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
