import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { Section } from "@/components/layout/section";

export function ProjectsListing() {
  const sectors = new Set(projects.map((project) => project.sector));

  return (
    <>
      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(220px,0.7fr)_2fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
              Project footprint
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase text-ink">
              At a glance
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-body">
              A selection of perimeter and site projects delivered in Dubai.
            </p>
          </div>
          <div className="grid overflow-hidden rounded-md border-t-4 border-brand bg-charcoal text-white sm:grid-cols-3">
            {[
              { value: projects.length, label: "Published projects" },
              { value: sectors.size, label: "Project sectors" },
              { value: "Dubai", label: "Project location" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-5 border-b border-white/10 px-6 py-5 last:border-b-0 sm:min-h-[148px] sm:flex-col sm:justify-center sm:gap-3 sm:border-b-0 sm:border-r sm:py-6 sm:last:border-r-0"
              >
                <p className="font-heading text-5xl font-bold leading-none text-white sm:text-[56px]">
                  {stat.value}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/75 sm:text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="alt">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
            Selected work
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold uppercase text-ink sm:text-4xl">
            Built around the site
          </h2>
          <p className="mt-3 text-body leading-relaxed">
            Browse perimeter upgrades, temporary hoarding, access systems, and
            industrial yard work delivered across Dubai.
          </p>
        </div>
        {projects.length ? (
          <ul className="grid gap-8 lg:grid-cols-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition hover:border-brand/40"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-surface-alt">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width:1024px) 50vw, 100vw"
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
        ) : (
          <p className="text-body">Project information is coming soon.</p>
        )}
      </Section>
      <Section>
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
            Project delivery
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold uppercase text-ink sm:text-4xl">
            From scope to handover
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["01", "Plan the perimeter", "Confirm site conditions, access points, and the fence system required."],
            ["02", "Coordinate the work", "Sequence materials, installation, branding, and gate preparation around site activity."],
            ["03", "Adapt by phase", "Keep temporary lines and project requirements aligned as the site changes."],
          ].map(([number, title, description]) => (
            <article key={number} className="border-t-2 border-brand pt-5">
              <p className="text-sm font-semibold text-brand">{number}</p>
              <h3 className="mt-3 font-heading text-xl font-bold uppercase text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{description}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
