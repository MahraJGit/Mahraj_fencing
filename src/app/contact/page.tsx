import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { FaqList } from "@/components/shared/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { contactFaqs, generalFaqs } from "@/content/faq";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

export const metadata = buildMetadata({
  title: "Contact Mahraj Fencing",
  description:
    "Request a fencing quote for UAE or KSA sites. Phone, email, WhatsApp, and project enquiry form.",
  path: "/contact",
  image: "/images/heroes/contact-hero.png",
});

const faqItems = [...generalFaqs.slice(0, 3), ...contactFaqs];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <JsonLd data={faqJsonLd} />
      <PageHero
        title="Contact us"
        subtitle="Share your fence line, gate, or hoarding requirements. We respond within one business day."
        image="/images/heroes/contact-hero.png"
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <ContactDetails />
          <ContactForm />
        </div>
      </Section>
      <Section tone="alt">
        <h2 className="text-2xl font-semibold text-ink">FAQs</h2>
        <div className="mt-6">
          <FaqList items={faqItems} />
        </div>
      </Section>
    </>
  );
}
