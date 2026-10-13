"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type HtmlBlockModalProps = {
  open: boolean;
  initialHtml?: string;
  onClose: () => void;
  onInsert: (html: string) => void;
};

export function HtmlBlockModal({
  open,
  initialHtml = "",
  onClose,
  onInsert,
}: HtmlBlockModalProps) {
  const [html, setHtml] = useState(initialHtml);

  useEffect(() => {
    if (open) setHtml(initialHtml);
  }, [open, initialHtml]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/50 p-4">
      <div
        role="dialog"
        aria-modal
        aria-labelledby="html-block-title"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-background shadow-xl"
      >
        <div className="border-b border-border px-5 py-4">
          <h2 id="html-block-title" className="font-heading text-lg font-semibold text-ink">
            Custom HTML
          </h2>
          <p className="mt-1 text-sm text-body">
            Paste a table or any other HTML. It is rendered on the article. The
            code button still shows code as text.
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="custom-html">HTML</Label>
            <Textarea
              id="custom-html"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              rows={10}
              className="font-mono text-xs"
              placeholder="<table>...</table>"
            />
          </div>
          <div className="space-y-2">
            <Label>Preview</Label>
            <div
              className="prose-admin min-h-24 overflow-auto rounded-lg border border-border bg-surface-alt p-4 text-sm"
              dangerouslySetInnerHTML={{
                __html: html || "<p class='text-body'>Preview appears here.</p>",
              }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (!html.trim()) return;
              onInsert(html);
              onClose();
            }}
          >
            Insert
          </Button>
        </div>
      </div>
    </div>
  );
}
