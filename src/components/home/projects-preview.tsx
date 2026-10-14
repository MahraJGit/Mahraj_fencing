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
      <ul className="mt-12 grid gap-6 lg:grid-cols-3">
        {featured.map((project, i) => (
          <li key={project.slug}>
            <Reveal delay={i * 0.06}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-xl bg-background shadow-[0_12px_32px_-18px_rgba(18,20,23,0.3)] ring-1 ring-border/80 transition duration-300 hover:-translate-y-1 hover:ring-brand/25"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                    {project.location}
                  </p>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-heading text-lg font-semibold text-ink transition group-hover:text-brand">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {project.summary}
                  </p>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
      <ButtonLink href="/projects" variant="outline" className="mt-10">
        All projects
      </ButtonLink>
    </Section>
  );
}
