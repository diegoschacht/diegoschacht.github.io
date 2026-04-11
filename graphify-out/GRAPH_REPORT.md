# Graph Report - .  (2026-04-11)

## Corpus Check
- Corpus is ~18,805 words - fits in a single context window. You may not need a graph.

## Summary
- 59 nodes · 58 edges · 12 communities detected
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `CLAUDE.md AI Context File` - 6 edges
2. `Architecture Decisions` - 5 edges
3. `Next.js 15 (App Router)` - 4 edges
4. `Project Overview (README)` - 3 edges
5. `Tech Stack Documentation` - 3 edges
6. `Diego Schacht` - 3 edges
7. `Project Structure Documentation` - 2 edges
8. `Deployment Strategy (GitHub Pages)` - 2 edges
9. `Knowledge Graph First Workflow` - 2 edges
10. `Knowledge Graph Reference` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Project Structure Documentation` --semantically_similar_to--> `CLAUDE.md AI Context File`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Project Overview (README)` --semantically_similar_to--> `CLAUDE.md AI Context File`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Tech Stack Documentation` --semantically_similar_to--> `Architecture Decisions`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Diego Schacht CV (PDF)` --references--> `Diego Schacht`  [INFERRED]
  public/diego-schacht-cv.pdf → README.md
- `Diego Schacht Professional Headshot` --references--> `Diego Schacht`  [INFERRED]
  public/Diego_Schacht.jpg → README.md

## Hyperedges (group relationships)
- **Personal Brand Assets** — photo_diego, cv_pdf, entity_diego_schacht, readme_project_overview [INFERRED 0.80]
- **Architecture Decision Rationales** — rationale_static_export, rationale_feature_org, rationale_centralized_data, rationale_images_unoptimized, rationale_server_components, claude_md_arch_decisions [EXTRACTED 0.90]
- **Next.js Ecosystem Branding** — logo_nextjs, logo_vercel, icon_globe, icon_window, icon_file [INFERRED 0.70]

## Communities

### Community 0 - "Site Layout & Navigation"
Cohesion: 0.22
Nodes (0): 

### Community 1 - "Projects & Components"
Cohesion: 0.2
Nodes (0): 

### Community 2 - "Portfolio & Branding"
Cohesion: 0.2
Nodes (9): Diego Schacht CV (PDF), Diego Schacht, GitHub Pages Deployment, Diego Schacht Professional Headshot, Deployment Strategy (GitHub Pages), Site Pages Description, Project Overview (README), Project Structure Documentation (+1 more)

### Community 3 - "AI Context & Architecture"
Cohesion: 0.25
Nodes (9): Graphify Audit Report, CLAUDE.md AI Context File, Architecture Decisions, Coding Conventions, Knowledge Graph First Workflow, Knowledge Graph Reference, Centralized Data Rationale, Feature-Based Organization Rationale (+1 more)

### Community 4 - "Next.js Platform"
Cohesion: 0.4
Nodes (5): Next.js 15 (App Router), Next.js Logo (SVG Wordmark), Vercel Logo (SVG Triangle), Images Unoptimized Rationale, Static Export Rationale

### Community 5 - "Hero Animation"
Cohesion: 0.67
Nodes (0): 

### Community 6 - "UI Icons"
Cohesion: 0.67
Nodes (3): File Document Icon (SVG), Globe Icon (SVG), Browser Window Icon (SVG)

### Community 7 - "404 Page"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Utility Functions"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "TypeScript Config"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Next.js Config"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Getting Started"
Cohesion: 1.0
Nodes (1): Getting Started Commands

## Knowledge Gaps
- **14 isolated node(s):** `Site Pages Description`, `Getting Started Commands`, `Coding Conventions`, `Feature-Based Organization Rationale`, `Centralized Data Rationale` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `404 Page`** (2 nodes): `not-found.tsx`, `NotFound()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Utility Functions`** (2 nodes): `index.ts`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `TypeScript Config`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Config`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Getting Started`** (1 nodes): `Getting Started Commands`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Tech Stack Documentation` connect `Portfolio & Branding` to `AI Context & Architecture`, `Next.js Platform`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `CLAUDE.md AI Context File` connect `AI Context & Architecture` to `Portfolio & Branding`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `Architecture Decisions` connect `AI Context & Architecture` to `Portfolio & Branding`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `CLAUDE.md AI Context File` (e.g. with `Project Overview (README)` and `Project Structure Documentation`) actually correct?**
  _`CLAUDE.md AI Context File` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Next.js 15 (App Router)` (e.g. with `Vercel Logo (SVG Triangle)` and `Next.js Logo (SVG Wordmark)`) actually correct?**
  _`Next.js 15 (App Router)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Site Pages Description`, `Getting Started Commands`, `Coding Conventions` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._