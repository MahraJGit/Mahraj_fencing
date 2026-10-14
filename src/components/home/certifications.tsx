import { homeContent } from "@/content/home";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ShieldCheck } from "lucide-react";

export function CertificationsSection() {
  const copy = homeContent.certifications;

  return (
    <Section tone="alt">
      <Reveal>
        <SectionHeading title={copy.title} description={copy.description} />
      </Reveal>
      <ul className="mt-12 grid gap-8 md:grid-cols-3">
        {copy.items.map((item, i) => (
          <li key={item.name}>
            <Reveal delay={i * 0.05}>
              <div className="h-full">
                <ShieldCheck className="h-9 w-9 text-brand" aria-hidden />
                <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {item.detail}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
