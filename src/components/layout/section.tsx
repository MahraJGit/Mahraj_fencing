import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  tone?: "default" | "alt" | "dark" | "brand";
};

const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "bg-background",
  alt: "bg-surface-alt",
  dark: "bg-charcoal text-white",
  brand: "bg-brand-dark text-white",
};

export function Section({
  children,
  className,
  containerClassName,
  id,
  tone = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      data-section
      className={cn("py-14 sm:py-16 lg:py-20", toneClasses[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
