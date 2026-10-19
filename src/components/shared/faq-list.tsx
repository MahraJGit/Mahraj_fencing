import type { FaqItem } from "@/content/faq";
import { ChevronDown } from "lucide-react";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <ul className="divide-y divide-border rounded-lg border border-border bg-background">
      {items.map((item) => (
        <li key={item.question}>
          <details open className="group p-5 sm:p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                aria-hidden="true"
                className="size-4 shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-body">
              {item.answer}
            </p>
          </details>
        </li>
      ))}
    </ul>
  );
}
