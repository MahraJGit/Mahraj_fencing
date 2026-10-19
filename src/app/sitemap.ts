import type { MetadataRoute } from "next";
import { io } from "next/cache";
import { siteConfig } from "@/content/site";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { getPublishedBlogs } from "@/lib/admin/blogs";

const base = siteConfig.url.replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await io();
  const blogPosts = await getPublishedBlogs();
  const staticRoutes = [
    "",
    "/about",
    "/products",
    "/services",
    "/projects",
    "/gallery",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const lastModified = new Date("2026-01-01T00:00:00.000Z");

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...products.map((product) => ({
      url: `${base}/products/${product.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...services.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
