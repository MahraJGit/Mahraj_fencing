import { aboutContent } from "@/content/about";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

export function AboutHistory() {
  const { history } = aboutContent;

  return (
    <Section>
      <Reveal>
        <h2 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">
          {history.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-body sm:text-lg">
          {history.lead}
        </p>
      </Reveal>
      <ol className="relative mt-12 space-y-0 border-l border-border pl-0">
        {history.milestones.map((item, index) => (
          <li key={item.title} className="relative pl-10 pb-10 last:pb-0">
            <span
              className="absolute left-0 top-1.5 flex h-3 w-3 -translate-x-[calc(50%+0.5px)] rounded-full bg-brand ring-4 ring-background"
              aria-hidden
            />
            <Reveal delay={index * 0.04}>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                {item.year}
              </p>
              <h3 className="mt-1 font-heading text-xl font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 max-w-2xl text-body leading-relaxed">
                {item.body}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
