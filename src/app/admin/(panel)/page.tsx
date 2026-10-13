import Link from "next/link";
import { FileText, Layers3, Package, Plus } from "lucide-react";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { blogPosts } from "@/content/blog";
import { ButtonLink } from "@/components/ui/button";

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
  {
    label: "Blogs",
    count: blogPosts.length,
    href: "/admin/blogs",
    createHref: "/admin/blogs/new",
    icon: FileText,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-body">
          Frontend-only CMS preview. Changes stay in this browser session until a
          backend is connected.
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
      </div>
    </div>
  );
}
