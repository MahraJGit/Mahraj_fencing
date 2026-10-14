import type { Product } from "@/content/products";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="text-body">No products match this category yet.</p>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
