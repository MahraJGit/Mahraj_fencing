import { HomeHero } from "@/components/home/hero";
import { ProductShowcase } from "@/components/home/product-showcase";
import { ServicesPreview } from "@/components/home/services-preview";
import { AboutTeaser } from "@/components/home/about-teaser";
import { ProjectsPreview } from "@/components/home/projects-preview";
import { TestimonialsSection } from "@/components/home/testimonials";
import { CertificationsSection } from "@/components/home/certifications";
import { ClientsSection } from "@/components/home/clients";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProductShowcase />
      <ServicesPreview />
      <AboutTeaser />
      <ProjectsPreview />
      <TestimonialsSection />
      <CertificationsSection />
      <ClientsSection />
      <CtaBanner />
    </>
  );
}
