import { products } from "@/content/products";
import { services } from "@/content/services";
import { blogPosts } from "@/content/blog";
import type { AdminBlog, AdminProduct, AdminService } from "./types";

export function seedProducts(): AdminProduct[] {
  return products.map((product) => ({
    ...product,
    status: "published" as const,
  }));
}

export function seedServices(): AdminService[] {
  return services.map((service) => ({
    ...service,
    status: "published" as const,
  }));
}

export function seedBlogs(): AdminBlog[] {
  return blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    bodyHtml: post.body.map((p) => `<p>${p}</p>`).join(""),
    publishedAt: post.publishedAt,
    author: post.author,
    image: post.image,
    imageAlt: post.title,
    tags: post.tags,
    status: "published" as const,
    seo: {
      metaTitle: post.seo.title,
      metaDescription: post.seo.description,
      focusKeyword: post.tags[0] ?? "fencing",
    },
  }));
}
