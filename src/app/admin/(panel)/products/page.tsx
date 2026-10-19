"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ResourceTable } from "@/components/admin/resource-table";
import { deleteAdminProduct, listAdminProducts } from "@/lib/admin/catalog";
import type { AdminProduct } from "@/lib/admin/types";
import { productCategories } from "@/content/products";

export default function AdminProductsPage() {
  const [items, setItems] = useState<AdminProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    listAdminProducts()
      .then((products) => {
        if (active) {
          setItems(products);
          setError(null);
        }
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load products.",
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

  async function remove(slug: string) {
    setLoading(true);
    try {
      await deleteAdminProduct(slug);
      setItems(await listAdminProducts());
      setError(null);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete the product.",
      );
    } finally {
      setLoading(false);
    }
  }

  const rows = items.map((item) => ({
    slug: item.slug,
    title: item.title,
    status: item.status,
    meta: productCategories[item.category].label,
    featured: item.isFeatured,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-ink">Products</h1>
          <p className="mt-1 text-sm text-body">
            Manage all product fields shown on the public catalog.
          </p>
        </div>
        <ButtonLink href="/admin/products/new" size="sm">
          <Plus className="h-4 w-4" />
          New product
        </ButtonLink>
      </div>
      {error ? (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {loading ? (
        <p className="text-sm text-body">Loading products…</p>
      ) : (
        <ResourceTable basePath="/admin/products" rows={rows} onDelete={remove} />
      )}
    </div>
  );
}
