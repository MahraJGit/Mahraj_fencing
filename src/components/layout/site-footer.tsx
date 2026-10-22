import Image from "next/image";
import Link from "next/link";
import { footerNav, siteConfig } from "@/content/site";
import { Logo } from "./logo";
import { Wrap } from "./wrap";

const colTitle =
  "text-sm font-semibold uppercase leading-5 tracking-[0.7px] text-white/90";
const colLink =
  "flex h-6 items-center text-sm leading-5 text-white/70 transition hover:text-white";
const socialIconClass =
  "flex size-10 items-center justify-center rounded-md border border-white/[0.15] text-white/75 transition hover:border-white/55 hover:text-white";

const socials = [
  { label: "Facebook", href: siteConfig.social.facebook, network: "facebook" },
  { label: "Instagram", href: siteConfig.social.instagram, network: "instagram" },
  { label: "LinkedIn", href: siteConfig.social.linkedin, network: "linkedin" },
  { label: "YouTube", href: null, network: "youtube" },
] as const;

type SocialNetwork = (typeof socials)[number]["network"];

function SocialMark({ network }: { network: SocialNetwork }) {
  if (network === "facebook") {
    return <span className="font-sans text-[21px] font-semibold leading-none">f</span>;
  }

  if (network === "linkedin") {
    return <span className="font-sans text-base font-bold leading-none">in</span>;
  }

  if (network === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.6" cy="6.6" r="1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <rect x="3" y="5.5" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
    </svg>
  );
}

export function SiteFooter({
  productLinks,
  serviceLinks,
}: {
  productLinks: { label: string; href: string }[];
  serviceLinks: { label: string; href: string }[];
}) {
  return (
    <footer
      className="bg-[#131313] text-white"
      style={{ fontFamily: "var(--font-footer-body)" }}
    >
      <Wrap className="max-w-[1440px] px-5 py-8 md:px-10 xl:min-h-[322px] xl:px-[100px] xl:pt-[42px] xl:pb-8">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-[1.48fr_0.5fr_0.53fr_0.85fr] xl:gap-x-12">
          <div>
            <Logo variant="footer" />
            <p className="mt-[13px] w-full max-w-[477px] text-sm leading-[23px] text-white/70">
              Mahraj Fencing is a trusted fencing company for fences, steel
              <br className="hidden xl:block" />
              {" "}
              fabrication, concrete blocks, fence branding, gates,
              <br className="hidden xl:block" />
              {" "}
              barriers, portable cabins, and installation
              <br className="hidden xl:block" />
              {" "}
              across Dubai.
            </p>
            <div className="mt-4 flex gap-3 pt-1 xl:mt-[15px]">
              {socials.map(({ label, href, network }) => {
                const mark = <SocialMark network={network} />;

                return href ? (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialIconClass}
                  >
                    {mark}
                  </a>
                ) : (
                  <span key={label} aria-hidden="true" className={socialIconClass}>
                    {mark}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="xl:pt-[9px]">
            <h3 className={colTitle} style={{ fontFamily: "var(--font-footer-heading)" }}>
              Products
            </h3>
            <ul className="mt-4 space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={colLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="xl:pt-[9px]">
            <h3 className={colTitle} style={{ fontFamily: "var(--font-footer-heading)" }}>
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={colLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerNav.company.slice(0, 2).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={colLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="xl:pt-[9px]">
            <h3 className={colTitle} style={{ fontFamily: "var(--font-footer-heading)" }}>
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-5 text-white/70">
              {siteConfig.phones.map((phone) => (
                <li key={phone.href} className="h-[23px] pb-[3px]">
                  <a
                    href={phone.href}
                    className="inline-flex h-5 items-center gap-2 transition hover:text-white"
                  >
                    <Image
                      src="/images/figma/home/feature-1.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4 shrink-0"
                    />
                    <span>
                      {phone.label}: {phone.display}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.emails[0]}`}
                  className="inline-flex h-5 items-center gap-2 transition hover:text-white"
                >
                  <Image
                    src="/images/figma/home/feature-2.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 shrink-0"
                  />
                  {siteConfig.emails[0]}
                </a>
              </li>
              <li className="flex min-h-10 items-start gap-2">
                <Image
                  src="/images/figma/home/feature-3.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="mt-0.5 h-4 w-4 shrink-0"
                />
                <span className="max-w-[230px]">{siteConfig.address.full}</span>
              </li>
            </ul>
          </div>
        </div>
      </Wrap>

      <div className="bg-brand">
        <Wrap className="mx-auto flex min-h-[39px] max-w-[1240px] flex-col gap-2 px-5 py-2 text-xs leading-4 text-white sm:flex-row sm:items-center sm:justify-between sm:py-0 xl:px-0">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerNav.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white transition hover:text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Wrap>
      </div>
    </footer>
  );
}
