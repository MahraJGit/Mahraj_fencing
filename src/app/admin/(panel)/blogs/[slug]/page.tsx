"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";
import { getAdminBlog } from "@/lib/admin/blogs";
import type { AdminBlog } from "@/lib/admin/types";

export default function EditBlogPage() {
  const params = useParams<{ slug: string }>();
  const [item, setItem] = useState<AdminBlog | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getAdminBlog(params.slug)
      .then((blog) => {
        if (active) setItem(blog);
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load the blog post.",
          );
        }
      });

    return () => {
      active = false;
    };
  }, [params.slug]);

  if (error) {
    return (
      <p className="text-sm text-red-600" role="alert">
        {error}
      </p>
    );
  }

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
