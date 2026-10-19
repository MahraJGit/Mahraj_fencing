"use client";

import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

export function SiteChrome({
  children,
  navItems,
  productFooterLinks,
  serviceFooterLinks,
}: {
  children: React.ReactNode;
  navItems: NavItem[];
  productFooterLinks: { label: string; href: string }[];
  serviceFooterLinks: { label: string; href: string }[];
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  const overlay = true;

  return (
    <>
      {/* Overlay header is absolutely positioned inside a relative wrapper so
          it adds no height to the document flow. */}
      <div className={overlay ? "relative flex flex-1 flex-col" : "contents"}>
        <SiteHeader
          overlay={overlay}
          activePath={pathname}
          navItems={navItems}
        />
        <main className="flex-1">{children}</main>
      </div>
      <SiteFooter
        productLinks={productFooterLinks}
        serviceLinks={serviceFooterLinks}
      />
      <WhatsAppButton />
    </>
  );
}
