"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { StatusBadge } from "@/components/admin/field";
import { Button } from "@/components/ui/button";

export type ResourceRow = {
  slug: string;
  title: string;
  status: "draft" | "published";
  meta?: string;
  featured?: boolean;
};

export function ResourceTable({
  rows,
  basePath,
  onDelete,
}: {
  rows: ResourceRow[];
  basePath: string;
  onDelete: (slug: string) => void;
}) {
  const showFeaturedColumn = rows.some((row) => row.featured !== undefined);

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-background p-10 text-center text-sm text-body">
        No items yet. Create your first one.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-surface-alt text-xs uppercase tracking-wide text-body">
          <tr>
            <th className="px-4 py-3 font-semibold">Title</th>
            <th className="hidden px-4 py-3 font-semibold sm:table-cell">Slug</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            {showFeaturedColumn ? (
              <th className="hidden px-4 py-3 font-semibold sm:table-cell">
                Homepage
              </th>
            ) : null}
            <th className="px-4 py-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.slug} className="hover:bg-surface-alt/60">
              <td className="px-4 py-3">
                <p className="font-semibold text-ink">{row.title}</p>
                {row.meta ? (
                  <p className="mt-0.5 text-xs text-body">{row.meta}</p>
                ) : null}
              </td>
              <td className="hidden px-4 py-3 font-mono text-xs text-body sm:table-cell">
                {row.slug}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={row.status} />
              </td>
              {showFeaturedColumn ? (
                <td className="hidden px-4 py-3 sm:table-cell">
                  {row.featured ? (
                    <span className="inline-flex rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand">
                      Featured
                    </span>
                  ) : (
                    <span className="text-xs text-body">—</span>
                  )}
                </td>
              ) : null}
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`${basePath}/${row.slug}`}
                    className="inline-flex h-9 items-center gap-1 rounded-md border border-border px-3 text-xs font-semibold hover:bg-surface-alt"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (window.confirm(`Delete “${row.title}”?`)) {
                        onDelete(row.slug);
                      }
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
