import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/content/site";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { ArrowButtonLink } from "@/components/ui/arrow-button";
import { cn } from "@/lib/utils";

const linkClass =
  "relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white";
const activeLinkClass =
  "font-black text-white after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-white";

type SiteHeaderProps = {
  /** Floats the frosted nav over the page hero (Home, Services). */
  overlay?: boolean;
  activePath?: string;
  navItems: NavItem[];
};

export function SiteHeader({
  overlay = false,
  activePath = "",
  navItems,
}: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "z-40 w-full",
        overlay
          ? "sticky inset-x-0 top-0 z-40 -mb-[84px] px-5 pt-5 md:-mb-[108px] md:px-10 md:pt-7 xl:px-[5.56vw] xl:pt-7"
          : "sticky top-0 bg-ink",
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex items-center justify-between gap-4 text-white md:gap-8",
          overlay
            ? "h-16 w-full max-w-[1280px] rounded-xl border border-white/20 px-4 md:h-20 md:gap-8 md:px-5 xl:w-[calc(100vw_-_160px)]"
            : "h-16 max-w-[1440px] border-b border-white/10 px-4 md:px-10 xl:px-20",
        )}
      >
        {overlay ? (
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-xl border border-white/20 bg-[rgba(36,36,36,0.34)] backdrop-blur-[10px]"
          />
        ) : null}
        <Logo
          variant={overlay ? "headerOverlay" : "header"}
          priority={!overlay}
        />
        <nav
          className="hidden h-full items-center gap-1 xl:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const active =
              activePath === item.href || activePath.startsWith(`${item.href}/`);
            const itemClass = cn(linkClass, active && activeLinkClass);

            return item.children ? (
              <div key={item.label} className="group relative flex h-full items-center">
                <Link
                  href={item.href}
                  className={itemClass}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 opacity-60 transition group-hover:opacity-100",
                      active && "opacity-100",
                    )}
                  />
                </Link>
                <div
                  className={cn(
                    "invisible absolute left-0 top-[calc(100%+1px)] z-50 w-[306px] overflow-hidden rounded-b-2xl border border-t-0 border-white/20 bg-black/40 opacity-0 shadow-[0_4px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[visibility,opacity] duration-200",
                    "group-hover:visible group-hover:opacity-100",
                    "group-focus-within:visible group-focus-within:opacity-100",
                  )}
                >
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.label} className="border-b border-white/10 last:border-b-0">
                        <Link
                          href={child.href}
                          className="flex min-h-14 flex-col justify-center px-3 py-2 transition hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
                        >
                          <span className="block text-sm font-semibold text-white">
                            {child.label}
                          </span>
                          {child.description ? (
                            <span className="mt-0.5 block text-[10px] leading-5 text-white/85">
                              {child.description}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={itemClass}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ArrowButtonLink
            href="/contact#quote-form"
            size="sm"
            className="hidden h-[54px] w-[166px] justify-center gap-2 rounded-md px-3 text-base sm:inline-flex"
          >
            Get a quote
          </ArrowButtonLink>
          <MobileNav items={navItems} />
        </div>
      </div>
    </header>
  );
}
