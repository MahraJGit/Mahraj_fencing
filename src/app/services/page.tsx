import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

export const metadata = buildMetadata({
  title: "Fencing services",
  description:
    "Supply, branding, installation, transport, and shifting for fence lines and site cabins across the GCC.",
  path: "/services",
  image: "/images/heroes/service-hero.png",
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <PageHero
        title="Fencing services"
        subtitle="One partner from material supply through install, logistics, and phased shifting."
        image="/images/heroes/service-hero.png"
      />
      <Section tone="alt">
        <ul className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-semibold text-ink group-hover:text-brand">
                    {service.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-body">{service.summary}</p>
                  <span className="mt-4 text-sm font-semibold text-brand">
                    View service →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
