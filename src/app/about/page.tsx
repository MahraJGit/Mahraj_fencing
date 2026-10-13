import { PageHero } from "@/components/layout/page-hero";
import { ChairmanMessage } from "@/components/about/chairman-message";
import { AboutIntroduction } from "@/components/about/introduction";
import { AboutHistory } from "@/components/about/history";
import { AboutExhibitions } from "@/components/about/exhibitions";
import { AboutCertifications } from "@/components/about/certifications";
import { AboutClients } from "@/components/about/clients";
import { CtaBanner } from "@/components/home/cta-banner";
import { aboutContent } from "@/content/about";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

export const metadata = buildMetadata({
  title: aboutContent.seo.title,
  description: aboutContent.seo.description,
  path: "/about",
  image: aboutContent.hero.image,
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Our company", path: "/about" },
        ]}
      />
      <PageHero
        title={aboutContent.hero.title}
        subtitle={aboutContent.hero.subtitle}
        image={aboutContent.hero.image}
      />
      <ChairmanMessage />
      <AboutIntroduction />
      <AboutHistory />
      <AboutExhibitions />
      <AboutCertifications />
      <AboutClients />
      <CtaBanner />
    </>
  );
}
