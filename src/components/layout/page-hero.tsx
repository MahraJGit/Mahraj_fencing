import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  image: string;
  align?: "left" | "center";
  breadcrumbs?: { label: string; href?: string }[];
};

/** Fills the viewport behind the sticky frosted header. */
const heroScreenStyle = {
  height: "100svh",
  minHeight: "100svh",
} as const;

export function PageHero({
  title,
  subtitle,
  image,
  align = "center",
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section
      className="relative isolate flex shrink-0 flex-col overflow-hidden bg-transparent text-white"
      style={heroScreenStyle}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 hero-image-overlay" />
      <Container className="relative z-10 flex flex-1 flex-col justify-center pb-0 pt-[84px] md:pt-[108px]">
        <div
          className={cn(
            "mx-auto w-full max-w-[1000px]",
            align === "center" && "mx-auto text-center",
          )}
        >
          {breadcrumbs?.length ? (
            <nav
              aria-label="Breadcrumb"
              className={cn(
                "mb-7 flex h-[18px] w-full flex-nowrap items-center gap-3 overflow-hidden whitespace-nowrap text-xs font-medium uppercase leading-[18px] tracking-[1.5px] text-white/85",
                align === "center" && "justify-center",
              )}
            >
              {breadcrumbs.map((item, index) => (
                <span key={`${item.label}-${index}`} className="contents">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  {item.href && index < breadcrumbs.length - 1 ? (
                    <Link href={item.href} className="transition hover:text-white">
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      aria-current="page"
                      className="min-w-0 max-w-[calc(100vw-11rem)] truncate lg:max-w-[800px]"
                    >
                      {item.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          ) : null}
          <h1 className="font-heading text-[clamp(2.5rem,4.45vw,64px)] font-bold uppercase leading-none tracking-tight text-white">
            {title}
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-6 max-w-[760px] text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl">
              {subtitle}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
