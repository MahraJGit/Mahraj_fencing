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
    category: post.tags[0] ?? "Specifying",
    author: {
      name: post.author,
      role: "Technical writer, Mahraj Fencing",
      image: "/images/logo.png",
      bio: "Writes practical guidance on fencing supply, installation, and site operations across the UAE and KSA.",
    },
    image: post.image,
    imageAlt: post.title,
    tags: post.tags,
    faqs: [
      {
        question: `What is this article about?`,
        answer: post.excerpt,
      },
    ],
    status: "published" as const,
    seo: {
      metaTitle: post.seo.title,
      metaDescription: post.seo.description,
      focusKeyword: post.tags[0] ?? "fencing",
    },
  }));
}
