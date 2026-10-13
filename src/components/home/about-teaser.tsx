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
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/images/profile/steel-plant-yard.jpg"
              alt="Mahraj Fencing operations and site compounds"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-body leading-relaxed">{copy.description}</p>
          <ul className="mt-6 space-y-3">
            {copy.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm text-charcoal">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                {point}
              </li>
            ))}
          </ul>
          <ButtonLink href="/about" className="mt-8">
            More about us
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}
