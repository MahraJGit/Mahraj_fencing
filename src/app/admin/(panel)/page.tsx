"use client";

import Link from "next/link";
import { FileText, Layers3, Package, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { ButtonLink } from "@/components/ui/button";
import { listAdminBlogs } from "@/lib/admin/blogs";

const cards = [
  {
    label: "Products",
    count: products.length,
    href: "/admin/products",
    createHref: "/admin/products/new",
    icon: Package,
  },
  {
    label: "Services",
    count: services.length,
    href: "/admin/services",
    createHref: "/admin/services/new",
    icon: Layers3,
  },
];

export default function AdminDashboardPage() {
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [blogError, setBlogError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    listAdminBlogs()
      .then((blogs) => {
        if (active) setBlogCount(blogs.length);
      })
      .catch(() => {
        if (active) setBlogError("Could not load the blog count.");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-body">
          Manage website blog posts. Product and service previews are stored in
          this browser.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.href}
              className="rounded-xl border border-border bg-background p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-brand/10 p-2.5 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <ButtonLink href={card.createHref} size="sm" variant="outline">
                  <Plus className="h-3.5 w-3.5" />
                  New
                </ButtonLink>
              </div>
              <p className="mt-4 text-3xl font-semibold text-ink">{card.count}</p>
              <Link
                href={card.href}
                className="mt-1 inline-block text-sm font-semibold text-brand hover:underline"
              >
                {card.label}
              </Link>
            </div>
          );
        })}
        <div className="rounded-xl border border-border bg-background p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-brand/10 p-2.5 text-brand">
              <FileText className="h-5 w-5" />
            </div>
            <ButtonLink href="/admin/blogs/new" size="sm" variant="outline">
              <Plus className="h-3.5 w-3.5" />
              New
            </ButtonLink>
          </div>
          <p className="mt-4 text-3xl font-semibold text-ink">
            {blogCount ?? "—"}
          </p>
          <Link
            href="/admin/blogs"
            className="mt-1 inline-block text-sm font-semibold text-brand hover:underline"
          >
            Blogs
          </Link>
          {blogError ? (
            <p className="mt-2 text-xs text-red-600" role="alert">
              {blogError}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
