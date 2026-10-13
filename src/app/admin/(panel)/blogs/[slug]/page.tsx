"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";
import { listBlogs } from "@/lib/admin/storage";
import type { AdminBlog } from "@/lib/admin/types";

export default function EditBlogPage() {
  const params = useParams<{ slug: string }>();
  const [item, setItem] = useState<AdminBlog | null | undefined>(undefined);

  useEffect(() => {
    const found = listBlogs().find((b) => b.slug === params.slug) ?? null;
    setItem(found);
  }, [params.slug]);

  if (item === undefined) {
    return <p className="text-sm text-body">Loading…</p>;
  }

  if (!item) {
    return <p className="text-sm text-body">Blog post not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink">Edit blog post</h1>
        <p className="mt-1 font-mono text-xs text-body">{item.slug}</p>
      </div>
      <BlogForm mode="edit" initial={item} />
    </div>
  );
}
