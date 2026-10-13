import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of use",
  description: `Terms of use for ${siteConfig.name}.`,
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of use" image="/images/heroes/terms-hero.png" />
      <Section>
        <div className="prose-content mx-auto max-w-3xl">
          <p>
            Content on {siteConfig.url} is provided for general information about
            {siteConfig.name} products and services. Specifications on site must be
            confirmed in writing before order.
          </p>
          <p>
            Images may show representative installs; actual finishes and configurations
            are confirmed against project drawings and local regulations.
          </p>
          <p>
            Enquiries through this website do not constitute a binding contract until
            both parties agree commercial terms.
          </p>
        </div>
      </Section>
    </>
  );
}
