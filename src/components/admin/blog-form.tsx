"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminBlog, BlogFormValues } from "@/lib/admin/types";
import { slugify } from "@/lib/admin/types";
import { BLOG_CATEGORIES } from "@/lib/admin/blog-categories";
import { deleteAdminBlog, saveAdminBlog } from "@/lib/admin/blogs";
import { Field, AdminCard } from "@/components/admin/field";
import { FaqEditor } from "@/components/admin/faq-editor";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/admin/editor/rich-text-editor";
import {
  ARTICLE_BODY_IMAGE_HINT,
  AUTHOR_IMAGE_HINT,
  BLOG_IMAGE_HINT,
} from "@/lib/admin/image-guidelines";
import { CheckCircle2, Circle } from "lucide-react";

function toValues(post?: AdminBlog): BlogFormValues {
  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    bodyHtml: post?.bodyHtml ?? "",
    publishedAt: post?.publishedAt ?? new Date().toISOString().slice(0, 10),
    category: post?.category ?? BLOG_CATEGORIES[0],
    authorName: post?.author.name ?? "Mahraj Fencing Team",
    authorRole: post?.author.role ?? "",
    authorImage: post?.author.image ?? "",
    authorBio: post?.author.bio ?? "",
    image: post?.image ?? "",
    featuredImage: post?.featuredImage ?? "",
    imageAlt: post?.imageAlt ?? "",
    tags: (post?.tags ?? []).join(", "),
    metaTitle: post?.seo.metaTitle ?? "",
    metaDescription: post?.seo.metaDescription ?? "",
    focusKeyword: post?.seo.focusKeyword ?? "",
    faqs: post?.faqs ?? [],
    status: post?.status ?? "draft",
    isFeatured: post?.isFeatured ?? false,
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
      label: "Image alt text is filled",
      ok: values.imageAlt.trim().length > 2,
    },
    {
      label: "Meta description length (50-160)",
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
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const checks = useMemo(() => checklist(values), [values]);

  function set<K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setFormError(null);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!values.image.trim()) {
      setFormError("Add a main image (upload from PC or paste a URL).");
      return;
    }
    const slug = values.slug || slugify(values.title);
    const item: AdminBlog = {
      title: values.title,
      slug,
      excerpt: values.excerpt,
      bodyHtml: values.bodyHtml,
      publishedAt: values.publishedAt,
      category: values.category,
      author: {
        name: values.authorName,
        role: values.authorRole,
        image: values.authorImage,
        bio: values.authorBio,
      },
      image: values.image,
      featuredImage: values.featuredImage,
      imageAlt: values.imageAlt,
      tags: values.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      faqs: values.faqs.filter((f) => f.question.trim() && f.answer.trim()),
      status: values.status,
      isFeatured: values.isFeatured,
      seo: {
        metaTitle: values.metaTitle || values.title,
        metaDescription: values.metaDescription || values.excerpt,
        focusKeyword: values.focusKeyword,
      },
    };
    setPending(true);
    try {
      await saveAdminBlog(item);
      if (initial && initial.slug !== slug) {
        await deleteAdminBlog(initial.slug);
      }
      router.replace("/admin/blogs");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Could not save the blog post.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]"
    >
      <div className="space-y-6">
        <AdminCard title="Blog details">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Blog title" htmlFor="title" className="md:col-span-2">
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
            <Field label="Slug" htmlFor="slug" hint="URL: /blog/your-slug">
              <Input
                id="slug"
                required
                value={values.slug}
                onChange={(e) => set("slug", slugify(e.target.value))}
              />
            </Field>
            <Field label="Category" htmlFor="category">
              <select
                id="category"
                required
                className="flex h-11 w-full rounded-md border border-border bg-background px-3 text-sm"
                value={values.category}
                onChange={(e) => set("category", e.target.value)}
              >
                {BLOG_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Excerpt" htmlFor="excerpt" className="md:col-span-2">
              <Textarea
                id="excerpt"
                required
                rows={3}
                value={values.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
              />
            </Field>
            <Field
              label="Tags"
              htmlFor="tags"
              hint="Comma separated"
              className="md:col-span-2"
            >
              <Input
                id="tags"
                value={values.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="Security, Gates, Specifying"
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard title="SEO">
          <div className="grid gap-4 md:grid-cols-2">
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
            <Field
              label="Meta description"
              htmlFor="metaDescription"
              className="md:col-span-2"
            >
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

        <AdminCard
          title="Featured image"
          description="Shown on blog cards and featured article cards. If blank, the main image is used."
        >
          <Field
            label="Featured image (blog cards)"
            htmlFor="featuredImage"
          >
            <ImageUploadField
              id="featuredImage"
              value={values.featuredImage}
              onChange={(src) => set("featuredImage", src)}
              uploadFolder="blogs/featured"
              hint={BLOG_IMAGE_HINT}
            />
          </Field>
        </AdminCard>

        <AdminCard
          title="Content"
          description={`Use the HTML button to insert tables or custom markup. ${ARTICLE_BODY_IMAGE_HINT}`}
        >
          <RichTextEditor
            value={values.bodyHtml}
            onChange={(html) => set("bodyHtml", html)}
          />
        </AdminCard>

        <AdminCard title="Main image" description={BLOG_IMAGE_HINT}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Main image" htmlFor="image" className="md:col-span-2">
              <ImageUploadField
                id="image"
                value={values.image}
                onChange={(src) => set("image", src)}
                uploadFolder="blogs"
                onAltFromFile={(alt) => {
                  if (!values.imageAlt.trim()) set("imageAlt", alt);
                }}
                hint={BLOG_IMAGE_HINT}
              />
            </Field>
            <Field label="Image alt tag" htmlFor="imageAlt" className="md:col-span-2">
              <Input
                id="imageAlt"
                required
                value={values.imageAlt}
                onChange={(e) => set("imageAlt", e.target.value)}
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard
          title="Author"
          description="Author name, photo, and what the author does."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Author name" htmlFor="authorName">
              <Input
                id="authorName"
                required
                value={values.authorName}
                onChange={(e) => set("authorName", e.target.value)}
              />
            </Field>
            <Field label="What the author does" htmlFor="authorRole">
              <Input
                id="authorRole"
                required
                value={values.authorRole}
                onChange={(e) => set("authorRole", e.target.value)}
                placeholder="e.g. Site engineer, Technical writer"
              />
            </Field>
            <Field
              label="Author image"
              htmlFor="authorImage"
              className="md:col-span-2"
            >
              <ImageUploadField
                id="authorImage"
                value={values.authorImage}
                onChange={(src) => set("authorImage", src)}
                uploadFolder="authors"
                hint={AUTHOR_IMAGE_HINT}
                previewClassName="object-cover"
                previewAspectClassName="aspect-square max-w-40"
              />
            </Field>
            <Field label="Author bio" htmlFor="authorBio" className="md:col-span-2">
              <Textarea
                id="authorBio"
                rows={3}
                value={values.authorBio}
                onChange={(e) => set("authorBio", e.target.value)}
                placeholder="Short bio shown on the article page"
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard
          title="FAQs section"
          description="Optional questions and answers for this blog post."
        >
          <FaqEditor
            faqs={values.faqs}
            onChange={(faqs) => set("faqs", faqs)}
          />
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
            <div>
              <label
                htmlFor="isFeatured"
                className="flex cursor-pointer items-center gap-3 text-sm font-medium text-ink"
              >
                <input
                  id="isFeatured"
                  type="checkbox"
                  className="size-4 accent-brand"
                  checked={values.isFeatured}
                  onChange={(e) => set("isFeatured", e.target.checked)}
                />
                Feature on homepage
              </label>
              <p className="mt-1 pl-7 text-xs text-body">
                Only published featured posts appear on the homepage.
              </p>
            </div>
            <Field label="Published date" htmlFor="publishedAt">
              <Input
                id="publishedAt"
                type="date"
                required
                value={values.publishedAt}
                onChange={(e) => set("publishedAt", e.target.value)}
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
          <Button type="submit" disabled={pending}>
            {pending
              ? "Saving…"
              : mode === "create"
                ? "Create blog post"
                : "Save changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/blogs")}
          >
            Cancel
          </Button>
          {formError ? (
            <span className="text-center text-sm font-medium text-red-600">
              {formError}
            </span>
          ) : null}
        </div>
      </aside>
    </form>
  );
}
