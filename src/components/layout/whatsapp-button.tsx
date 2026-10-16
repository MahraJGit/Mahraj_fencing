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
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8" fill="none">
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
  );
}
