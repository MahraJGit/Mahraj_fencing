"use client";

import { useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import type { AdminBlogFaq } from "@/lib/admin/types";
import { Field } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function FaqEditor({
  faqs,
  onChange,
}: {
  faqs: AdminBlogFaq[];
  onChange: (faqs: AdminBlogFaq[]) => void;
}) {
  const [expandedFaqs, setExpandedFaqs] = useState<Set<number>>(() => new Set());

  function update(index: number, patch: Partial<AdminBlogFaq>) {
    onChange(faqs.map((faq, i) => (i === index ? { ...faq, ...patch } : faq)));
  }

  function remove(index: number) {
    onChange(faqs.filter((_, i) => i !== index));
    setExpandedFaqs((expanded) => {
      const next = new Set<number>();
      expanded.forEach((faqIndex) => {
        if (faqIndex < index) next.add(faqIndex);
        if (faqIndex > index) next.add(faqIndex - 1);
      });
      return next;
    });
  }

  function add() {
    onChange([...faqs, { question: "", answer: "" }]);
    setExpandedFaqs((expanded) => new Set(expanded).add(faqs.length));
  }

  return (
    <div className="space-y-4">
      {faqs.length === 0 ? (
        <p className="text-sm text-body">
          No FAQs yet. Add questions readers commonly ask about this article.
        </p>
      ) : null}

      {faqs.map((faq, index) => (
        <section
          key={index}
          className="space-y-3 rounded-lg border border-border bg-surface-alt/50 p-4"
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-expanded={expandedFaqs.has(index)}
              aria-controls={`faq-fields-${index}`}
              onClick={() =>
                setExpandedFaqs((expanded) => {
                  const next = new Set(expanded);
                  if (next.has(index)) next.delete(index);
                  else next.add(index);
                  return next;
                })
              }
              className="flex min-h-10 flex-1 items-center justify-between rounded-md text-left text-xs font-semibold uppercase tracking-wide text-body hover:text-ink"
            >
              FAQ {index + 1}
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform ${
                  expandedFaqs.has(index) ? "rotate-180" : ""
                }`}
              />
            </button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </Button>
          </div>
          {expandedFaqs.has(index) ? (
            <div id={`faq-fields-${index}`} className="space-y-3">
              <Field label="Question" htmlFor={`faq-q-${index}`}>
                <Input
                  id={`faq-q-${index}`}
                  value={faq.question}
                  onChange={(e) => update(index, { question: e.target.value })}
                  placeholder="What should readers know?"
                />
              </Field>
              <Field label="Answer" htmlFor={`faq-a-${index}`}>
                <Textarea
                  id={`faq-a-${index}`}
                  rows={3}
                  value={faq.answer}
                  onChange={(e) => update(index, { answer: e.target.value })}
                  placeholder="Clear, useful answer…"
                />
              </Field>
            </div>
          ) : null}
        </section>
      ))}

      <Button type="button" variant="outline" onClick={add}>
        <Plus className="h-4 w-4" />
        Add FAQ
      </Button>
    </div>
  );
}
