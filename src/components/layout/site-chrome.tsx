"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

export function SiteChrome({ children }: { children: React.ReactNode }) {
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
        <SiteHeader overlay={overlay} activePath={pathname} />
        <main className="flex-1">{children}</main>
      </div>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
