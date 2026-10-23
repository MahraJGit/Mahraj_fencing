import Image from "next/image";
import Link from "next/link";
import { Eyebrow, Wrap } from "@/components/layout/wrap";
import type { AdminService } from "@/lib/admin/types";

export function ServiceCards({ services }: { services: AdminService[] }) {
  return (
    <section className="bg-paper py-16 md:py-20 lg:py-[80px]">
      <Wrap className="flex flex-col gap-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
          <div className="max-w-[650px]">
            <Eyebrow>Our services</Eyebrow>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,5vw,3.25rem)] font-bold uppercase leading-none text-ink">
              From supply to site.
              <br />
              We keep you moving.
            </h2>
          </div>
          <p className="max-w-[550px] text-lg leading-relaxed text-body">
            Explore our services, from the first material delivery to
            changes on your site.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <li key={service.slug} id={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white transition hover:border-brand/40"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-surface-alt">
                  <Image
                    src={service.featuredImage || service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width:768px) 50vw, 100vw"
                  />
                </div>
                <div className="flex min-h-[208px] flex-col gap-3 px-7 py-6">
                  <div className="flex items-center gap-4 font-heading font-bold leading-none">
                    <span className="text-2xl text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[30px] uppercase text-ink">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-body">
                    {service.summary}
                  </p>
                  <span className="mt-auto text-base font-semibold text-brand">
                    View service →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
