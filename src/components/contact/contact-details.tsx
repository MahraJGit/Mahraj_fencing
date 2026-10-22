import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/content/site";

export function ContactDetails() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-ink">Talk to our team</h2>
        <p className="mt-2 text-sm text-body">
          Share drawings, approximate lengths, or a site pin. We coordinate
          quickly on phone, email, or WhatsApp.
        </p>
      </div>
      <ul className="space-y-4">
        {siteConfig.phones.map((phone) => (
          <li key={phone.href}>
            <a
              href={phone.href}
              className="flex gap-3 rounded-lg border border-border p-4 hover:border-brand/40"
            >
              <Phone className="h-5 w-5 shrink-0 text-brand" />
              <div>
                <p className="text-xs font-semibold uppercase text-body">
                  {phone.label}
                </p>
                <p className="font-semibold text-ink">{phone.display}</p>
              </div>
            </a>
          </li>
        ))}
        <li>
          <a
            href={`mailto:${siteConfig.emails[0]}`}
            className="flex gap-3 rounded-lg border border-border p-4 hover:border-brand/40"
          >
            <Mail className="h-5 w-5 shrink-0 text-brand" />
            <div>
              <p className="text-xs font-semibold uppercase text-body">Email</p>
              <p className="font-semibold text-ink">{siteConfig.emails[0]}</p>
            </div>
          </a>
        </li>
        <li className="flex gap-3 rounded-lg border border-border p-4">
          <MapPin className="h-5 w-5 shrink-0 text-brand" />
          <div>
            <p className="text-xs font-semibold uppercase text-body">Office</p>
            <p className="text-sm text-charcoal">{siteConfig.address.full}</p>
            <p className="mt-2 text-xs text-body">
              Service area: {siteConfig.regions.join(", ")}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
