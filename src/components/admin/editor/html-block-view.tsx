"use client";

import { useState } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { HtmlBlockModal } from "./html-block-modal";

export function HtmlBlockView({ node, updateAttributes, selected }: NodeViewProps) {
  const [open, setOpen] = useState(false);
  const html = (node.attrs.html as string) || "";

  return (
    <NodeViewWrapper
      className={`my-3 overflow-hidden rounded-lg border ${
        selected ? "border-brand ring-2 ring-brand/20" : "border-border"
      }`}
      data-type="html-block"
    >
      <div
        className="prose-admin bg-background p-4 text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="border-t border-border bg-surface-alt px-3 py-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md bg-[#e8e4d9] px-3 py-1.5 text-xs font-semibold text-ink hover:bg-[#ddd8c8]"
        >
          Edit HTML
        </button>
      </div>
      <HtmlBlockModal
        open={open}
        initialHtml={html}
        onClose={() => setOpen(false)}
        onInsert={(next) => updateAttributes({ html: next })}
      />
    </NodeViewWrapper>
  );
}
