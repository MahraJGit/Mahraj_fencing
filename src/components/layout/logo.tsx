import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";

/** Canonical Mahraj Fencing logo — use everywhere. */
export const BRAND_LOGO = "/images/logo.png";

type LogoProps = {
  variant?: "header" | "headerOverlay" | "footer";
  className?: string;
  priority?: boolean;
};

export function Logo({ variant = "header", className, priority }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <Image
        src={BRAND_LOGO}
        alt={siteConfig.name}
        width={252}
        height={56}
        className={cn(
          "w-auto",
          variant === "footer"
            ? "h-14"
            : variant === "headerOverlay"
              ? "h-14"
              : "h-10 sm:h-11",
        )}
        priority={priority ?? (variant === "header" || variant === "headerOverlay")}
      />
    </Link>
  );
}
