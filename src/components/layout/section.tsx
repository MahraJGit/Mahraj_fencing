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
  default: "bg-transparent",
  alt: "bg-surface-alt/80",
  dark: "bg-charcoal text-white surface-mesh",
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
      className={cn("py-16 sm:py-20 lg:py-24", toneClasses[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
