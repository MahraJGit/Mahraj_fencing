"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { listProducts } from "@/lib/admin/storage";
import type { AdminProduct } from "@/lib/admin/types";

export default function EditProductPage() {
  const params = useParams<{ slug: string }>();
  const [item, setItem] = useState<AdminProduct | null | undefined>(undefined);

  useEffect(() => {
    const found = listProducts().find((p) => p.slug === params.slug) ?? null;
    setItem(found);
  }, [params.slug]);

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
