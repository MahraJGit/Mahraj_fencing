"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ResourceTable } from "@/components/admin/resource-table";
import { deleteAdminService, listAdminServices } from "@/lib/admin/catalog";
import type { AdminService } from "@/lib/admin/types";

export default function AdminServicesPage() {
  const [items, setItems] = useState<AdminService[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    listAdminServices()
      .then((services) => {
        if (active) {
          setItems(services);
          setError(null);
        }
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load services.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function remove(slug: string) {
    setLoading(true);
    try {
      await deleteAdminService(slug);
      setItems(await listAdminServices());
      setError(null);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete the service.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-ink">Services</h1>
          <p className="mt-1 text-sm text-body">
            Manage service pages shown on the public site.
          </p>
        </div>
        <ButtonLink href="/admin/services/new" size="sm">
          <Plus className="h-4 w-4" />
          New service
        </ButtonLink>
      </div>
      {error ? (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {loading ? (
        <p className="text-sm text-body">Loading services…</p>
      ) : (
        <ResourceTable
          basePath="/admin/services"
          rows={items.map((item) => ({
            slug: item.slug,
            title: item.title,
            status: item.status,
            meta: item.summary,
            featured: item.isFeatured,
          }))}
          onDelete={remove}
        />
      )}
    </div>
  );
}
