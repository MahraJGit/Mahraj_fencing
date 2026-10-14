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
    <Section>
      <nav
        aria-label="Product categories"
        className="flex flex-wrap gap-x-1 gap-y-2 border-b border-border pb-1"
      >
        <Link
          href="/products"
          className={cn(
            "border-b-2 px-3 py-2.5 text-sm font-semibold transition",
            !category
              ? "border-brand text-brand"
              : "border-transparent text-body hover:text-ink",
          )}
        >
          All
        </Link>
        {(Object.keys(productCategories) as ProductCategory[]).map((key) => (
          <Link
            key={key}
            href={`/products?category=${key}`}
            className={cn(
              "border-b-2 px-3 py-2.5 text-sm font-semibold transition",
              category === key
                ? "border-brand text-brand"
                : "border-transparent text-body hover:text-ink",
            )}
          >
            {productCategories[key].label}
          </Link>
        ))}
      </nav>
      {category ? (
        <p className="mt-6 max-w-2xl text-body leading-relaxed">
          {productCategories[category].description}
        </p>
      ) : null}
      <div className="mt-10">
        <ProductGrid products={filtered} />
      </div>
    </Section>
  );
}
