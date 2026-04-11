# diegoschacht.github.io

Personal portfolio website for **Diego Schacht** — a full-stack software engineer building AI products for enterprise customer experience.

🔗 **Live site:** [diegoschacht.github.io](https://diegoschacht.github.io)

## Pages

- **Home** — Hero section, featured projects, skills overview, and contact CTA
- **About** — Background, working style, technologies, experience timeline, and problem-fit areas
- **Projects** — Portfolio of selected projects with detailed case studies
- **CV** — Professional summary, experience, skills, and downloadable PDF

## Tech Stack

| Category       | Tools                                          |
| -------------- | ---------------------------------------------- |
| Framework      | [Next.js 15](https://nextjs.org) (App Router)  |
| Language       | TypeScript 5                                   |
| UI             | React 19, [Tailwind CSS 4](https://tailwindcss.com), [Framer Motion](https://motion.dev) |
| Icons          | [Lucide React](https://lucide.dev)             |
| Build          | Turbopack (dev), static export (prod)          |
| Deployment     | GitHub Pages via GitHub Actions                |
| Linting        | ESLint 9                                       |

## Project Structure

```
src/
├── app/                 # Next.js App Router pages & metadata
│   ├── about/
│   ├── cv/
│   ├── projects/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── features/            # Feature modules
│   ├── common/          # Shared components (navbar, footer) & data (site config, skills)
│   ├── home/            # Homepage-specific components
│   ├── projects/        # Project data & components
│   └── utils/           # Utility functions
└── styles/
    └── globals.css      # Tailwind theme & global styles
```

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (with Turbopack)
npm run dev

# Lint
npm run lint

# Build for production (static export to /out)
npm run build
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Deployment

Pushes to `main` automatically trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the site and deploys it to GitHub Pages.
