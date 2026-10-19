import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

/** Always Mahraj Fencing brand mark for social / OG. */
export const BRAND_OG_IMAGE = "/images/logo.png";

export function absoluteUrl(path = ""): string {
  if (/^https?:\/\//i.test(path)) return path;
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return path ? `${base}${normalized}` : base;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? BRAND_OG_IMAGE);
  const fullTitle =
    path === "" || path === "/"
      ? title.includes(siteConfig.name)
        ? title
        : `${siteConfig.name} | ${title}`
      : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    applicationName: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          alt: `${siteConfig.name} — fencing suppliers UAE & KSA`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
