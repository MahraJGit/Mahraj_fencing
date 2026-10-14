import Link from "next/link";
import { products } from "@/content/products";
import { homeContent } from "@/content/home";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProductGrid } from "@/components/products/product-grid";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";

const featured = products.slice(0, 6);

export function ProductShowcase() {
  const copy = homeContent.productShowcase;

  return (
    <Section tone="alt" id="products">
      <Reveal>
        <SectionHeading title={copy.title} description={copy.description} />
      </Reveal>
      <Reveal className="mt-12" delay={0.05}>
        <ProductGrid products={featured} />
      </Reveal>
      <div className="mt-10 flex flex-wrap items-center gap-5">
        <ButtonLink href="/products">View full catalog</ButtonLink>
        <Link
          href="/contact"
          className="text-sm font-semibold text-brand transition hover:text-brand-dark"
        >
          Need a spec review? Contact us →
        </Link>
      </div>
    </Section>
  );
}
