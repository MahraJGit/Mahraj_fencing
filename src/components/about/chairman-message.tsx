import { aboutContent } from "@/content/about";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

export function ChairmanMessage() {
  const { chairman } = aboutContent;

  return (
    <Section>
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          {chairman.eyebrow}
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold text-ink sm:text-4xl">
          {chairman.greeting}
        </h2>
      </Reveal>
      <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-body sm:text-lg">
        {chairman.paragraphs.map((paragraph) => (
          <Reveal key={paragraph.slice(0, 32)}>
            <p>{paragraph}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8 border-l-4 border-brand pl-5">
        <p className="text-sm text-body">{chairman.signOff}</p>
        <p className="mt-1 font-heading text-lg font-semibold text-ink">
          {chairman.role}
        </p>
        <p className="text-sm font-medium text-brand">{chairman.company}</p>
      </Reveal>
    </Section>
  );
}
