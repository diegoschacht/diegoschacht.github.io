# CLAUDE.md

> AI context file for Claude, Copilot, and other AI assistants.

## ⚠️ Mandatory: Knowledge Graph First

**Before exploring, searching, or modifying this codebase, you MUST read `graphify-out/graph.json` first.** This repository includes a pre-built knowledge graph that maps every component, page, data file, and asset — along with their relationships. Treat it as your primary index.

**Workflow for every task:**
1. Read `graphify-out/graph.json` — find relevant nodes by `label`/`source_file`, trace edges to understand connections.
2. Read `graphify-out/communities.json` if you need to understand which files work together as a group.
3. Only then open specific source files (using `source_file` from the graph nodes) for implementation details.

Do NOT skip to grepping or reading source files directly. The graph is faster, gives you relationship context that grep cannot, and prevents you from missing cross-cutting concerns.

## Project Overview

Personal portfolio website for **Diego Schacht** — a full-stack software engineer building AI products for enterprise CX.

- **Live site:** https://diegoschacht.github.io
- **Framework:** Next.js 15 (App Router) with static export
- **Deployment:** GitHub Pages via GitHub Actions (push to `main` triggers deploy)

## Commands

```bash
npm run dev      # Start dev server (Turbopack) at localhost:3000
npm run build    # Production build → static export to /out
npm run lint     # ESLint (next/core-web-vitelines + next/typescript)
```

No test framework is configured.

## Project Structure

```
src/
├── app/                          # Next.js App Router — pages & metadata
│   ├── layout.tsx                # Root layout (fonts, nav, footer, metadata template)
│   ├── page.tsx                  # Home page
│   ├── not-found.tsx             # 404 page
│   ├── robots.ts                 # robots.txt generation
│   ├── sitemap.ts                # sitemap.xml generation
│   ├── about/page.tsx            # About page
│   ├── cv/page.tsx               # CV page
│   └── projects/
│       ├── page.tsx              # Projects listing
│       └── [slug]/page.tsx       # Dynamic project detail (generateStaticParams)
├── features/                     # Feature-based modules
│   ├── common/
│   │   ├── components/           # NavBar, Footer, ProjectCard, Reveal
│   │   └── data/                 # siteConfig, skillCategories, experience
│   ├── home/components/          # HeroAvatar
│   ├── projects/data/            # projects array, getProjectBySlug(), getFeaturedProjects()
│   └── utils/index.ts            # cn() utility (clsx + tailwind-merge)
├── lib/                          # (empty — reserved for future utilities)
├── data/                         # (empty — reserved for future data)
└── styles/globals.css            # Tailwind v4 theme + CSS variables
```

## Architecture Decisions

- **Static export:** `output: "export"` in next.config.ts — no server runtime, all pages are statically generated.
- **Images unoptimized:** Required for static export (`images: { unoptimized: true }`).
- **Server Components by default:** Pages are server components. Only interactive components use `"use client"`.
- **Feature-based organization:** Code is grouped by feature (`common`, `home`, `projects`), not by type.
- **Centralized data:** All site data lives in `features/*/data/*.ts` — no CMS, no API calls.

## Coding Conventions

### Components
- **Default exports** for all components: `export default function ComponentName()`
- **PascalCase** component names matching file purpose (not file name)
- **Props interfaces** defined inline in the component file
- **Type imports** for types: `import type { Project } from "..."`
- Mark interactive components with `"use client"` at the top (useState, useEffect, Framer Motion)

### Data & Types
- **Named exports** for data constants and utility functions
- **`as const`** on config objects for type narrowing
- **TypeScript interfaces** for all data shapes (Project, SkillCategory, Experience)

### Styling
- **Tailwind CSS v4** exclusively — no CSS modules, no inline styles
- Use `cn()` from `@/features/utils` for conditional classes (clsx + tailwind-merge)
- **CSS variables** for theme tokens defined in `globals.css` under `@theme inline`
- Semantic color names: `bg-accent`, `text-muted-foreground`, `border-border/40`
- **Mobile-first** responsive design: bare classes for mobile, `md:` / `lg:` for larger

### Pages
- Export `metadata` (static) or `generateMetadata()` (dynamic) for SEO
- Use `generateStaticParams()` for dynamic routes
- Call `notFound()` from `next/navigation` for missing dynamic routes
- Metadata uses template: `"%s — Diego Schacht"` from root layout

### Animation
- **Framer Motion** for complex animations (`motion.div`, springs, `useInView`)
- `Reveal` wrapper component for scroll-triggered entrance animations
- Staggered delays for sequential element animations

### Imports
- **Absolute imports** via `@/*` alias (maps to `./src/*`)
- Group order: React/Next → external libs → internal `@/` imports

### Accessibility
- `aria-label` on icon-only buttons/links
- `rel="noopener noreferrer"` on external links
- Semantic HTML: `<nav>`, `<footer>`, `<section>`, `<header>`

## Key Files to Understand

| File | Purpose |
|------|---------|
| `src/features/common/data/site.ts` | Central site config (name, links, metadata) — used everywhere |
| `src/features/projects/data/projects.ts` | All project data + helpers — drives projects pages |
| `src/features/common/data/skills.ts` | Skills and experience data — drives about/cv pages |
| `src/app/layout.tsx` | Root layout with fonts, nav, footer, metadata template |
| `src/features/utils/index.ts` | `cn()` utility for Tailwind class merging |

## Tech Stack

| Category | Tools |
|----------|-------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict mode) |
| UI | React 19, Tailwind CSS 4, Framer Motion |
| Icons | Lucide React |
| Build | Turbopack (dev), static export (prod) |
| Deployment | GitHub Pages via GitHub Actions |
| Linting | ESLint 9 (next/core-web-vitals + next/typescript) |

## Knowledge Graph Reference

The `graphify-out/` directory is your **primary navigation tool** for this repository.

### Files

| File | What it contains |
|------|-----------------|
| `graphify-out/graph.json` | Full knowledge graph — 63 nodes, 103 edges, 5 hyperedges. Every component, page, data file, and asset is a node. Edges capture imports, calls, data sharing, and semantic relationships. |
| `graphify-out/communities.json` | Clustered communities — groups of nodes that work together (shared components, app routes, public assets, etc.). Read this to scope which files a change will touch. |
| `graphify-out/audit.md` | Human-readable audit — confidence breakdown, community summaries, hyperedge descriptions. Skim this for a quick overview. |
| `graphify-out/graph.html` | Interactive browser visualization. |

### Node Schema

Each node in `graph.json` has: `id`, `label`, `file_type` (code/document/paper/image), and `source_file` (relative path to open).

### Edge Schema

Each edge has: `source`, `target`, `relation` (calls/implements/references/shares_data_with/semantically_similar_to), `confidence` (EXTRACTED/INFERRED/AMBIGUOUS), and `confidence_score` (0.0–1.0).

### How to Query

- **Find what a component depends on:** filter edges where `source` matches the node id.
- **Find what uses a data file:** filter edges where `target` matches the data node id.
- **Scope a change:** find the node's community in `communities.json` to see all related files.
- **Understand cross-cutting flows:** read the `hyperedges` array — these capture patterns involving 3+ nodes (SEO pipeline, project display, shared data layer).

### When to Fall Back to Source

Read source files directly only when:
- The graph doesn't have enough detail for your task (e.g., line-level logic).
- You need to verify an INFERRED or AMBIGUOUS edge.
- You're writing or modifying actual code.
