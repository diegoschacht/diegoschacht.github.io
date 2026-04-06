const isProd = process.env.NODE_ENV === "production";

export const basePath = isProd ? "/personal-website" : "";

export const siteConfig = {
  name: "Diego Schacht",
  title: "Diego Schacht — Full-Stack Engineer",
  description:
    "Full-stack software engineer building AI products for enterprise customer experience. Portfolio showcasing projects, skills, and technical depth.",
  url: "https://diegoschacht.github.io/personal-website",
  github: "https://github.com/diegoschacht",
  linkedin: "https://linkedin.com/in/diego-schacht",
  role: "Full-Stack Software Engineer",
  company: "NiCE Cognigy",
  headline:
    "Full-stack engineer building AI products for enterprise customer experience",
  subheadline:
    "I build modern product experiences and platform capabilities across frontend and backend systems, with a current focus on AI agents, tools, and skills for enterprise customer experience.",
  shortBio:
    "I'm a full-stack software engineer focused on building products that turn complex systems into usable, real-world value. My background spans cloud platforms, backend systems, and modern web development. Today, I work at NiCE Cognigy on the next generation of an AI-first customer experience platform, with a strong focus on AI agents, tools, and skills.",
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/cv", label: "CV" },
  ],
} as const;
