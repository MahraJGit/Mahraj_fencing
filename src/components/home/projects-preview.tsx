import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { homeContent } from "@/content/home";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";

const featured = projects.slice(0, 3);

export function ProjectsPreview() {
  const copy = homeContent.projects;

  return (
    <Section>
      <Reveal>
        <SectionHeading title={copy.title} description={copy.description} />
      </Reveal>
      <ul className="mt-10 grid gap-6 lg:grid-cols-3">
        {featured.map((project, i) => (
          <li key={project.slug}>
            <Reveal delay={i * 0.06}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-lg border border-border"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase text-brand">
                    {project.location}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-body">{project.summary}</p>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
      <ButtonLink href="/projects" variant="outline" className="mt-8">
        All projects
      </ButtonLink>
    </Section>
  );
}
