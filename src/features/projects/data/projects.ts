export interface Project {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  architecture: string;
  challenges: string;
  outcome: string;
  thumbnailUrl: string;
  screenshots: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "ai-agent-platform",
    title: "AI Agent Platform",
    summary:
      "Next-generation platform for building and deploying AI agents with enterprise-grade tools, skills, and orchestration capabilities.",
    problem:
      "Enterprise customers needed a reliable, scalable way to build, deploy, and manage AI agents that could handle complex customer interactions across voice and digital channels.",
    solution:
      "Contributed to a full-stack platform enabling teams to create AI agents with configurable tools, skills, and workflows — designed for production use at enterprise scale.",
    role: "Full-stack engineer working across the stack on platform features related to AI agent capabilities, tools, and skills.",
    stack: ["TypeScript", "React", "Node.js", "AI/ML", "Cloud Infrastructure"],
    architecture:
      "Microservices architecture with event-driven communication, frontend built with React and TypeScript, backend services in Node.js with cloud-native deployment.",
    challenges:
      "Balancing flexibility with reliability at enterprise scale. Designing abstractions for AI capabilities that are powerful enough for advanced use cases while remaining accessible to non-technical users.",
    outcome:
      "Helping shape the next generation of the platform, making advanced AI capabilities more usable, extensible, and production-ready for enterprise customer experience.",
    thumbnailUrl: "/images/projects/ai-agent-platform.jpg",
    screenshots: [],
    featured: true,
  },
  {
    slug: "developer-tooling-suite",
    title: "Developer Tooling Suite",
    summary:
      "Internal tooling and developer experience improvements to accelerate engineering productivity and code quality.",
    problem:
      "Engineering teams needed faster iteration cycles and better developer experience across a large, distributed codebase.",
    solution:
      "Built internal tools, CI/CD improvements, and developer-facing utilities that reduced friction in the daily development workflow.",
    role: "Full-stack engineer designing and implementing developer tooling and workflow improvements.",
    stack: ["TypeScript", "Node.js", "React", "CI/CD", "Docker"],
    architecture:
      "CLI tools and web-based dashboards integrated into existing development infrastructure, with automated pipelines for testing and deployment.",
    challenges:
      "Maintaining backward compatibility while introducing new tooling. Getting adoption across multiple teams with different workflows.",
    outcome:
      "Measurably improved developer productivity and reduced time-to-deploy across engineering teams.",
    thumbnailUrl: "/images/projects/dev-tooling.jpg",
    screenshots: [],
    featured: true,
  },
  {
    slug: "cloud-migration-platform",
    title: "Cloud Migration Platform",
    summary:
      "Scalable cloud infrastructure migration and modernization for a complex enterprise system.",
    problem:
      "Legacy on-premise systems needed modernization to cloud-native architecture without disrupting existing operations.",
    solution:
      "Designed and implemented a phased migration strategy, rebuilding core services as cloud-native microservices with modern observability and deployment practices.",
    role: "Full-stack engineer leading the technical migration and building new cloud-native services.",
    stack: ["AWS", "TypeScript", "Node.js", "Terraform", "Docker", "PostgreSQL"],
    architecture:
      "Cloud-native microservices on AWS with infrastructure-as-code, containerized deployments, and comprehensive monitoring.",
    challenges:
      "Zero-downtime migration of critical paths. Managing data consistency across old and new systems during the transition period.",
    outcome:
      "Successfully migrated core services to the cloud with improved reliability, scalability, and reduced operational costs.",
    thumbnailUrl: "/images/projects/cloud-migration.jpg",
    screenshots: [],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
