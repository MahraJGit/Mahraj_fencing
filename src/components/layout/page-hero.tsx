import Image from "next/image";
import { Container } from "./container";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  image: string;
  align?: "left" | "center";
};

/** Fills viewport below sticky header (header = 4rem). */
const heroScreenStyle = {
  height: "calc(100svh - 4rem)",
  minHeight: "calc(100svh - 4rem)",
  maxHeight: "calc(100svh - 4rem)",
} as const;

export function PageHero({
  title,
  subtitle,
  image,
  align = "left",
}: PageHeroProps) {
  return (
    <section
      className="relative isolate flex shrink-0 flex-col overflow-hidden bg-charcoal text-white"
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
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/35" />
      <Container className="relative z-10 flex flex-1 flex-col justify-center py-10 sm:py-14 lg:py-16">
        <div
          className={cn(
            "max-w-3xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "mb-4 block h-1 w-12 rounded-full bg-brand sm:mb-5",
              align === "center" && "mx-auto",
            )}
          />
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/78 sm:mt-5 sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
