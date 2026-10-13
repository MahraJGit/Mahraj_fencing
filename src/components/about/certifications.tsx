import { ShieldCheck } from "lucide-react";
import { aboutContent } from "@/content/about";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

export function AboutCertifications() {
  const { certifications } = aboutContent;

  return (
    <Section>
      <Reveal>
        <h2 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">
          {certifications.title}
        </h2>
        <p className="mt-4 max-w-2xl text-body leading-relaxed">
          {certifications.description}
        </p>
      </Reveal>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.items.map((item, index) => (
          <li key={item.name}>
            <Reveal delay={index * 0.04}>
              <div className="flex h-full flex-col border border-border bg-surface-alt p-6">
                <ShieldCheck className="h-8 w-8 text-brand" aria-hidden />
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
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
