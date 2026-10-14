import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/services";
import { homeContent } from "@/content/home";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function ServicesPreview() {
  const copy = homeContent.services;

  return (
    <Section>
      <Reveal>
        <SectionHeading title={copy.title} description={copy.description} />
      </Reveal>
      <ul className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2">
        {services.map((service, i) => (
          <li key={service.slug} className="min-h-0">
            <Reveal delay={i * 0.05} className="h-full">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full min-h-[11.5rem] flex-col overflow-hidden rounded-xl bg-background shadow-[0_12px_32px_-18px_rgba(18,20,23,0.3)] ring-1 ring-border/80 transition duration-300 hover:-translate-y-0.5 hover:ring-brand/25 sm:flex-row"
              >
                <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-auto sm:w-44 sm:self-stretch">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="180px"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-heading text-lg font-semibold text-ink transition group-hover:text-brand">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
                    {service.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Learn more
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
