import { Wrap } from "@/components/layout/wrap";
import type { AdminService } from "@/lib/admin/types";

export function ServicesQuickNav({ services }: { services: AdminService[] }) {
  return (
    <nav aria-label="Services" className="bg-white py-7">
      <Wrap>
        <ul className="grid gap-4 font-semibold text-ink sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((service, index) => (
            <li key={service.slug}>
              <a
                href={`#${service.slug}`}
                className="block text-base leading-[1.5] transition hover:text-brand"
              >
                {String(index + 1).padStart(2, "0")}{"   "}
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </Wrap>
    </nav>
  );
}
