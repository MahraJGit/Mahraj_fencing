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
      className="relative isolate shrink-0 overflow-hidden bg-charcoal text-white"
      style={heroScreenStyle}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover opacity-50"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40" />
      <Container className="relative flex h-full flex-col justify-center py-12 sm:py-14 lg:py-16">
        <div
          className={cn(
            "max-w-3xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              {subtitle}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
