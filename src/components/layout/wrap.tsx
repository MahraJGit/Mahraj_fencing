import { cn } from "@/lib/utils";

/** Figma frame: 1440 max width with 80px side padding (1280 content). */
export function Wrap({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.15em] text-brand",
        className,
      )}
    >
      {children}
    </p>
  );
}
