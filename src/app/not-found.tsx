import Link from "next/link";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="py-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          404
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Page not found</h1>
        <p className="mt-4 text-body">
          The page you requested is not available. Browse products or contact our
          team for project support.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/products" variant="outline">
            Products
          </ButtonLink>
          <Link href="/contact" className="text-sm font-semibold text-brand">
            Contact →
          </Link>
        </div>
      </div>
    </Section>
  );
}
