import type { Product, ProductCategory } from "@/content/products";
import type { Service } from "@/content/services";

export type AdminProduct = Product & {
  featuredImage: string;
  status: "draft" | "published";
  isFeatured: boolean;
  imageAlt: string;
  sortOrder: number;
};

export type AdminService = Service & {
  featuredImage: string;
  status: "draft" | "published";
  isFeatured: boolean;
  imageAlt: string;
  sortOrder: number;
};

export type AdminBlogFaq = {
  question: string;
  answer: string;
};

export type AdminBlogAuthor = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

export type AdminBlog = {
  slug: string;
  title: string;
  excerpt: string;
  bodyHtml: string;
  publishedAt: string;
  category: string;
  author: AdminBlogAuthor;
  image: string;
  featuredImage: string;
  imageAlt: string;
  tags: string[];
  faqs: AdminBlogFaq[];
  status: "draft" | "published";
  isFeatured: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeyword: string;
  };
};

export type ProductFormValues = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  image: string;
  featuredImage: string;
  imageAlt: string;
  isFeatured: boolean;
  gallery: string[];
  features: string;
  applications: string;
  seoTitle: string;
  seoDescription: string;
  status: "draft" | "published";
};

export type ServiceFormValues = {
  title: string;
  slug: string;
  summary: string;
  descriptionHtml: string;
  image: string;
  featuredImage: string;
  imageAlt: string;
  isFeatured: boolean;
  highlights: string;
  seoTitle: string;
  seoDescription: string;
  status: "draft" | "published";
};

export type BlogFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  bodyHtml: string;
  publishedAt: string;
  category: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
  authorBio: string;
  image: string;
  featuredImage: string;
  imageAlt: string;
  tags: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  faqs: AdminBlogFaq[];
  status: "draft" | "published";
  isFeatured: boolean;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
