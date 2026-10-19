"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/content/site";
import { Logo } from "./logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(true);

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
              {item.children ? (
                <>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-2 text-left text-base font-semibold text-ink"
                    aria-expanded={productsOpen}
                    onClick={() => setProductsOpen((expanded) => !expanded)}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        productsOpen && "rotate-180",
                      )}
                    />
                  </button>
                  {productsOpen ? (
                    <ul className="mb-2 overflow-hidden rounded-b-2xl border border-white/20 bg-black/40 shadow-[0_4px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                      {item.children.map((child) => (
                        <li
                          key={child.label}
                          className="border-b border-white/10 last:border-b-0"
                        >
                          <Link
                            href={child.href}
                            className="flex min-h-14 flex-col justify-center px-3 py-2 transition hover:bg-white/10"
                            onClick={() => setOpen(false)}
                          >
                            <span className="text-sm font-semibold text-white">
                              {child.label}
                            </span>
                            {child.description ? (
                              <span className="mt-0.5 text-[10px] leading-5 text-white/85">
                                {child.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block py-2 text-base font-semibold text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )}
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
