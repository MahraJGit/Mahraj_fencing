"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ARTICLE_BODY_IMAGE_HINT } from "@/lib/admin/image-guidelines";

type ImageInsertModalProps = {
  open: boolean;
  onClose: () => void;
  onInsert: (src: string, alt?: string) => void;
};

const MAX_BYTES = 2 * 1024 * 1024; // 2MB for local demo

export function ImageInsertModal({
  open,
  onClose,
  onInsert,
}: ImageInsertModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (!open) return null;

  function reset() {
    setUrl("");
    setAlt("");
    setPreview(null);
    setError(null);
    setPending(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, WebP, GIF).");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Image must be under 2MB for this demo upload.");
      return;
    }
    setPending(true);
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setPreview(result);
      setUrl(result);
      setPending(false);
      if (!alt) setAlt(file.name.replace(/\.[^.]+$/, ""));
    };
    reader.onerror = () => {
      setError("Could not read that file. Try another image.");
      setPending(false);
    };
    reader.readAsDataURL(file);
  }

  function handleInsert() {
    const src = (preview || url).trim();
    if (!src) {
      setError("Upload an image or paste an image URL.");
      return;
    }
    onInsert(src, alt.trim() || undefined);
    handleClose();
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/50 p-4">
      <div
        role="dialog"
        aria-modal
        aria-labelledby="image-insert-title"
        className="flex w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border bg-background shadow-xl"
      >
        <div className="border-b border-border px-5 py-4">
          <h2
            id="image-insert-title"
            className="font-heading text-lg font-semibold text-ink"
          >
            Insert image
          </h2>
          <p className="mt-1 text-sm text-body">
            Upload from your PC or paste an image URL. {ARTICLE_BODY_IMAGE_HINT}
          </p>
        </div>

        <div className="space-y-4 px-5 py-4">
          <div className="space-y-2">
            <Label>Upload from PC</Label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface-alt px-4 py-8 text-sm text-body transition hover:border-brand/40 hover:bg-brand/5"
            >
              <Upload className="h-6 w-6 text-brand" />
              <span className="font-semibold text-ink">
                {pending ? "Reading image…" : "Choose image from computer"}
              </span>
              <span className="text-xs">JPG, PNG, WebP, GIF · max 2MB</span>
            </button>
          </div>

          <div className="relative text-center text-xs font-semibold uppercase tracking-wide text-body">
            <span className="relative z-10 bg-background px-2">or</span>
            <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              value={preview ? "" : url}
              disabled={Boolean(preview)}
              placeholder="https://… or /images/…"
              onChange={(e) => {
                setPreview(null);
                setUrl(e.target.value);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-alt">Alt text</Label>
            <Input
              id="image-alt"
              value={alt}
              placeholder="Describe the image"
              onChange={(e) => setAlt(e.target.value)}
            />
          </div>

          {(preview || (url && !url.startsWith("data:") && url.length > 4)) && (
            <div className="overflow-hidden rounded-lg border border-border bg-surface-alt">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview || url}
                alt={alt || "Preview"}
                className="mx-auto max-h-48 object-contain"
              />
            </div>
          )}

          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleInsert} disabled={pending}>
            Insert
          </Button>
        </div>
      </div>
    </div>
  );
}
