import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ArrowButtonLinkProps = Omit<
  React.ComponentProps<typeof ButtonLink>,
  "size"
> & {
  size?: "sm" | "md";
};

/** Primary pill-style CTA with trailing arrow (Figma "Get a project quote"). */
export function ArrowButtonLink({
  children,
  className,
  size = "md",
  ...props
}: ArrowButtonLinkProps) {
  return (
    <ButtonLink
      className={cn(
        "gap-2.5 rounded-lg font-semibold",
        size === "md" ? "h-14 px-7 text-base" : "h-11 px-5 text-sm",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowUpRight
        className={size === "md" ? "h-5 w-5" : "h-4 w-4"}
        aria-hidden
      />
    </ButtonLink>
  );
}
