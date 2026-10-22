import { Suspense } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { ProductsPageContent } from "@/components/products/products-page-content";
import { CtaBanner } from "@/components/home/cta-banner";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

export const metadata = buildMetadata({
  title: "Fencing products",
  description:
    "Chain link, welded mesh, palisade, gates, barriers, portable cabins, signage, and accessories, supplied and installed in Dubai.",
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
      <CtaBanner />
    </>
  );
}
