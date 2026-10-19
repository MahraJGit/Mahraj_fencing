import type { AdminBlog } from "@/lib/admin/types";
import type { BlogPostRow } from "@/lib/supabase/database";
import {
  createPublicSupabaseClient,
  getSupabaseClient,
} from "@/lib/supabase/client";

function fromRow(row: BlogPostRow): AdminBlog {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    bodyHtml: row.body_html,
    publishedAt: row.published_at,
    category: row.category,
    author: row.author,
    image: row.image,
    imageAlt: row.image_alt,
    tags: row.tags,
    faqs: row.faqs,
    status: row.status,
    seo: row.seo,
  };
}

function toRow(blog: AdminBlog) {
  return {
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    body_html: blog.bodyHtml,
    published_at: blog.publishedAt,
    category: blog.category,
    author: blog.author,
    image: blog.image,
    image_alt: blog.imageAlt,
    tags: blog.tags,
    faqs: blog.faqs,
    status: blog.status,
    seo: blog.seo,
  };
}

export async function listAdminBlogs(): Promise<AdminBlog[]> {
  const { data, error } = await getSupabaseClient()
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data.map(fromRow);
}

export async function getAdminBlog(slug: string): Promise<AdminBlog | null> {
  const { data, error } = await getSupabaseClient()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? fromRow(data) : null;
}

export async function saveAdminBlog(blog: AdminBlog): Promise<void> {
  const { error } = await getSupabaseClient()
    .from("blog_posts")
    .upsert(toRow(blog), { onConflict: "slug" });

  if (error) throw error;
}

export async function deleteAdminBlog(slug: string): Promise<void> {
  const { error } = await getSupabaseClient()
    .from("blog_posts")
    .delete()
    .eq("slug", slug);

  if (error) throw error;
}

export async function getPublishedBlogs(): Promise<AdminBlog[]> {
  const { data, error } = await createPublicSupabaseClient()
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data.map(fromRow);
}

export async function getPublishedBlog(slug: string): Promise<AdminBlog | null> {
  const { data, error } = await createPublicSupabaseClient()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data ? fromRow(data) : null;
}
