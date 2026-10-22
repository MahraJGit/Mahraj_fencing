import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Wrap } from "@/components/layout/wrap";
import { projects } from "@/content/projects";

export function Applications() {
  const featuredProjects = projects.slice(0, 2);

  return (
    <section className="bg-paper py-16 md:py-20 lg:py-[80px]">
      <Wrap className="flex flex-col gap-9">
        <Eyebrow>Our projects</Eyebrow>
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-20">
          <h2 className="max-w-[680px] font-heading text-[clamp(2.5rem,5vw,3.625rem)] font-bold uppercase leading-none text-ink">
            Built for
            <br />
            real-world demands.
          </h2>
          <p className="max-w-[520px] text-lg leading-relaxed text-body lg:pt-2">
            Perimeter solutions for construction, logistics, and industrial
            operations across Dubai.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex flex-col overflow-hidden rounded-[10px] bg-white"
              >
                <div className="relative h-[240px] md:h-[300px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width:768px) 50vw, 100vw"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-heading text-[29px] font-bold uppercase leading-none text-ink">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-body">
                      {project.summary}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 shrink-0 text-brand"
                    aria-hidden
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
