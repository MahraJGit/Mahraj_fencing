import { Download } from "lucide-react";
import { cataloguePdf, siteConfig } from "@/content/site";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 rounded-full border border-black/10 bg-black/30 p-2 shadow-[0_8px_28px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.04] backdrop-blur-md">
      <a
        href={siteConfig.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-colors hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label={`Chat on WhatsApp ${siteConfig.whatsapp.display}`}
      >
        <svg aria-hidden="true" viewBox="0 0 32 32" className="h-6 w-6" fill="none">
          <path
            d="M16 3.5a12.1 12.1 0 0 0-10.3 18.4L4 28l6.3-1.6A12.1 12.1 0 1 0 16 3.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M12.1 9.8c-.3-.7-.6-.7-.9-.7h-.7c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.3 2.5 4 6.2 5.4 3.1 1.2 3.7 1 4.4.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5s-2.2-1.1-2.6-1.2c-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.5-.2.3-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.5-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.6.1-.3.1-.5 0-.7-.1-.2-.8-2-1.1-2.7Z"
            fill="currentColor"
          />
        </svg>
      </a>
      <span aria-hidden="true" className="h-8 w-px bg-white/20" />
      <a
        href={cataloguePdf.href}
        download={cataloguePdf.downloadName}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#8c1024] text-white shadow-sm transition-all hover:scale-[1.04] hover:bg-[#6e0c1c] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label="Download the Mahraj Fencing catalogue PDF"
        title="Download Catalogue"
      >
        <Download aria-hidden="true" className="h-6 w-6" />
      </a>
    </div>
  );
}
