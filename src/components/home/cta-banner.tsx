import { homeContent } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";

export function CtaBanner() {
  const copy = homeContent.cta;

  return (
    <Section tone="brand">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          {copy.title}
        </h2>
        <p className="mt-4 text-lg text-white/80">{copy.description}</p>
        <ButtonLink
          href={copy.button.href}
          variant="inverse"
          size="lg"
          className="mt-8"
        >
          {copy.button.label}
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
