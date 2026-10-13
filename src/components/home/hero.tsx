import Image from "next/image";
import { homeContent } from "@/content/home";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

/** Fills viewport below sticky header (header = 4rem). */
const heroScreenStyle = {
  height: "calc(100svh - 4rem)",
  minHeight: "calc(100svh - 4rem)",
  maxHeight: "calc(100svh - 4rem)",
} as const;

export function HomeHero() {
  const { hero } = homeContent;

  return (
    <section
      className="relative isolate shrink-0 overflow-hidden bg-charcoal text-white"
      style={heroScreenStyle}
    >
      <Image
        src={hero.image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <video
        className="absolute inset-0 z-[1] size-full object-cover object-center motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={hero.image}
        aria-hidden
      >
        <source src={hero.video} type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/40" />
      <Container className="relative z-10 flex h-full flex-col justify-center py-14 sm:py-16 lg:py-20">
        <Reveal className="max-w-3xl">
          <p className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {hero.brand}
          </p>
          <h1 className="mt-3 max-w-2xl text-xl font-medium leading-snug text-white/90 sm:text-2xl lg:text-[1.75rem]">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="inverse"
              size="lg"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
