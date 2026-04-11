# Graphify Audit Report

**Corpus:** 28 files, ~17,304 words
**Graph:** 63 nodes, 103 edges, 5 hyperedges
**Communities:** 10

## Edge Confidence Breakdown
- EXTRACTED: 92 (89%)
- INFERRED: 11 (10%)
- AMBIGUOUS: 0 (0%)

## Communities
### Shared Components and Config (25 nodes)
  - `robots` - robots.ts (code)
  - `robots_robots` - robots() (code)
  - `site` - site.ts (code)
  - `footer` - footer.tsx (code)
  - `nav_bar` - nav-bar.tsx (code)
  - `layout` - layout.tsx (code)
  - `page` - page.tsx (code)
  - `sitemap` - sitemap.ts (code)
  - `footer_footer` - Footer() (code)
  - `nav_bar_navbar` - NavBar() (code)
  - ... and 15 more

### Shared Components and Config (21 nodes)
  - `next_config` - Next.js Config (Static Export) (code)
  - `pattern_static_export` - Static Site Generation Pattern (code)
  - `robots_handler` - Robots.txt Handler (code)
  - `sitemap_handler` - Sitemap Handler (code)
  - `page_project_detail` - Project Detail Page (Dynamic) (code)
  - `site_siteconfig` - Site Configuration (code)
  - `projects_data` - Projects Data & Helpers (code)
  - `page_about` - About Page (code)
  - `page_home` - Home Page (code)
  - `component_footer` - Footer Component (code)
  - ... and 11 more

### Public Assets (4 nodes)
  - `readme_project_overview` - Project Overview (README) (document)
  - `photo_diego` - Diego Schacht Profile Photo (image)
  - `cv_pdf` - Diego Schacht CV (PDF) (paper)
  - `readme_project_structure` - Project Structure Documentation (document)

### Public Assets (4 nodes)
  - `readme_tech_stack` - Tech Stack Documentation (document)
  - `readme_deployment` - Deployment Strategy (GitHub Pages) (document)
  - `logo_vercel` - Vercel Logo (SVG Triangle) (image)
  - `logo_nextjs` - Next.js Logo (SVG) (image)

### App Routes and Pages (2 nodes)
  - `not_found` - not-found.tsx (code)
  - `not_found_notfound` - NotFound() (code)

### Cluster 4 (2 nodes)
  - `index` - index.ts (code)
  - `index_cn` - cn() (code)

### Public Assets (2 nodes)
  - `icon_globe` - Globe Icon (SVG) (image)
  - `icon_window` - Browser Window Icon (SVG) (image)

### Cluster 0 (1 nodes)
  - `next_env_d` - next-env.d.ts (code)

### App Routes and Pages (1 nodes)
  - `page_notfound` - 404 Not Found Page (code)

### Public Assets (1 nodes)
  - `icon_file` - File Document Icon (SVG) (image)

## Hyperedges
  - **SEO & Discovery Generation**: robots_handler, sitemap_handler, site_siteconfig, projects_data, layout_root (participate_in, score=0.85)
  - **Project Data Display Pipeline**: projects_data, component_projectcard, page_projects, page_project_detail, page_home (participate_in, score=0.9)
  - **Shared Personal Brand Data Layer**: site_siteconfig, skills_skillcategories, skills_experience, page_about, page_cv, page_home (form, score=0.8)
  - **Personal Brand Assets**: photo_diego, cv_pdf, readme_project_overview (form, score=0.75)
  - **Next.js Ecosystem Branding**: logo_nextjs, logo_vercel, icon_globe, icon_window, icon_file (form, score=0.7)
