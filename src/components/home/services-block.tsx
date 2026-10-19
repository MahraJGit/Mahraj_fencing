import Image from "next/image";
import Link from "next/link";
import { Eyebrow, Wrap } from "@/components/layout/wrap";
import { io } from "next/cache";
import { getPublishedServices } from "@/lib/catalog-data";

export async function ServicesBlock() {
  await io();
  const services = (await getPublishedServices())
    .filter((service) => service.isFeatured)
    .slice(0, 4);
  if (services.length === 0) return null;

  return (
    <section className="bg-warm py-16 md:py-20 lg:py-[80px]">
      <Wrap className="grid items-start gap-12 lg:grid-cols-[566px_1fr] lg:gap-16">
        <div className="relative aspect-[566/600] overflow-hidden rounded-[10px]">
          <Image
            src="/images/figma/home/services-photo.png"
            alt="Fence installation on site"
            fill
            className="object-cover"
            sizes="(min-width:1024px) 566px, 100vw"
          />
        </div>

        <div className="flex max-w-[650px] flex-col gap-[18px]">
          <Eyebrow>Our services</Eyebrow>
          <h2 className="font-heading text-[clamp(2.5rem,5vw,3.625rem)] font-bold uppercase leading-none text-ink">
            From factory
            <br />
            to your fence line.
          </h2>
          <ul>
            {services.map((service, index) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex gap-[22px] border-b border-line py-3.5 transition hover:opacity-80"
                >
                  <span className="w-11 shrink-0 font-heading text-[38px] font-bold leading-none text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-1 pt-1">
                    <span className="font-heading text-[23px] font-bold leading-none text-ink">
                      {service.title}
                    </span>
                    <span className="text-sm leading-relaxed text-body">
                      {service.summary}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Wrap>
    </section>
  );
}
