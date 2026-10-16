import Image from "next/image";
import Link from "next/link";
import { Eyebrow, Wrap } from "@/components/layout/wrap";

const items = [
  {
    n: "01",
    title: "Supply & branding",
    text: "Fencing systems, project boards and branded site boundaries.",
    href: "/services/supply-and-branding",
  },
  {
    n: "02",
    title: "Installation",
    text: "Experienced crews for permanent and temporary fence lines.",
    href: "/services/installation",
  },
  {
    n: "03",
    title: "Transportation",
    text: "Coordinated deliveries of panels, gates, blocks and accessories.",
    href: "/services/transport-and-logistics",
  },
  {
    n: "04",
    title: "Fence shifting",
    text: "Reposition your site perimeter as construction progresses.",
    href: "/services/shifting-and-relocation",
  },
];

export function ServicesBlock() {
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
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex gap-[22px] border-b border-line py-3.5 transition hover:opacity-80"
                >
                  <span className="w-11 shrink-0 font-heading text-[38px] font-bold leading-none text-brand">
                    {item.n}
                  </span>
                  <span className="flex flex-col gap-1 pt-1">
                    <span className="font-heading text-[23px] font-bold leading-none text-ink">
                      {item.title}
                    </span>
                    <span className="text-sm leading-relaxed text-body">
                      {item.text}
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
