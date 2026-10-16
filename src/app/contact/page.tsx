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
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact us" }]}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <ContactDetails />
          <ContactForm />
        </div>
      </Section>
      <Section tone="alt">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
            A clear first step
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold uppercase text-ink sm:text-4xl">
            Help us scope your enquiry
          </h2>
          <p className="mt-3 text-body leading-relaxed">
            A few project details help our team understand the fence line and
            prepare a useful response.
          </p>
        </div>
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            ["01", "Site and location", "Share the city, site type, and any access restrictions."],
            ["02", "Fence line and scope", "Include approximate lengths, fence type, gates, and branding needs."],
            ["03", "Schedule", "Tell us your target dates and whether the work is phased."],
          ].map(([number, title, description]) => (
            <li key={number} className="border-t-2 border-brand pt-5">
              <p className="text-sm font-semibold text-brand">{number}</p>
              <h3 className="mt-3 font-heading text-xl font-bold uppercase text-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                {description}
              </p>
            </li>
          ))}
        </ol>
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
