import { homeContent } from "@/content/home";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";

export function CtaBanner() {
  const copy = homeContent.cta;

  return (
    <Section
      tone="brand"
      className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-dark to-ink surface-mesh"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-black/20 blur-3xl"
      />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <span
          aria-hidden
          className="mx-auto mb-5 block h-1 w-12 rounded-full bg-white/70"
        />
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {copy.title}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-white/80">
          {copy.description}
        </p>
        <ButtonLink
          href={copy.button.href}
          variant="inverse"
          size="lg"
          className="mt-9"
        >
          {copy.button.label}
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
