import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav, siteConfig } from "@/content/site";
import { Logo } from "./logo";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-charcoal text-white">
      <Container className="py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo variant="footer" />
            <p className="text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Products
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNav.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerNav.company.slice(0, 2).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {siteConfig.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="inline-flex items-start gap-2 hover:text-white"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      {phone.label}: {phone.display}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.emails[0]}`}
                  className="inline-flex items-start gap-2 hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  {siteConfig.emails[0]}
                </a>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {siteConfig.address.full}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {footerNav.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
