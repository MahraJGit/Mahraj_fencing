import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav, siteConfig } from "@/content/site";
import { Logo } from "./logo";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="h-1 bg-gradient-to-r from-brand via-brand-dark to-brand" />
      <Container className="py-14 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5 lg:pr-4">
            <Logo variant="footer" />
            <p className="text-sm leading-relaxed text-white/65">
              {siteConfig.description}
            </p>
            <div className="flex gap-3 pt-1">
              {(
                [
                  ["Instagram", siteConfig.social.instagram],
                  ["Facebook", siteConfig.social.facebook],
                  ["LinkedIn", siteConfig.social.linkedin],
                ] as const
              ).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-wider text-white/50 transition hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Products
            </h3>
            <ul className="mt-5 space-y-2.5">
              {footerNav.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Services
            </h3>
            <ul className="mt-5 space-y-2.5">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerNav.company.slice(0, 2).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm text-white/65">
              {siteConfig.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="inline-flex items-start gap-2.5 transition hover:text-white"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>
                      {phone.label}: {phone.display}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.emails[0]}`}
                  className="inline-flex items-start gap-2.5 transition hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {siteConfig.emails[0]}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {siteConfig.address.full}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {footerNav.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
