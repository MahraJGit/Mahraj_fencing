import { HomeHero } from "@/components/home/hero";
import { PromiseBar } from "@/components/home/promise-bar";
import { ProductsSection } from "@/components/home/products";
import { ServicesBlock } from "@/components/home/services-block";
import { Applications } from "@/components/home/applications";
import { TestimonialsSection } from "@/components/home/testimonials";
import { CertificationsSection } from "@/components/home/certifications";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <PromiseBar />
      <ProductsSection />
      <ServicesBlock />
      <Applications />
      <TestimonialsSection />
      <CertificationsSection />
      <CtaBanner />
    </>
  );
}
