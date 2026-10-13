import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { getServiceBySlug, services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

type ServicePageProps = PageProps<"/services/[slug]">;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: ServicePageProps) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

export default async function ServiceDetailPage(props: ServicePageProps) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      />
      <PageHero
        title={service.title}
        subtitle={service.summary}
        image={service.image}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={service.image}
              alt=""
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div>
            <p className="text-body leading-relaxed">{service.description}</p>
            <ul className="mt-6 space-y-2">
              {service.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border px-4 py-3 text-sm text-charcoal"
                >
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact" className="mt-8">
              Discuss this service
            </ButtonLink>
          </div>
        </div>
        <p className="mt-10 text-sm">
          <Link href="/services" className="font-semibold text-brand">
            ← All services
          </Link>
        </p>
      </Section>
    </>
  );
}
