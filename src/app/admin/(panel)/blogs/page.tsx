"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ResourceTable } from "@/components/admin/resource-table";
import { deleteBlog, listBlogs } from "@/lib/admin/storage";
import type { AdminBlog } from "@/lib/admin/types";

export default function AdminBlogsPage() {
  const [items, setItems] = useState<AdminBlog[]>([]);

  useEffect(() => {
    setItems(listBlogs());
  }, []);

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
      <ResourceTable
        basePath="/admin/blogs"
        rows={items.map((item) => ({
          slug: item.slug,
          title: item.title,
          status: item.status,
          meta: `${item.category} · ${item.seo.focusKeyword || "No keyword"}`,
        }))}
        onDelete={(slug) => {
          deleteBlog(slug);
          setItems(listBlogs());
        }}
      />
    </div>
  );
}
