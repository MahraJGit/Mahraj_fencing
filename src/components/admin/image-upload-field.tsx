"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSupabaseClient } from "@/lib/supabase/client";

const MAX_BYTES = 2 * 1024 * 1024;

type ImageUploadFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  uploadFolder?: string;
  /** Optional: set alt from filename when empty */
  onAltFromFile?: (alt: string) => void;
  placeholder?: string;
  hint?: string;
  previewClassName?: string;
  previewAspectClassName?: string;
  required?: boolean;
  compact?: boolean;
};

export function ImageUploadField({
  id,
  value,
  onChange,
  uploadFolder,
  onAltFromFile,
  placeholder = "/images/… or https://…",
  hint = "JPG, PNG, WebP, GIF · max 2MB",
  previewClassName,
  previewAspectClassName = "aspect-video",
  required = false,
  compact = false,
}: ImageUploadFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      setError("Please choose an image file (JPG, PNG, WebP, GIF).");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Image must be under 2MB.");
      return;
    }

    if (uploadFolder) {
      setPending(true);
      try {
        const extensionByType: Record<string, string> = {
          "image/jpeg": "jpg",
          "image/png": "png",
          "image/webp": "webp",
          "image/gif": "gif",
        };
        const extension = extensionByType[file.type];
        const path = `${uploadFolder}/${crypto.randomUUID()}.${extension}`;
        const { data, error: uploadError } = await getSupabaseClient()
          .storage.from("blog-images")
          .upload(path, file, { contentType: file.type, cacheControl: "3600" });

        if (uploadError) throw uploadError;
        const { data: publicUrl } = getSupabaseClient()
          .storage.from("blog-images")
          .getPublicUrl(data.path);
        onChange(publicUrl.publicUrl);
        onAltFromFile?.(file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
        if (fileRef.current) fileRef.current.value = "";
      } catch (uploadError) {
        setError(
          uploadError instanceof Error
            ? uploadError.message
            : "Could not upload that image. Try again.",
        );
      } finally {
        setPending(false);
      }
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
        className={cn(
          "flex w-full items-center rounded-lg border border-dashed border-border bg-surface-alt text-sm text-body transition hover:border-brand/40 hover:bg-brand/5 disabled:opacity-60",
          compact
            ? "justify-start gap-3 px-4 py-3"
            : "flex-col justify-center gap-2 px-4 py-6",
        )}
      >
        <Upload className={cn("shrink-0 text-brand", compact ? "h-4 w-4" : "h-5 w-5")} />
        <span className="font-semibold text-ink">
          {pending ? (uploadFolder ? "Uploading image…" : "Reading image…") : "Upload from PC"}
        </span>
        <span className={cn("text-xs", compact && "ml-auto text-right")}>{hint}</span>
      </button>

      <div className="relative text-center text-[10px] font-semibold uppercase tracking-wide text-body">
        <span className="relative z-10 bg-background px-2">or URL</span>
        <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
      </div>

      <Input
        id={id}
        required={required}
        value={value.startsWith("data:") ? "" : value}
        placeholder={value.startsWith("data:") ? "Uploaded from PC" : placeholder}
        disabled={value.startsWith("data:")}
        onChange={(e) => {
          setError(null);
          onChange(e.target.value);
        }}
      />

      {showPreview ? (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border border-border bg-surface-alt",
            previewAspectClassName,
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className={cn("h-full w-full object-contain", previewClassName)}
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
