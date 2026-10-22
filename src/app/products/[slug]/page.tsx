import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { io } from "next/cache";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import {
  productCategories,
} from "@/content/products";
import { getPublishedProduct } from "@/lib/catalog-data";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/seo";

type ProductPageProps = PageProps<"/products/[slug]">;

export async function generateMetadata(props: ProductPageProps) {
  const { slug } = await props.params;
  const product = await getPublishedProduct(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: `/products/${product.slug}`,
    image: product.image,
  });
}

export default function ProductDetailPage(props: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-40 items-center justify-center text-sm text-body">
          Loading product…
        </div>
      }
    >
      <ProductDetailContent params={props.params} />
    </Suspense>
  );
}

async function ProductDetailContent({
  params,
}: {
  params: ProductPageProps["params"];
}) {
  await io();
  const { slug } = await params;
  const product = await getPublishedProduct(slug);
  if (!product) notFound();

  const categoryLabel = productCategories[product.category].label;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: absoluteUrl(product.image),
    category: categoryLabel,
    brand: { "@type": "Brand", name: "Mahraj Fencing" },
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.title, path: `/products/${product.slug}` },
        ]}
      />
      <PageHero
        title={product.title}
        subtitle={product.shortDescription}
        image={product.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.title },
        ]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
            <Image
              src={product.featuredImage || product.image}
              alt={product.title}
              fill
              className="object-cover object-center"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase text-brand">
              {categoryLabel}
            </p>
            {product.description.trimStart().startsWith("<") ? (
              <div
                className="prose-content mt-4 text-body leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            ) : (
              <p className="mt-4 text-body leading-relaxed">
                {product.description}
              </p>
            )}
            <ButtonLink href="/contact#quote-form" className="mt-8">
              Request a quote
            </ButtonLink>
          </div>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-ink">Features</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-ink">Applications</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-body">
              {product.applications.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 text-sm text-body">
          <Link href="/products" className="font-semibold text-brand">
            ← Back to all products
          </Link>
        </p>
      </Section>
    </>
  );
}
