import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/layout/page-hero";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description: `Privacy policy for ${siteConfig.name}.`,
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy policy" image="/images/heroes/privacy-hero.png" />
      <Section>
        <div className="prose-content mx-auto max-w-3xl">
          <p>
            {siteConfig.name} respects your privacy. Information submitted through
            our contact form is used only to respond to enquiries about fencing
            supply and services.
          </p>
          <p>
            We do not sell personal data. Project details may be shared internally
            with logistics and installation teams strictly for quoting and delivery.
          </p>
          <p>
            For data requests, contact {siteConfig.emails[0]}.
          </p>
        </div>
      </Section>
    </>
  );
}
