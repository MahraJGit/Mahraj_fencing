import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { mainNav } from "@/content/site";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[var(--container-site)] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-55 transition group-hover:opacity-100" />
                </Link>
                <div
                  className={cn(
                    "invisible absolute left-0 top-full z-50 min-w-[17rem] translate-y-2 rounded-lg border border-border bg-background p-2 opacity-0 shadow-xl transition duration-200",
                    "group-hover:visible group-hover:translate-y-1 group-hover:opacity-100",
                    "group-focus-within:visible group-focus-within:translate-y-1 group-focus-within:opacity-100",
                  )}
                >
                  <ul className="space-y-0.5">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-md px-3 py-2.5 transition hover:bg-surface-alt"
                        >
                          <span className="block text-sm font-semibold text-ink">
                            {child.label}
                          </span>
                          {child.description ? (
                            <span className="mt-0.5 block text-xs leading-snug text-body">
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
                className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
            Get a quote
          </ButtonLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
