import { PageHero } from "@/components/layout/page-hero";
import { ProjectsListing } from "@/components/projects/projects-listing";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata = buildMetadata({
  title: "Fencing projects",
  description:
    "Recent perimeter, hoarding, and gate projects delivered for construction and industrial sites in Dubai.",
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
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />
      <ProjectsListing />
      <CtaBanner />
    </>
  );
}
