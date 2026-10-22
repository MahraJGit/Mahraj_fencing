import type { AdminBlog } from "@/lib/admin/types";
import type { AdminProduct, AdminService } from "@/lib/admin/types";

export type BlogPostRow = {
  slug: string;
  title: string;
  excerpt: string;
  body_html: string;
  published_at: string;
  category: string;
  author: AdminBlog["author"];
  image: string;
  featured_image: string;
  image_alt: string;
  tags: string[];
  faqs: AdminBlog["faqs"];
  status: AdminBlog["status"];
  is_featured: boolean;
  seo: AdminBlog["seo"];
  created_at: string;
  updated_at: string;
};

type BlogPostInsert = Omit<BlogPostRow, "created_at" | "updated_at">;

type CatalogRow<T> = T & {
  created_at: string;
  updated_at: string;
};

type CatalogInsert<T> = T & {
  created_at?: string;
  updated_at?: string;
};

type CatalogTable<Row, Insert> = {
  Row: Row;
  Insert: Insert;
  Update: Partial<Insert>;
  Relationships: [];
};

export type ProductRow = CatalogRow<{
  slug: string;
  title: string;
  short_description: string;
  description: string;
  category: AdminProduct["category"];
  image: string;
  featured_image: string;
  image_alt: string;
  gallery: string[];
  features: string[];
  applications: string[];
  seo: AdminProduct["seo"];
  status: AdminProduct["status"];
  is_featured: boolean;
  sort_order: number;
}>;
export type ServiceRow = CatalogRow<{
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  featured_image: string;
  image_alt: string;
  highlights: string[];
  seo: AdminService["seo"];
  status: AdminService["status"];
  is_featured: boolean;
  sort_order: number;
}>;
export type ProductInsert = CatalogInsert<Omit<ProductRow, "created_at" | "updated_at">>;
export type ServiceInsert = CatalogInsert<Omit<ServiceRow, "created_at" | "updated_at">>;

export type Database = {
  public: {
    Tables: {
      products: CatalogTable<ProductRow, ProductInsert>;
      services: CatalogTable<ServiceRow, ServiceInsert>;
      catalog_seed_state: CatalogTable<
        { version: string; created_at: string },
        { version: string; created_at?: string }
      >;
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
