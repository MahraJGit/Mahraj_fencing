"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_BYTES = 2 * 1024 * 1024; // 2MB for local demo

type ImageUploadFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  /** Optional: set alt from filename when empty */
  onAltFromFile?: (alt: string) => void;
  placeholder?: string;
  hint?: string;
  previewClassName?: string;
};

export function ImageUploadField({
  id,
  value,
  onChange,
  onAltFromFile,
  placeholder = "/images/… or https://…",
  hint = "JPG, PNG, WebP, GIF · max 2MB",
  previewClassName,
}: ImageUploadFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

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
      onChange(result);
      onAltFromFile?.(file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
      setPending(false);
      if (fileRef.current) fileRef.current.value = "";
    };
    reader.onerror = () => {
      setError("Could not read that file. Try another image.");
      setPending(false);
    };
    reader.readAsDataURL(file);
  }

  const showPreview = Boolean(value && value.length > 4);

  return (
    <div className="space-y-3">
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
        disabled={pending}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface-alt px-4 py-6 text-sm text-body transition hover:border-brand/40 hover:bg-brand/5 disabled:opacity-60"
      >
        <Upload className="h-5 w-5 text-brand" />
        <span className="font-semibold text-ink">
          {pending ? "Reading image…" : "Upload from PC"}
        </span>
        <span className="text-xs">{hint}</span>
      </button>

      <div className="relative text-center text-[10px] font-semibold uppercase tracking-wide text-body">
        <span className="relative z-10 bg-background px-2">or URL</span>
        <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
      </div>

      <Input
        id={id}
        value={value.startsWith("data:") ? "" : value}
        placeholder={value.startsWith("data:") ? "Uploaded from PC" : placeholder}
        disabled={value.startsWith("data:")}
        onChange={(e) => {
          setError(null);
          onChange(e.target.value);
        }}
      />

      {showPreview ? (
        <div className="relative overflow-hidden rounded-lg border border-border bg-surface-alt">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className={cn("mx-auto max-h-40 object-contain", previewClassName)}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="absolute right-2 top-2"
            onClick={() => {
              onChange("");
              setError(null);
            }}
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        </div>
      ) : null}

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
