import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/content/products";
import { productCategories } from "@/content/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const categoryLabel = productCategories[product.category].label;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition duration-300 hover:-translate-y-0.5 hover:border-brand/35"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-alt">
        <Image
          src={product.featuredImage || product.image}
          alt={product.title}
          fill
          className="object-cover object-center transition duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
          {categoryLabel}
        </p>
        <h3 className="mt-2 font-heading text-lg font-semibold text-ink transition group-hover:text-brand">
          {product.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
          {product.shortDescription}
        </p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          View details
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
