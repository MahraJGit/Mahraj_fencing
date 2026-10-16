"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/content/site";
import { Logo } from "./logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 text-white"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">Toggle menu</span>
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        id="mobile-nav-panel"
        className={cn(
          "fixed inset-0 z-50 overflow-y-auto bg-paper transition-opacity",
          open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none",
        )}
      >
        <div className="flex h-[var(--header-h)] items-center justify-between border-b border-border bg-ink px-4">
          <Logo priority={false} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 text-white"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
          {mainNav.map((item) => (
            <div key={item.href} className="border-b border-border py-2">
              <Link
                href={item.href}
                className="block py-2 text-base font-semibold text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
              {item.children ? (
                <ul className="mb-2 space-y-1 pl-3">
                  {item.children.slice(0, 5).map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block py-1 text-sm text-body"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
          <ButtonLink href="/contact" className="mt-4 w-full">
            Get a quote
          </ButtonLink>
        </nav>
      </div>
    </div>
  );
}
