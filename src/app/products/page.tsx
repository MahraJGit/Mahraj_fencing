import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { ProductsPageContent } from "@/components/products/products-page-content";
import { productCategories, type ProductCategory } from "@/content/products";
import { CtaBanner } from "@/components/home/cta-banner";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

const featuredCategories: ProductCategory[] = [
  "perimeter-fencing",
  "gates-access",
  "barriers-security",
];

export const metadata = buildMetadata({
  title: "Fencing products",
  description:
    "Chain link, welded mesh, palisade, gates, barriers, portable cabins, signage, and accessories, supplied across UAE & KSA.",
  path: "/products",
  image: "/images/products/welded-mesh.jpg",
});

type ProductsPageProps = PageProps<"/products">;

function ProductsFallback() {
  return (
    <div className="py-14 text-center text-body sm:py-16">
      Loading product catalog…
    </div>
  );
}

export default function ProductsPage(props: ProductsPageProps) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ]}
      />
      <PageHero
        title="Fencing products"
        subtitle="Spec-ready systems for industrial, infrastructure, and commercial perimeters."
        image="/images/heroes/service-hero.png"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <Suspense fallback={<ProductsFallback />}>
        <ProductsPageContent searchParams={props.searchParams} />
      </Suspense>
      <Section tone="alt">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
            Find a system
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold uppercase text-ink sm:text-4xl">
            Start with your site need
          </h2>
          <p className="mt-3 text-body leading-relaxed">
            Explore the core systems for securing a perimeter, controlling
            access, and protecting site operations.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {featuredCategories.map((category) => (
            <li key={category}>
              <Link
                href={`/products?category=${category}`}
                className="flex h-full flex-col rounded-md border border-line bg-white p-5 transition hover:border-brand"
              >
                <h3 className="font-heading text-xl font-bold uppercase text-ink">
                  {productCategories[category].label}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
                  {productCategories[category].description}
                </p>
                <span className="mt-5 text-sm font-semibold text-brand">
                  Browse systems <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBanner />
    </>
  );
}
