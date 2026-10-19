import type { AdminBlog } from "@/lib/admin/types";

export type BlogPostRow = {
  slug: string;
  title: string;
  excerpt: string;
  body_html: string;
  published_at: string;
  category: string;
  author: AdminBlog["author"];
  image: string;
  image_alt: string;
  tags: string[];
  faqs: AdminBlog["faqs"];
  status: AdminBlog["status"];
  seo: AdminBlog["seo"];
  created_at: string;
  updated_at: string;
};

type BlogPostInsert = Omit<BlogPostRow, "created_at" | "updated_at">;

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: BlogPostRow;
        Insert: BlogPostInsert;
        Update: Partial<BlogPostInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
