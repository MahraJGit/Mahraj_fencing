import { homeContent } from "@/content/home";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function ClientsSection() {
  const copy = homeContent.clients;

  return (
    <Section tone="alt">
      <Reveal>
        <SectionHeading
          align="center"
          title={copy.title}
          description={copy.description}
        />
      </Reveal>
      <ul className="mt-10 flex flex-wrap justify-center gap-3">
        {copy.names.map((name, i) => (
          <li key={name}>
            <Reveal delay={i * 0.03}>
              <span className="inline-block rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-charcoal">
                {name}
              </span>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
