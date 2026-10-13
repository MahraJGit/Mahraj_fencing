import type { FaqItem } from "@/content/faq";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <dl className="divide-y divide-border rounded-lg border border-border bg-background">
      {items.map((item) => (
        <div key={item.question} className="p-5 sm:p-6">
          <dt className="text-base font-semibold text-ink">{item.question}</dt>
          <dd className="mt-2 text-sm leading-relaxed text-body">{item.answer}</dd>
        </div>
      ))}
    </dl>
  );
}
