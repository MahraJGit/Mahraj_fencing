"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ServiceForm } from "@/components/admin/service-form";
import { listServices } from "@/lib/admin/storage";
import type { AdminService } from "@/lib/admin/types";

export default function EditServicePage() {
  const params = useParams<{ slug: string }>();
  const [item, setItem] = useState<AdminService | null | undefined>(undefined);

  useEffect(() => {
    const found = listServices().find((s) => s.slug === params.slug) ?? null;
    setItem(found);
  }, [params.slug]);

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
