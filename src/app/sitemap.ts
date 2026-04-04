import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  const staticRoutes = [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/projects`, lastModified: new Date() },
    { url: `${siteConfig.url}/about`, lastModified: new Date() },
    { url: `${siteConfig.url}/cv`, lastModified: new Date() },
  ];

  return [...staticRoutes, ...projectRoutes];
}
