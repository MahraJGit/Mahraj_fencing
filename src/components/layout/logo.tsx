import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";

type LogoProps = {
  variant?: "header" | "footer";
  className?: string;
};

const LOGO_SRC = "/images/logo.png";

export function Logo({ variant = "header", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <Image
        src={LOGO_SRC}
        alt={siteConfig.name}
        width={220}
        height={56}
        className={cn(
          "w-auto",
          variant === "footer" ? "h-11 sm:h-12" : "h-10 sm:h-11",
        )}
        priority={variant === "header"}
      />
    </Link>
  );
}
