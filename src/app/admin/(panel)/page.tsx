"use client";

import Link from "next/link";
import { FileText, Layers3, Package, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { listAdminBlogs } from "@/lib/admin/blogs";
import { listAdminProducts, listAdminServices } from "@/lib/admin/catalog";

export default function AdminDashboardPage() {
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [blogError, setBlogError] = useState<string | null>(null);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [serviceCount, setServiceCount] = useState<number | null>(null);
  const [catalogError, setCatalogError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void Promise.all([
      listAdminBlogs(),
      listAdminProducts(),
      listAdminServices(),
    ])
      .then(([blogs, products, services]) => {
        if (!active) return;
        setBlogCount(blogs.length);
        setProductCount(products.length);
        setServiceCount(services.length);
      })
      .catch((error: unknown) => {
        if (!active) return;
        const message =
          error instanceof Error ? error.message : "Could not load dashboard data.";
        setBlogError(message);
        setCatalogError(message);
      });

    return () => {
      active = false;
    };
  }, []);

  const cards = [
    {
      label: "Products",
      count: productCount,
      href: "/admin/products",
      createHref: "/admin/products/new",
      icon: Package,
    },
    {
      label: "Services",
      count: serviceCount,
      href: "/admin/services",
      createHref: "/admin/services/new",
      icon: Layers3,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-body">
          Manage website content shared with the public site.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
              <p className="mt-4 text-3xl font-semibold text-ink">
                {card.count ?? "—"}
              </p>
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
      {catalogError && !blogError ? (
        <p role="alert" className="text-sm text-red-700">
          {catalogError}
        </p>
      ) : null}
    </div>
  );
}
