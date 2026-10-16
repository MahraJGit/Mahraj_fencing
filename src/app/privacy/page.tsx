import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";
import { LegalDocument } from "@/components/legal/legal-document";
import { privacyContent } from "@/content/privacy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: privacyContent.seo.title,
  description: privacyContent.seo.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title={privacyContent.hero.title}
        subtitle={privacyContent.hero.subtitle}
        image={privacyContent.hero.image}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]}
      />
      <Section>
        <LegalDocument
          intro={privacyContent.intro}
          sections={privacyContent.sections}
          lastUpdated={privacyContent.lastUpdated}
          contact={privacyContent.contact}
        />
      </Section>
    </>
  );
}
