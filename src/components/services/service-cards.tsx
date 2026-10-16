import Image from "next/image";
import Link from "next/link";
import { Eyebrow, Wrap } from "@/components/layout/wrap";

const cards = [
  {
    n: "01",
    title: "Fence supply & branding",
    text: "Bulk material supply with branded mesh banners and project boards.",
    image: "/images/figma/services/service-1.png",
    href: "/services/supply-and-branding",
  },
  {
    n: "02",
    title: "Installation",
    text: "Experienced crews for permanent and temporary fence lines.",
    image: "/images/figma/services/service-2.png",
    href: "/services/installation",
  },
  {
    n: "03",
    title: "Transportation",
    text: "Fleet delivery for panels, blocks, cabins, and accessories.",
    image: "/images/figma/services/service-3.png",
    href: "/services/transport-and-logistics",
  },
  {
    n: "04",
    title: "Fence shifting",
    text: "Move temporary lines and cabins as your site footprint changes.",
    image: "/images/figma/home/product-3.png",
    href: "/services/shifting-and-relocation",
  },
];

export function ServiceCards() {
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
            Explore our four core services, from the first material delivery to
            changes on your site.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <li key={card.href} id={card.href.split("/").pop()}>
              <Link
                href={card.href}
                className="group relative flex h-[470px] flex-col justify-end overflow-hidden rounded-lg"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width:768px) 50vw, 100vw"
                />
                <div className="relative z-10 flex h-[208px] flex-col gap-3 border border-white/50 bg-white/91 px-7 py-6 backdrop-blur-[10px]">
                  <div className="flex items-center gap-4 font-heading font-bold leading-none">
                    <span className="text-2xl text-brand">{card.n}</span>
                    <h3 className="text-[30px] uppercase text-ink">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-body">
                    {card.text}
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
