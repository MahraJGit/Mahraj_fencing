"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ServiceForm } from "@/components/admin/service-form";
import { getAdminService } from "@/lib/admin/catalog";
import type { AdminService } from "@/lib/admin/types";

export default function EditServicePage() {
  const params = useParams<{ slug: string }>();
  const [item, setItem] = useState<AdminService | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void getAdminService(params.slug)
      .then((service) => {
        if (active) setItem(service);
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load this service.",
          );
          setItem(null);
        }
      });
    return () => {
      active = false;
    };
  }, [params.slug]);

  if (error) {
    return <p role="alert" className="text-sm text-red-700">{error}</p>;
  }

  if (item === undefined) {
    return <p className="text-sm text-body">Loading…</p>;
  }

  if (!item) {
    return <p className="text-sm text-body">Service not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink">Edit service</h1>
        <p className="mt-1 font-mono text-xs text-body">{item.slug}</p>
      </div>
      <ServiceForm mode="edit" initial={item} />
    </div>
  );
}
