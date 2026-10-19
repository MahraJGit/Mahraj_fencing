import Image from "next/image";
import Link from "next/link";
import { Wrap } from "@/components/layout/wrap";
import { ArrowButtonLink } from "@/components/ui/arrow-button";

export function ServicesHero() {
  return (
    <section className="relative isolate flex h-[100svh] min-h-[560px] flex-col overflow-hidden bg-black text-white">
      <Image
        src="/images/figma/services/hero.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-image-overlay" />

      <Wrap className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 pt-[84px] text-center md:pt-[108px]">
        <nav
          aria-label="Breadcrumb"
          className="flex h-[18px] w-[800px] max-w-full items-center justify-center gap-3 text-xs font-normal uppercase leading-[18px] tracking-[1.5px] text-white"
        >
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Services</span>
        </nav>
        <h1 className="w-full max-w-[1000px] font-heading text-[clamp(2.5rem,4.45vw,64px)] font-bold uppercase leading-none text-white">
          Fencing services.
          <br />
          One partner, every phase.
        </h1>
        <p className="w-full max-w-[760px] text-base leading-[150%] text-white sm:text-lg lg:text-xl">
          One partner from material supply through install, logistics, and phased
          shifting.
        </p>
        <ArrowButtonLink
          href="/contact#quote-form"
          className="h-[54px] w-[230px] justify-center gap-2 rounded-md px-3 text-base"
        >
          Get a project quote
        </ArrowButtonLink>
      </Wrap>
    </section>
  );
}
