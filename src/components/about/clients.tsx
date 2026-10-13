import { aboutContent } from "@/content/about";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

export function AboutClients() {
  const { clients } = aboutContent;

  return (
    <Section tone="alt">
      <Reveal>
        <h2 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">
          {clients.title}
        </h2>
        <p className="mt-4 max-w-2xl text-body leading-relaxed">
          {clients.description}
        </p>
      </Reveal>
      <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
        {clients.names.map((name, index) => (
          <li key={name}>
            <Reveal delay={index * 0.03}>
              <div className="flex min-h-[5.5rem] items-center justify-center bg-background px-4 py-6 text-center">
                <span className="font-heading text-sm font-semibold text-ink sm:text-base">
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
