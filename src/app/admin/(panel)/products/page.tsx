"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ResourceTable } from "@/components/admin/resource-table";
import { deleteProduct, listProducts } from "@/lib/admin/storage";
import type { AdminProduct } from "@/lib/admin/types";
import { productCategories } from "@/content/products";

export default function AdminProductsPage() {
  const [items, setItems] = useState<AdminProduct[]>([]);

  useEffect(() => {
    setItems(listProducts());
  }, []);

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
      <ResourceTable
        basePath="/admin/products"
        rows={items.map((item) => ({
          slug: item.slug,
          title: item.title,
          status: item.status,
          meta: productCategories[item.category].label,
        }))}
        onDelete={(slug) => {
          deleteProduct(slug);
          setItems(listProducts());
        }}
      />
    </div>
  );
}
