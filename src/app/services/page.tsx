import { Suspense } from "react";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesCatalog } from "@/components/services/services-catalog";
import { ServicesProcess } from "@/components/services/process";
import { TestimonialsSection } from "@/components/home/testimonials";
import { CtaBanner } from "@/components/home/cta-banner";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

export const metadata = buildMetadata({
  title: "Fencing services",
  description:
    "Supply, branding, installation, transport, and shifting for fence lines and site cabins across the GCC.",
  path: "/services",
  image: "/images/heroes/service-hero.png",
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <ServicesHero />
      <Suspense fallback={<p className="py-12 text-center text-body">Loading services…</p>}>
        <ServicesCatalog />
      </Suspense>
      <ServicesProcess />
      <TestimonialsSection className="bg-paper py-16 md:py-24" />
      <CtaBanner />
    </>
  );
}
