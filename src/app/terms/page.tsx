import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";
import { LegalDocument } from "@/components/legal/legal-document";
import { termsContent } from "@/content/terms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: termsContent.seo.title,
  description: termsContent.seo.description,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        title={termsContent.hero.title}
        subtitle={termsContent.hero.subtitle}
        image={termsContent.hero.image}
      />
      <Section>
        <LegalDocument
          intro={termsContent.intro}
          privacyNote={termsContent.privacyNote}
          sections={termsContent.sections}
          lastUpdated={termsContent.lastUpdated}
          entireAgreement={termsContent.entireAgreement}
        />
      </Section>
    </>
  );
}
