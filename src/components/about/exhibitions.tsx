import Image from "next/image";
import { aboutContent } from "@/content/about";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";

export function AboutExhibitions() {
  const { exhibitions } = aboutContent;

  return (
    <Section tone="alt">
      <Reveal>
        <h2 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">
          {exhibitions.title}
        </h2>
        <p className="mt-4 max-w-2xl text-body leading-relaxed">
          {exhibitions.description}
        </p>
      </Reveal>
      <ul className="mt-10 grid gap-8 md:grid-cols-2">
        {exhibitions.items.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={index * 0.05}>
              <article className="overflow-hidden rounded-lg border border-border bg-background">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                    {item.location}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {item.summary}
                  </p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
