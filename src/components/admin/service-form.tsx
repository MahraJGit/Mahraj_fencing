"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminService, ServiceFormValues } from "@/lib/admin/types";
import { slugify } from "@/lib/admin/types";
import { saveAdminService } from "@/lib/admin/catalog";
import { Field, AdminCard } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/admin/editor/rich-text-editor";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { parseListItems } from "@/lib/list-items";
import {
  HERO_IMAGE_HINT,
  SERVICE_CONTENT_IMAGE_HINT,
} from "@/lib/admin/image-guidelines";

function toValues(service?: AdminService): ServiceFormValues {
  return {
    title: service?.title ?? "",
    slug: service?.slug ?? "",
    summary: service?.summary ?? "",
    descriptionHtml: service?.description
      ? service.description.startsWith("<")
        ? service.description
        : `<p>${service.description}</p>`
      : "",
    image: service?.image ?? "",
    featuredImage: service?.featuredImage ?? "",
    imageAlt: service?.imageAlt ?? service?.title ?? "",
    isFeatured: service?.isFeatured ?? false,
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
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function set<K extends keyof ServiceFormValues>(key: K, value: ServiceFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setFormError(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = values.slug || slugify(values.title);
    setPending(true);
    const item: AdminService = {
      title: values.title,
      slug,
      summary: values.summary,
      description: values.descriptionHtml,
      image: values.image,
      featuredImage: values.featuredImage,
      imageAlt: values.imageAlt,
      isFeatured: values.isFeatured,
      highlights: parseListItems(values.highlights),
      seo: {
        title: values.seoTitle || values.title,
        description: values.seoDescription || values.summary,
      },
      status: values.status,
      sortOrder: initial?.sortOrder ?? 9999,
    };
    try {
      await saveAdminService(item, initial?.slug);
      router.replace("/admin/services");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Could not save the service.",
      );
    } finally {
      setPending(false);
    }
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
          <label className="flex items-center gap-2 self-end pb-3 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={values.isFeatured}
              onChange={(e) => set("isFeatured", e.target.checked)}
              className="h-4 w-4 rounded border-border accent-brand"
            />
            Feature on homepage
          </label>
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
        <div className="space-y-6">
          <div className="grid items-start gap-6 lg:grid-cols-2">
            <Field
              label="Content image"
              htmlFor="image"
              hint="Shown in the service details section below the hero."
            >
              <ImageUploadField
                id="image"
                required
                value={values.image}
                onChange={(image) => set("image", image)}
                uploadFolder="services"
                hint={SERVICE_CONTENT_IMAGE_HINT}
                previewAspectClassName="aspect-[4/3]"
                onAltFromFile={(alt) => {
                  if (!values.imageAlt.trim()) set("imageAlt", alt);
                }}
                placeholder="/images/services/… or https://…"
              />
            </Field>
            <Field
              label="Hero & featured image"
              htmlFor="featuredImage"
              hint="Used for both the service hero and service cards. If blank, the content image is used."
            >
              <ImageUploadField
                id="featuredImage"
                value={values.featuredImage}
                onChange={(image) => set("featuredImage", image)}
                uploadFolder="services/featured"
                hint={HERO_IMAGE_HINT}
                placeholder="/images/services/… or https://…"
              />
            </Field>
            <Field
              label="Image alt text"
              htmlFor="imageAlt"
              hint="Briefly describe the image for screen readers and search engines."
            >
              <Input
                id="imageAlt"
                required
                value={values.imageAlt}
                onChange={(e) => set("imageAlt", e.target.value)}
              />
            </Field>
          </div>

          <div className="border-t border-border pt-5">
            <Field
              label="Highlights"
              htmlFor="highlights"
              hint="Paste one highlight per line. Bullet markers are cleaned and saved as separate highlights."
            >
              <Textarea
                id="highlights"
                rows={5}
                value={values.highlights}
                onChange={(e) => set("highlights", e.target.value)}
              />
            </Field>
          </div>
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
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : mode === "create" ? "Create service" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/services")}>
          Cancel
        </Button>
        {formError ? (
          <span role="alert" className="text-sm font-medium text-red-600">
            {formError}
          </span>
        ) : null}
      </div>
    </form>
  );
}
