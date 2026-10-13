"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminService, ServiceFormValues } from "@/lib/admin/types";
import { slugify } from "@/lib/admin/types";
import { upsertService } from "@/lib/admin/storage";
import { Field, AdminCard } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/admin/editor/rich-text-editor";

function toValues(service?: AdminService): ServiceFormValues {
  return {
    title: service?.title ?? "",
    slug: service?.slug ?? "",
    summary: service?.summary ?? "",
    descriptionHtml: service?.description
      ? `<p>${service.description}</p>`
      : "",
    image: service?.image ?? "",
    imageAlt: service?.title ?? "",
    highlights: (service?.highlights ?? []).join("\n"),
    seoTitle: service?.seo.title ?? "",
    seoDescription: service?.seo.description ?? "",
    status: service?.status ?? "draft",
  };
}

export function ServiceForm({
  initial,
  mode,
}: {
  initial?: AdminService;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [values, setValues] = useState<ServiceFormValues>(() => toValues(initial));
  const [saved, setSaved] = useState(false);

  function set<K extends keyof ServiceFormValues>(key: K, value: ServiceFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = values.slug || slugify(values.title);
    const item: AdminService = {
      title: values.title,
      slug,
      summary: values.summary,
      description: values.descriptionHtml.replace(/<[^>]+>/g, " ").trim(),
      image: values.image,
      highlights: values.highlights
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      seo: {
        title: values.seoTitle || values.title,
        description: values.seoDescription || values.summary,
      },
      status: values.status,
    };
    upsertService(item);
    setSaved(true);
    if (mode === "create") router.push(`/admin/services/${slug}`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <AdminCard title="Service details">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title" htmlFor="title">
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
          <Field label="Summary" htmlFor="summary" className="md:col-span-2">
            <Textarea
              id="summary"
              required
              rows={2}
              value={values.summary}
              onChange={(e) => set("summary", e.target.value)}
            />
          </Field>
        </div>
      </AdminCard>

      <AdminCard title="Description" description="Rich text with HTML block support.">
        <RichTextEditor
          value={values.descriptionHtml}
          onChange={(html) => set("descriptionHtml", html)}
          placeholder="Write the service description..."
        />
      </AdminCard>

      <AdminCard title="Media & highlights">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Image URL" htmlFor="image">
            <Input
              id="image"
              required
              value={values.image}
              onChange={(e) => set("image", e.target.value)}
            />
          </Field>
          <Field label="Image alt text" htmlFor="imageAlt">
            <Input
              id="imageAlt"
              required
              value={values.imageAlt}
              onChange={(e) => set("imageAlt", e.target.value)}
            />
          </Field>
          <Field
            label="Highlights"
            htmlFor="highlights"
            hint="One per line"
            className="md:col-span-2"
          >
            <Textarea
              id="highlights"
              rows={5}
              value={values.highlights}
              onChange={(e) => set("highlights", e.target.value)}
            />
          </Field>
        </div>
      </AdminCard>

      <AdminCard title="SEO">
        <div className="grid gap-4">
          <Field label="Meta title" htmlFor="seoTitle">
            <Input
              id="seoTitle"
              value={values.seoTitle}
              onChange={(e) => set("seoTitle", e.target.value)}
            />
          </Field>
          <Field label="Meta description" htmlFor="seoDesc">
            <Textarea
              id="seoDesc"
              rows={3}
              value={values.seoDescription}
              onChange={(e) => set("seoDescription", e.target.value)}
            />
          </Field>
        </div>
      </AdminCard>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">{mode === "create" ? "Create service" : "Save changes"}</Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/services")}>
          Cancel
        </Button>
        {saved ? (
          <span className="text-sm font-medium text-emerald-700">Saved locally.</span>
        ) : null}
      </div>
    </form>
  );
}
