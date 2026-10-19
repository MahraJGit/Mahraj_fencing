"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { getAdminProduct } from "@/lib/admin/catalog";
import type { AdminProduct } from "@/lib/admin/types";

export default function EditProductPage() {
  const params = useParams<{ slug: string }>();
  const [item, setItem] = useState<AdminProduct | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void getAdminProduct(params.slug)
      .then((product) => {
        if (active) setItem(product);
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load this product.",
          );
          setItem(null);
        }
      });
    return () => {
      active = false;
    };
  }, [params.slug]);

  if (error) {
    return <p role="alert" className="text-sm text-red-700">{error}</p>;
  }

  if (item === undefined) {
    return <p className="text-sm text-body">Loading…</p>;
  }

  if (!item) {
    return <p className="text-sm text-body">Product not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink">Edit product</h1>
        <p className="mt-1 font-mono text-xs text-body">{item.slug}</p>
      </div>
      <ProductForm mode="edit" initial={item} />
    </div>
  );
}
