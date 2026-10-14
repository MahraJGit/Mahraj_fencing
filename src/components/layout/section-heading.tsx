import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.18em] text-brand",
            dark && "text-white/75",
          )}
        >
          {eyebrow}
        </p>
      ) : (
        <span
          aria-hidden
          className={cn(
            "mb-4 block h-1 w-10 rounded-full bg-brand",
            centered && "mx-auto",
            dark && "bg-white/70",
          )}
        />
      )}
      <h2
        className={cn(
          "mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/75" : "text-body",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
