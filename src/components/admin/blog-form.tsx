"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminBlog, BlogFormValues } from "@/lib/admin/types";
import { slugify } from "@/lib/admin/types";
import { upsertBlog } from "@/lib/admin/storage";
import { Field, AdminCard } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/admin/editor/rich-text-editor";
import { CheckCircle2, Circle } from "lucide-react";

function toValues(post?: AdminBlog): BlogFormValues {
  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    bodyHtml: post?.bodyHtml ?? "",
    publishedAt: post?.publishedAt ?? new Date().toISOString().slice(0, 10),
    author: post?.author ?? "Mahraj Fencing Team",
    image: post?.image ?? "",
    imageAlt: post?.imageAlt ?? "",
    tags: (post?.tags ?? []).join(", "),
    metaTitle: post?.seo.metaTitle ?? "",
    metaDescription: post?.seo.metaDescription ?? "",
    focusKeyword: post?.seo.focusKeyword ?? "",
    status: post?.status ?? "draft",
  };
}

function checklist(values: BlogFormValues) {
  const kw = values.focusKeyword.trim().toLowerCase();
  const title = (values.metaTitle || values.title).toLowerCase();
  const desc = values.metaDescription.toLowerCase();
  const body = values.bodyHtml.toLowerCase();
  return [
    {
      label: "Keyword appears in the meta title",
      ok: Boolean(kw && title.includes(kw)),
    },
    {
      label: "Keyword appears in the description",
      ok: Boolean(kw && desc.includes(kw)),
    },
    {
      label: "Keyword appears in the content",
      ok: Boolean(kw && body.includes(kw)),
    },
    {
      label: "Alt text is filled",
      ok: values.imageAlt.trim().length > 2,
    },
    {
      label: "Meta description length (50–160)",
      ok:
        values.metaDescription.length >= 50 &&
        values.metaDescription.length <= 160,
    },
  ];
}

export function BlogForm({
  initial,
  mode,
}: {
  initial?: AdminBlog;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [values, setValues] = useState<BlogFormValues>(() => toValues(initial));
  const [saved, setSaved] = useState(false);
  const checks = useMemo(() => checklist(values), [values]);

  function set<K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = values.slug || slugify(values.title);
    const item: AdminBlog = {
      title: values.title,
      slug,
      excerpt: values.excerpt,
      bodyHtml: values.bodyHtml,
      publishedAt: values.publishedAt,
      author: values.author,
      image: values.image,
      imageAlt: values.imageAlt,
      tags: values.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status: values.status,
      seo: {
        metaTitle: values.metaTitle || values.title,
        metaDescription: values.metaDescription || values.excerpt,
        focusKeyword: values.focusKeyword,
      },
    };
    upsertBlog(item);
    setSaved(true);
    if (mode === "create") router.push(`/admin/blogs/${slug}`);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-6">
        <AdminCard title="Article">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" htmlFor="title" className="md:col-span-2">
              <Input
                id="title"
                required
                value={values.title}
                onChange={(e) => {
                  set("title", e.target.value);
                  if (mode === "create") set("slug", slugify(e.target.value));
                }}
              />
            </Field>
            <Field label="Slug" htmlFor="slug">
              <Input
                id="slug"
                required
                value={values.slug}
                onChange={(e) => set("slug", slugify(e.target.value))}
              />
            </Field>
            <Field label="Author" htmlFor="author">
              <Input
                id="author"
                required
                value={values.author}
                onChange={(e) => set("author", e.target.value)}
              />
            </Field>
            <Field label="Excerpt" htmlFor="excerpt" className="md:col-span-2">
              <Textarea
                id="excerpt"
                required
                rows={2}
                value={values.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard
          title="Content"
          description="Use the HTML button to insert tables or custom markup."
        >
          <RichTextEditor
            value={values.bodyHtml}
            onChange={(html) => set("bodyHtml", html)}
          />
        </AdminCard>

        <AdminCard title="Cover image">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Image URL" htmlFor="image">
              <Input
                id="image"
                required
                value={values.image}
                onChange={(e) => set("image", e.target.value)}
              />
            </Field>
            <Field label="Alt text" htmlFor="imageAlt">
              <Input
                id="imageAlt"
                required
                value={values.imageAlt}
                onChange={(e) => set("imageAlt", e.target.value)}
              />
            </Field>
          </div>
        </AdminCard>
      </div>

      <aside className="space-y-6">
        <AdminCard title="Publish">
          <div className="space-y-4">
            <Field label="Status" htmlFor="status">
              <select
                id="status"
                className="flex h-11 w-full rounded-md border border-border bg-background px-3 text-sm"
                value={values.status}
                onChange={(e) =>
                  set("status", e.target.value as "draft" | "published")
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
            <Field label="Publish date" htmlFor="publishedAt">
              <Input
                id="publishedAt"
                type="date"
                required
                value={values.publishedAt}
                onChange={(e) => set("publishedAt", e.target.value)}
              />
            </Field>
            <Field label="Tags" htmlFor="tags" hint="Comma separated">
              <Input
                id="tags"
                value={values.tags}
                onChange={(e) => set("tags", e.target.value)}
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard title="SEO">
          <div className="space-y-4">
            <Field label="Focus keyword" htmlFor="focusKeyword">
              <Input
                id="focusKeyword"
                required
                value={values.focusKeyword}
                onChange={(e) => set("focusKeyword", e.target.value)}
              />
            </Field>
            <Field label="Meta title" htmlFor="metaTitle">
              <Input
                id="metaTitle"
                required
                value={values.metaTitle}
                onChange={(e) => set("metaTitle", e.target.value)}
              />
            </Field>
            <Field label="Meta description" htmlFor="metaDescription">
              <Textarea
                id="metaDescription"
                required
                rows={4}
                value={values.metaDescription}
                onChange={(e) => set("metaDescription", e.target.value)}
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard title="SEO checklist">
          <ul className="space-y-2">
            {checks.map((item) => (
              <li key={item.label} className="flex items-start gap-2 text-sm">
                {item.ok ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-body/40" />
                )}
                <span className={item.ok ? "text-ink" : "text-body"}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </AdminCard>

        <div className="flex flex-col gap-2">
          <Button type="submit">
            {mode === "create" ? "Create blog post" : "Save changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/blogs")}
          >
            Cancel
          </Button>
          {saved ? (
            <span className="text-center text-sm font-medium text-emerald-700">
              Saved locally.
            </span>
          ) : null}
        </div>
      </aside>
    </form>
  );
}
