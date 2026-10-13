import { homeContent } from "@/content/home";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ShieldCheck } from "lucide-react";

export function CertificationsSection() {
  const copy = homeContent.certifications;

  return (
    <Section>
      <Reveal>
        <SectionHeading title={copy.title} description={copy.description} />
      </Reveal>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {copy.items.map((item, i) => (
          <li key={item.name}>
            <Reveal delay={i * 0.05}>
              <div className="rounded-lg border border-border bg-surface-alt p-6">
                <ShieldCheck className="h-8 w-8 text-brand" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-body">{item.detail}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
