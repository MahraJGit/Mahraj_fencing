import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Wrap } from "@/components/layout/wrap";
import { ArrowButtonLink } from "@/components/ui/arrow-button";
import { io } from "next/cache";
import { getPublishedProducts } from "@/lib/catalog-data";

export async function ProductsSection() {
  await io();
  const products = await getPublishedProducts();
  const featuredProducts = products
    .filter((product) => product.isFeatured)
    .slice(0, 9);
  if (featuredProducts.length === 0) return null;

  const primaryProducts = featuredProducts.slice(0, 3);
  const additionalProducts = featuredProducts.slice(3, 9);

  return (
    <section className="bg-paper py-16 md:py-20 lg:py-[80px]">
      <Wrap className="flex flex-col gap-10 lg:gap-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-20">
          <div className="max-w-[680px]">
            <Eyebrow>Our products</Eyebrow>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,5vw,3.625rem)] font-bold uppercase leading-none text-ink">
              The right fence.
              <br />
              For every site.
            </h2>
          </div>
          <p className="max-w-[480px] text-lg leading-relaxed text-body lg:pt-9">
            Permanent security or flexible site boundaries. Find the system that
            fits your project.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {primaryProducts.map((product) => (
            <li key={product.slug}>
              <Link
                href={`/products/${product.slug}`}
                className="group relative flex h-[470px] flex-col justify-end overflow-hidden rounded-lg"
              >
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width:768px) 33vw, 100vw"
                />
                <div className="relative z-10 flex h-[208px] flex-col gap-3 border border-white/50 bg-white/91 px-7 py-6 backdrop-blur-[10px]">
                  <h3 className="font-heading text-[27px] font-bold uppercase leading-none text-ink">
                    {product.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-body">
                    {product.shortDescription}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="grid gap-6 md:grid-cols-3">
          {additionalProducts.map((product) => (
            <li key={product.slug}>
              <Link
                href={`/products/${product.slug}`}
                className="flex items-center justify-between gap-3 rounded-md border border-line p-[18px] text-[15px] font-medium text-ink transition hover:border-brand hover:text-brand"
              >
                {product.title}
                <ArrowRight
                  className="h-7 w-7 shrink-0 text-brand"
                  strokeWidth={3.5}
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center">
          <ArrowButtonLink href="/products">View all Products</ArrowButtonLink>
        </div>
      </Wrap>
    </section>
  );
}
