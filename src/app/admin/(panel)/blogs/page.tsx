"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ResourceTable } from "@/components/admin/resource-table";
import { deleteAdminBlog, listAdminBlogs } from "@/lib/admin/blogs";
import type { AdminBlog } from "@/lib/admin/types";

export default function AdminBlogsPage() {
  const [items, setItems] = useState<AdminBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    listAdminBlogs()
      .then((blogs) => {
        if (active) setItems(blogs);
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load blog posts.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function deleteBlog(slug: string) {
    setError(null);
    try {
      await deleteAdminBlog(slug);
      setItems((current) => current.filter((item) => item.slug !== slug));
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete the blog post.",
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-ink">Blogs</h1>
          <p className="mt-1 text-sm text-body">
            SEO meta, author, category, FAQs, and rich HTML content.
          </p>
        </div>
        <ButtonLink href="/admin/blogs/new" size="sm">
          <Plus className="h-4 w-4" />
          New blog
        </ButtonLink>
      </div>
      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      {loading ? (
        <p className="text-sm text-body">Loading blog posts…</p>
      ) : (
        <ResourceTable
          basePath="/admin/blogs"
          rows={items.map((item) => ({
            slug: item.slug,
            title: item.title,
            status: item.status,
            meta: `${item.category} · ${item.seo.focusKeyword || "No keyword"}`,
          }))}
          onDelete={deleteBlog}
        />
      )}
    </div>
  );
}
