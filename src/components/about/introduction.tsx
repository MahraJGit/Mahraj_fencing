import Image from "next/image";
import { aboutContent } from "@/content/about";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";

export function AboutIntroduction() {
  const { introduction } = aboutContent;

  return (
    <Section tone="alt">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">
            {introduction.title}
          </h2>
          <div className="mt-6 space-y-4 text-body leading-relaxed">
            {introduction.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <ButtonLink href={introduction.brochureHref} className="mt-8">
            {introduction.brochureLabel}
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative aspect-video overflow-hidden rounded-lg bg-surface-alt">
            <Image
              src={introduction.image}
              alt="Mahraj Fencing manufacturing and site operations"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
