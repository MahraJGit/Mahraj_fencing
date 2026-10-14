"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { homeContent } from "@/content/home";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

/** Fills viewport below sticky header (header = 4rem). */
const heroScreenStyle = {
  height: "calc(100svh - 4rem)",
  minHeight: "calc(100svh - 4rem)",
  maxHeight: "calc(100svh - 4rem)",
} as const;

export function HomeHero() {
  const { hero } = homeContent;
  const reduce = useReducedMotion();

  return (
    <section
      className="relative isolate flex shrink-0 flex-col overflow-hidden bg-charcoal text-white"
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
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-ink/90 via-ink/20 to-ink/40" />

      <Container className="relative z-10 flex flex-1 flex-col justify-center py-10 sm:py-14 lg:py-16">
        <motion.div
          className="max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-heading text-[2rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4rem]">
            {hero.brand}
          </p>
          <h1 className="mt-3 max-w-2xl text-base font-medium leading-snug text-white/90 sm:mt-4 sm:text-xl lg:text-2xl">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-base lg:text-lg">
            {hero.subtitle}
          </p>
          <motion.div
            className="mt-7 flex flex-wrap gap-3 sm:mt-9"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="inverse-outline"
              size="lg"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
