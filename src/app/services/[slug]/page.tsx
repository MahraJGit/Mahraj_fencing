import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { io } from "next/cache";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { getPublishedService } from "@/lib/catalog-data";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

type ServicePageProps = PageProps<"/services/[slug]">;

export async function generateMetadata(props: ServicePageProps) {
  const { slug } = await props.params;
  const service = await getPublishedService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

export default function ServiceDetailPage(props: ServicePageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-40 items-center justify-center text-sm text-body">
          Loading service…
        </div>
      }
    >
      <ServiceDetailContent params={props.params} />
    </Suspense>
  );
}

async function ServiceDetailContent({
  params,
}: {
  params: ServicePageProps["params"];
}) {
  await io();
  const { slug } = await params;
  const service = await getPublishedService(slug);
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
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={service.featuredImage || service.image}
              alt={service.title}
              fill
              className="object-cover object-center"
              sizes="50vw"
            />
          </div>
          <div>
            {service.description.trimStart().startsWith("<") ? (
              <div
                className="prose-content text-body leading-relaxed"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            ) : (
              <p className="text-body leading-relaxed">{service.description}</p>
            )}
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
            <ButtonLink href="/contact#quote-form" className="mt-8">
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
