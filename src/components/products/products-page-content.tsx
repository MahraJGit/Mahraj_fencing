import Link from "next/link";
import { Section } from "@/components/layout/section";
import { ProductGrid } from "@/components/products/product-grid";
import {
  productCategories,
  products,
  type ProductCategory,
} from "@/content/products";
import { cn } from "@/lib/utils";

type ProductsPageContentProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export async function ProductsPageContent({
  searchParams,
}: ProductsPageContentProps) {
  const resolved = await searchParams;
  const categoryParam = resolved?.category;
  const raw =
    typeof categoryParam === "string"
      ? categoryParam
      : Array.isArray(categoryParam)
        ? categoryParam[0]
        : undefined;

  const category =
    raw && raw in productCategories ? (raw as ProductCategory) : undefined;

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <Section tone="alt">
      <nav aria-label="Product categories" className="flex flex-wrap gap-2">
        <Link
          href="/products"
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium",
            !category
              ? "border-brand bg-brand text-white"
              : "border-border bg-background text-charcoal hover:border-brand/40",
          )}
        >
          All
        </Link>
        {(Object.keys(productCategories) as ProductCategory[]).map((key) => (
          <Link
            key={key}
            href={`/products?category=${key}`}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium",
              category === key
                ? "border-brand bg-brand text-white"
                : "border-border bg-background text-charcoal hover:border-brand/40",
            )}
          >
            {productCategories[key].label}
          </Link>
        ))}
      </nav>
      {category ? (
        <p className="mt-6 text-body">
          {productCategories[category].description}
        </p>
      ) : null}
      <div className="mt-10">
        <ProductGrid products={filtered} />
      </div>
    </Section>
  );
}
