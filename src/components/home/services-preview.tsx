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
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service, i) => (
          <li key={service.slug}>
            <Reveal delay={i * 0.05}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background sm:flex-row"
              >
                <div className="relative h-44 shrink-0 sm:h-auto sm:w-40">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-ink group-hover:text-brand">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-body">{service.summary}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-brand">
                    Learn more →
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
