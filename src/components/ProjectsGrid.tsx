import ProjectCard from './ProjectCard';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  techTags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  );
}
