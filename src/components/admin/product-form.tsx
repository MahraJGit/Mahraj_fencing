"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { productCategories, type ProductCategory } from "@/content/products";
import type { AdminProduct, ProductFormValues } from "@/lib/admin/types";
import { slugify } from "@/lib/admin/types";
import { saveAdminProduct } from "@/lib/admin/catalog";
import { Field, AdminCard } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/admin/editor/rich-text-editor";
import { ImageUploadField } from "@/components/admin/image-upload-field";

function toValues(product?: AdminProduct): ProductFormValues {
  return {
    title: product?.title ?? "",
    slug: product?.slug ?? "",
    shortDescription: product?.shortDescription ?? "",
    description: product?.description
      ? product.description.startsWith("<")
        ? product.description
        : `<p>${product.description}</p>`
      : "",
    category: product?.category ?? "perimeter-fencing",
    image: product?.image ?? "",
    imageAlt: product?.imageAlt ?? product?.title ?? "",
    isFeatured: product?.isFeatured ?? false,
    gallery: product?.gallery ?? [],
    features: (product?.features ?? []).join("\n"),
    applications: (product?.applications ?? []).join("\n"),
    seoTitle: product?.seo.title ?? "",
    seoDescription: product?.seo.description ?? "",
    status: product?.status ?? "draft",
  };
}

export function ProductForm({
  initial,
  mode,
}: {
  initial?: AdminProduct;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>(() => toValues(initial));
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function set<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
    setFormError(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = values.slug || slugify(values.title);
    setPending(true);
    const item: AdminProduct = {
      title: values.title,
      slug,
      shortDescription: values.shortDescription,
      description: values.description,
      category: values.category,
      image: values.image,
      imageAlt: values.imageAlt,
      isFeatured: values.isFeatured,
      gallery: values.gallery.map((image) => image.trim()).filter(Boolean),
      features: values.features
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      applications: values.applications
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      seo: {
        title: values.seoTitle || values.title,
        description: values.seoDescription || values.shortDescription,
      },
      status: values.status,
      sortOrder: initial?.sortOrder ?? 9999,
    };
    try {
      await saveAdminProduct(item, initial?.slug);
      setSaved(true);
      if (mode === "create") router.push(`/admin/products/${slug}`);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Could not save the product.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <AdminCard title="Product details" description="Fields shown on product listing and detail pages.">
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
          <Field label="Slug" htmlFor="slug" hint="URL: /products/your-slug">
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
              className="flex h-11 w-full rounded-md border border-border bg-background px-3 text-sm"
              value={values.category}
              onChange={(e) => set("category", e.target.value as ProductCategory)}
            >
              {Object.entries(productCategories).map(([key, cat]) => (
                <option key={key} value={key}>
                  {cat.label}
                </option>
              ))}
            </select>
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
          <Field label="Short description" htmlFor="short" className="md:col-span-2">
            <Textarea
              id="short"
              required
              rows={2}
              value={values.shortDescription}
              onChange={(e) => set("shortDescription", e.target.value)}
            />
          </Field>
        </div>
      </AdminCard>

      <AdminCard title="Full description" description="Rich text with HTML blocks for tables and custom markup.">
        <RichTextEditor
          value={values.description}
          onChange={(html) => set("description", html)}
          placeholder="Write the product description..."
        />
      </AdminCard>

      <AdminCard title="Media">
        <div className="space-y-6">
          <div className="grid items-start gap-6 lg:grid-cols-2">
            <Field label="Cover image" htmlFor="image">
              <ImageUploadField
                id="image"
                required
                value={values.image}
                onChange={(image) => set("image", image)}
                uploadFolder="products"
                onAltFromFile={(alt) => {
                  if (!values.imageAlt.trim()) set("imageAlt", alt);
                }}
                placeholder="/images/products/… or https://…"
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

          <fieldset className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <legend className="text-sm font-medium text-ink">
                  Gallery images
                </legend>
                <p className="mt-1 text-xs text-body">
                  Add supporting product photos. Upload an image or paste its URL.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => set("gallery", [...values.gallery, ""])}
              >
                <Plus className="h-4 w-4" />
                Add gallery image
              </Button>
            </div>
            <div className="space-y-4 rounded-lg border border-border bg-surface-alt/40 p-4 sm:p-5">
              {values.gallery.length === 0 ? (
                <p className="text-sm font-medium text-ink">
                  No gallery images added yet.
                </p>
              ) : null}
              {values.gallery.length > 0 ? (
                <div className="grid gap-4 xl:grid-cols-2">
                  {values.gallery.map((image, index) => (
                    <div
                      key={`gallery-${index}`}
                      className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 rounded-md border border-border bg-background p-3"
                    >
                      <ImageUploadField
                        id={`gallery-${index}`}
                        value={image}
                        onChange={(src) => {
                          const gallery = [...values.gallery];
                          gallery[index] = src;
                          set("gallery", gallery);
                        }}
                        uploadFolder="products/gallery"
                        hint="JPG, PNG, WebP, GIF · max 2MB"
                        compact
                        previewClassName="max-h-32"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        aria-label={`Remove gallery image ${index + 1}`}
                        onClick={() =>
                          set(
                            "gallery",
                            values.gallery.filter((_, itemIndex) => itemIndex !== index),
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </fieldset>
        </div>
      </AdminCard>

      <AdminCard title="Features & applications">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Features" htmlFor="features" hint="One per line">
            <Textarea
              id="features"
              rows={5}
              value={values.features}
              onChange={(e) => set("features", e.target.value)}
            />
          </Field>
          <Field label="Applications" htmlFor="apps" hint="One per line">
            <Textarea
              id="apps"
              rows={5}
              value={values.applications}
              onChange={(e) => set("applications", e.target.value)}
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
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : mode === "create" ? "Create product" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
        {saved ? (
          <span className="text-sm font-medium text-emerald-700">Saved.</span>
        ) : null}
        {formError ? (
          <span role="alert" className="text-sm font-medium text-red-600">
            {formError}
          </span>
        ) : null}
      </div>
    </form>
  );
}
