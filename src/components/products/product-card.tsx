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
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition hover:border-brand/30 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-alt">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">
          {categoryLabel}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-ink group-hover:text-brand">
          {product.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
          {product.shortDescription}
        </p>
        <span className="mt-4 text-sm font-semibold text-brand">
          View details →
        </span>
      </div>
    </Link>
  );
}
