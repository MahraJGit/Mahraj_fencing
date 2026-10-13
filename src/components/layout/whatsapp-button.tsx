import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/site";

export function WhatsAppButton() {
  return (
    <a
      href={siteConfig.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`Chat on WhatsApp ${siteConfig.whatsapp.display}`}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
