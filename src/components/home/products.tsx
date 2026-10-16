import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Wrap } from "@/components/layout/wrap";
import { ArrowButtonLink } from "@/components/ui/arrow-button";

const cards = [
  {
    title: "Welded mesh fencing",
    text: "Rigid panels for permanent security and a clean perimeter.",
    image: "/images/figma/home/product-1.png",
    href: "/products/welded-mesh-fencing",
  },
  {
    title: "Chain link fencing",
    text: "Bulk material supply with branded mesh banners and project boards.",
    image: "/images/figma/home/product-2.png",
    href: "/products/chain-link-fencing",
  },
  {
    title: "Temporary fencing",
    text: "Flexible site boundaries that move as your project grows.",
    image: "/images/figma/home/product-3.png",
    href: "/products/temporary-fencing",
  },
];

const chips = [
  { label: "Security gates", href: "/products/security-gates" },
  { label: "Palisade fencing", href: "/products/palisade-fencing" },
  { label: "Anti-climb fencing", href: "/products/anti-climb-fencing" },
];

export function ProductsSection() {
  return (
    <section className="bg-paper py-16 md:py-20 lg:py-[80px]">
      <Wrap className="flex flex-col gap-10 lg:gap-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-20">
          <div className="max-w-[680px]">
            <Eyebrow>Our products</Eyebrow>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,5vw,3.625rem)] font-bold uppercase leading-none text-ink">
              The right fence.
              <br />
              For every site.
            </h2>
          </div>
          <p className="max-w-[480px] text-lg leading-relaxed text-body lg:pt-9">
            Permanent security or flexible site boundaries. Find the system that
            fits your project.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title}>
              <Link
                href={card.href}
                className="group relative flex h-[470px] flex-col justify-end overflow-hidden rounded-lg"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width:768px) 33vw, 100vw"
                />
                <div className="relative z-10 flex h-[208px] flex-col gap-3 border border-white/50 bg-white/91 px-7 py-6 backdrop-blur-[10px]">
                  <h3 className="font-heading text-[27px] font-bold uppercase leading-none text-ink">
                    {card.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-body">
                    {card.text}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="grid gap-6 md:grid-cols-3">
          {chips.map((chip) => (
            <li key={chip.label}>
              <Link
                href={chip.href}
                className="flex items-center justify-between gap-3 rounded-md border border-line p-[18px] text-[15px] font-medium text-ink transition hover:border-brand hover:text-brand"
              >
                {chip.label}
                <ArrowRight
                  className="h-7 w-7 shrink-0 text-brand"
                  strokeWidth={3.5}
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center">
          <ArrowButtonLink href="/products">View all Products</ArrowButtonLink>
        </div>
      </Wrap>
    </section>
  );
}
