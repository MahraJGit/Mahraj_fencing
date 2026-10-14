"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LinkInsertModalProps = {
  open: boolean;
  initialUrl?: string;
  onClose: () => void;
  onApply: (url: string) => void;
  onRemove: () => void;
};

export function LinkInsertModal({
  open,
  initialUrl = "",
  onClose,
  onApply,
  onRemove,
}: LinkInsertModalProps) {
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    if (open) setUrl(initialUrl || "https://");
  }, [open, initialUrl]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/50 p-4">
      <div
        role="dialog"
        aria-modal
        aria-labelledby="link-insert-title"
        className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-background shadow-xl"
      >
        <div className="border-b border-border px-5 py-4">
          <h2
            id="link-insert-title"
            className="font-heading text-lg font-semibold text-ink"
          >
            Insert link
          </h2>
          <p className="mt-1 text-sm text-body">
            Add a URL to the selected text, or remove an existing link.
          </p>
        </div>
        <div className="space-y-3 px-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="link-url">URL</Label>
            <Input
              id="link-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://…"
              autoFocus
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-2 border-t border-border px-5 py-4">
          {initialUrl ? (
            <Button type="button" variant="outline" onClick={onRemove}>
              Remove link
            </Button>
          ) : null}
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              const next = url.trim();
              if (!next) return;
              onApply(next);
              onClose();
            }}
          >
            Apply link
          </Button>
        </div>
      </div>
    </div>
  );
}
