import Image from "next/image";
import { homeContent } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Check } from "lucide-react";

export function AboutTeaser() {
  const copy = homeContent.about;

  return (
    <Section tone="alt">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-[0_24px_48px_-24px_rgba(18,20,23,0.45)]">
            <Image
              src="/images/profile/steel-plant-yard.jpg"
              alt="Mahraj Fencing operations and site compounds"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <span
            aria-hidden
            className="mb-4 block h-1 w-10 rounded-full bg-brand"
          />
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-body sm:text-lg">
            {copy.description}
          </p>
          <ul className="mt-8 space-y-3.5">
            {copy.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm text-charcoal sm:text-base">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                  <Check className="h-3.5 w-3.5 text-brand" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <ButtonLink href="/about" className="mt-9">
            More about us
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}
