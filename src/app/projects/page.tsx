import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

export const metadata = buildMetadata({
  title: "Fencing projects",
  description:
    "Recent perimeter, hoarding, and gate projects across Dubai, Abu Dhabi, Sharjah, and Riyadh.",
  path: "/projects",
  image: "/images/heroes/project-hero.png",
});

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ]}
      />
      <PageHero
        title="Project portfolio"
        subtitle="Industrial yards, utilities, and mega-project hoarding delivered with documented handover."
        image="/images/heroes/project-hero.png"
      />
      <Section tone="alt">
        <ul className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background sm:flex-row"
              >
                <div className="relative h-52 shrink-0 sm:h-auto sm:w-72">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="288px"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase text-brand">
                    {project.sector} · {project.location}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-ink group-hover:text-brand">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm text-body">{project.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
