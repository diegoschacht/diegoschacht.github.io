export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "GraphQL", "PostgreSQL"],
  },
  {
    title: "AI & Product Engineering",
    skills: ["AI Agents", "LLM Integration", "Prompt Engineering", "Product Development"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Docker", "CI/CD", "Terraform", "Monitoring"],
  },
  {
    title: "Architecture & Systems",
    skills: ["Microservices", "Event-Driven Design", "API Design", "Clean Architecture"],
  },
];

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  current?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    company: "NiCE Cognigy",
    role: "Full-Stack Software Engineer",
    period: "October 2025 – Present",
    current: true,
    bullets: [
      "Working on the next generation of the platform with a strong focus on AI agents and product capabilities for enterprise customer experience.",
      "Contributing across the stack to build and improve platform features related to tools, skills, and agent workflows.",
      "Helping shape product experiences that make advanced AI capabilities more usable, extensible, and production-ready.",
    ],
  },
];
