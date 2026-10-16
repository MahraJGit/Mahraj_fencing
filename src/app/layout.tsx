import type { Metadata } from "next";
import { Suspense } from "react";
import { Barlow_Condensed, Inter, Outfit, Public_Sans } from "next/font/google";
import { SiteChrome } from "@/components/layout/site-chrome";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/content/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const footerBody = Inter({
  subsets: ["latin"],
  variable: "--font-footer-body",
  display: "swap",
});

const footerHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-footer-heading",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: siteConfig.tagline,
    description: siteConfig.description,
    path: "/",
    image: "/images/logo.png",
  }),
  keywords: [
    "fencing company Dubai",
    "fencing suppliers Abu Dhabi",
    "fencing Sharjah",
    "fencing contractors UAE",
    "fencing Riyadh",
    "chain link fence",
    "temporary fencing",
    "palisade fence",
    "fence branding",
    "portable cabin",
    "Mahraj Fencing",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  category: "construction",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/images/logo.png", type: "image/png" }],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.emails[0],
      telephone: siteConfig.phones.map((p) => p.display),
      logo: absoluteUrl("/images/logo.png"),
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.facebook,
        siteConfig.social.linkedin,
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressCountry: siteConfig.address.country,
      },
      areaServed: siteConfig.regions.map((name) => ({
        "@type": "City",
        name,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteConfig.url}/#localbusiness`,
      name: siteConfig.name,
      image: absoluteUrl("/images/logo.png"),
      url: siteConfig.url,
      telephone: siteConfig.phones[0].display,
      email: siteConfig.emails[0],
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressCountry: siteConfig.address.country,
      },
      parentOrganization: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${barlowCondensed.variable} ${footerBody.variable} ${footerHeading.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd} />
        <Suspense fallback={<main className="flex-1">{children}</main>}>
          <SiteChrome>{children}</SiteChrome>
        </Suspense>
      </body>
    </html>
  );
}
