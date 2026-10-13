"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  Home,
  Layers3,
  LogOut,
  Package,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getAdminSession, signOutAdmin, type AdminSession } from "@/lib/admin/auth";
import { Logo } from "@/components/layout/logo";

const nav = [
  { href: "/admin", label: "Dashboard", icon: Home, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/services", label: "Services", icon: Layers3 },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = getAdminSession();
    if (!s) {
      router.replace("/admin/login");
      return;
    }
    setSession(s);
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-surface-alt text-sm text-body">
        Loading admin…
      </div>
    );
  }

  return (
    <div className="flex min-h-svh bg-[#f3f4f0] text-ink">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-ink text-white lg:flex">
        <div className="border-b border-white/10 px-4 py-4">
          <Logo variant="footer" />
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
            Admin panel
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {nav.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-brand text-white"
                    : "text-white/75 hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => {
              signOutAdmin();
              router.replace("/admin/login");
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 sm:px-6">
          <div className="lg:hidden">
            <Logo />
          </div>
          <p className="hidden text-sm text-body sm:block">
            Signed in as <span className="font-semibold text-ink">{session?.email}</span>
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-ink hover:bg-surface-alt"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View site
            </Link>
          </div>
        </header>
        <div className="flex gap-2 overflow-x-auto border-b border-border bg-background px-3 py-2 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold",
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-brand text-white"
                  : "bg-surface-alt text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
