import { ServicesHero } from "@/components/services/services-hero";
import { ServicesQuickNav } from "@/components/services/quick-nav";
import { ServiceCards } from "@/components/services/service-cards";
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
      <ServicesQuickNav />
      <ServiceCards />
      <ServicesProcess />
      <TestimonialsSection className="bg-paper py-16 md:py-24" />
      <CtaBanner />
    </>
  );
}
