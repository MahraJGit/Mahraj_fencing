import Link from "next/link";
import { io } from "next/cache";
import { Section } from "@/components/layout/section";
import { ProductGrid } from "@/components/products/product-grid";
import {
  productCategories,
} from "@/content/products";
import { getPublishedProducts } from "@/lib/catalog-data";
import { cn } from "@/lib/utils";

type ProductsPageContentProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export async function ProductsPageContent({
  searchParams,
}: ProductsPageContentProps) {
  await io();
  const resolved = await searchParams;
  const products = await getPublishedProducts();
  const categories = [...new Set(products.map((product) => product.category))];
  const categoryParam = resolved?.category;
  const raw =
    typeof categoryParam === "string"
      ? categoryParam
      : Array.isArray(categoryParam)
        ? categoryParam[0]
        : undefined;

  const category = categories.find((item) => item === raw);

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <>
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
        {categories.map((key) => (
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
      {!category && categories.length > 0 ? (
        <Section tone="alt">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
              Find a system
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase text-ink sm:text-4xl">
              Start with your site need
            </h2>
            <p className="mt-3 text-body leading-relaxed">
              Explore the systems currently available in our product catalog.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {categories.slice(0, 3).map((key) => (
              <li key={key}>
                <Link
                  href={`/products?category=${key}`}
                  className="flex h-full flex-col rounded-md border border-line bg-white p-5 transition hover:border-brand"
                >
                  <h3 className="font-heading text-xl font-bold uppercase text-ink">
                    {productCategories[key].label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
                    {productCategories[key].description}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-brand">
                    Browse systems <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
