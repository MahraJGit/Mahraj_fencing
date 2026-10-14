import { homeContent } from "@/content/home";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function ClientsSection() {
  const copy = homeContent.clients;

  return (
    <Section>
      <Reveal>
        <SectionHeading
          align="center"
          title={copy.title}
          description={copy.description}
        />
      </Reveal>
      <ul className="mx-auto mt-12 grid max-w-4xl gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-3">
        {copy.names.map((name, i) => (
          <li key={name} className="bg-background">
            <Reveal delay={i * 0.03} className="h-full">
              <div className="flex h-full min-h-[4.5rem] items-center justify-center px-5 py-6 text-center">
                <span className="font-heading text-sm font-semibold tracking-wide text-charcoal sm:text-base">
                  {name}
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
