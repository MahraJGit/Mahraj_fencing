"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productCategories, type ProductCategory } from "@/content/products";
import type { AdminProduct, ProductFormValues } from "@/lib/admin/types";
import { slugify } from "@/lib/admin/types";
import { upsertProduct } from "@/lib/admin/storage";
import { Field, AdminCard } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/admin/editor/rich-text-editor";

function toValues(product?: AdminProduct): ProductFormValues {
  return {
    title: product?.title ?? "",
    slug: product?.slug ?? "",
    shortDescription: product?.shortDescription ?? "",
    description: product?.description
      ? `<p>${product.description}</p>`
      : "",
    category: product?.category ?? "perimeter-fencing",
    image: product?.image ?? "",
    imageAlt: product?.title ?? "",
    gallery: (product?.gallery ?? []).join("\n"),
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

  function set<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = values.slug || slugify(values.title);
    const item: AdminProduct = {
      title: values.title,
      slug,
      shortDescription: values.shortDescription,
      description: values.description.replace(/<[^>]+>/g, " ").trim(),
      category: values.category,
      image: values.image,
      gallery: values.gallery
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
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
    };
    upsertProduct(item);
    setSaved(true);
    if (mode === "create") router.push(`/admin/products/${slug}`);
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
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Cover image URL" htmlFor="image">
            <Input
              id="image"
              required
              value={values.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="/images/products/..."
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
            label="Gallery image URLs"
            htmlFor="gallery"
            hint="One URL per line"
            className="md:col-span-2"
          >
            <Textarea
              id="gallery"
              rows={3}
              value={values.gallery}
              onChange={(e) => set("gallery", e.target.value)}
            />
          </Field>
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
        <Button type="submit">{mode === "create" ? "Create product" : "Save changes"}</Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
        {saved ? (
          <span className="text-sm font-medium text-emerald-700">Saved locally.</span>
        ) : null}
      </div>
    </form>
  );
}
