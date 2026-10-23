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
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white transition hover:border-brand/40"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-surface-alt">
                  <Image
                    src={product.featuredImage || product.image}
                    alt={product.title}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width:768px) 33vw, 100vw"
                  />
                </div>
                <div className="flex min-h-[208px] flex-col gap-3 px-7 py-6">
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
                className="group flex items-center gap-4 overflow-hidden rounded-md border border-line bg-white text-[15px] font-medium text-ink transition hover:border-brand hover:text-brand"
              >
                  <span className="relative aspect-video w-28 shrink-0 overflow-hidden bg-surface-alt">
                  <Image
                    src={product.featuredImage || product.image}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="112px"
                  />
                </span>
                <span className="flex flex-1 items-center justify-between gap-3 py-4 pr-4">
                  {product.title}
                  <ArrowRight
                    className="h-7 w-7 shrink-0 text-brand"
                    strokeWidth={3.5}
                    aria-hidden
                  />
                </span>
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
