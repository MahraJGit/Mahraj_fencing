"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ResourceTable } from "@/components/admin/resource-table";
import { deleteService, listServices } from "@/lib/admin/storage";
import type { AdminService } from "@/lib/admin/types";

export default function AdminServicesPage() {
  const [items, setItems] = useState<AdminService[]>([]);

  useEffect(() => {
    setItems(listServices());
  }, []);

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
      <ResourceTable
        basePath="/admin/services"
        rows={items.map((item) => ({
          slug: item.slug,
          title: item.title,
          status: item.status,
          meta: item.summary,
        }))}
        onDelete={(slug) => {
          deleteService(slug);
          setItems(listServices());
        }}
      />
    </div>
  );
}
