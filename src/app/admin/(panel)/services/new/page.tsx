import { ServiceForm } from "@/components/admin/service-form";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-ink">New service</h1>
        <p className="mt-1 text-sm text-body">
          Create a service with description, highlights, media, and SEO.
        </p>
      </div>
      <ServiceForm mode="create" />
    </div>
  );
}
