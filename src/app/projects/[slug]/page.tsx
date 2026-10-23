import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProjectBySlug, projects } from "@/content/projects";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { getPublishedProducts } from "@/lib/catalog-data";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

type ProjectPageProps = PageProps<"/projects/[slug]">;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: ProjectPageProps) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/projects/${project.slug}`,
    image: project.image,
  });
}

export default function ProjectDetailPage(props: ProjectPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-40 items-center justify-center text-sm text-body">
          Loading project…
        </div>
      }
    >
      <ProjectDetailContent params={props.params} />
    </Suspense>
  );
}

async function ProjectDetailContent({
  params,
}: {
  params: ProjectPageProps["params"];
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const products = await getPublishedProducts();
  const productsBySlug = new Map(products.map((product) => [product.slug, product]));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      />
      <PageHero
        title={project.title}
        subtitle={`${project.location} · ${project.sector}`}
        image={project.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-surface-alt">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="space-y-6">
            <p className="text-body leading-relaxed">{project.description}</p>
            <div>
              <h2 className="text-lg font-semibold text-ink">Scope</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-body">
                {project.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-ink">Products used</h2>
              <ul className="mt-2 space-y-2">
                {project.products.map((slug) => {
                  const product = productsBySlug.get(slug);
                  if (!product) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/products/${slug}`}
                        className="text-sm font-semibold text-brand"
                      >
                        {product.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 text-sm">
          <Link href="/projects" className="font-semibold text-brand">
            ← All projects
          </Link>
        </p>
      </Section>
    </>
  );
}
