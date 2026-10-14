import type { Editor } from "@tiptap/react";
import { slugify } from "@/lib/admin/types";

export type TocHeading = {
  level: number;
  text: string;
  id: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function uniqueId(base: string, used: Map<string, number>) {
  let id = base || "section";
  const count = used.get(id) ?? 0;
  used.set(id, count + 1);
  if (count > 0) id = `${id}-${count + 1}`;
  return id;
}

/** Assign stable ids to headings and return TOC entries. */
export function syncHeadingIds(editor: Editor): TocHeading[] {
  const headings: TocHeading[] = [];
  const used = new Map<string, number>();
  const { tr } = editor.state;
  let modified = false;

  editor.state.doc.descendants((node, pos) => {
    if (node.type.name !== "heading") return;
    const text = node.textContent.trim();
    if (!text) return;
    const id = uniqueId(slugify(text), used);
    if (node.attrs.id !== id) {
      tr.setNodeMarkup(pos, undefined, { ...node.attrs, id });
      modified = true;
    }
    headings.push({ level: node.attrs.level as number, text, id });
  });

  if (modified) editor.view.dispatch(tr);
  return headings;
}

export function buildTocHtml(headings: TocHeading[]): string {
  if (!headings.length) return "";
  const items = headings
    .map(
      (h) =>
        `<li class="blog-toc-item blog-toc-h${h.level}"><a href="#${h.id}">${escapeHtml(h.text)}</a></li>`,
    )
    .join("");
  return `<nav class="blog-toc" data-type="blog-toc"><p class="blog-toc-title">Table of contents</p><ol>${items}</ol></nav>`;
}

/** Ensure embedded tables use the shared blog table class. */
export function ensureBlogTableClass(html: string): string {
  return html.replace(/<table\b([^>]*)>/gi, (full, attrs: string) => {
    if (/\bclass\s*=/.test(attrs)) {
      if (/\bblog-table\b/.test(attrs)) return full;
      return full.replace(
        /class\s*=\s*(["'])(.*?)\1/i,
        (_m, q: string, classes: string) =>
          `class=${q}${classes} blog-table${q}`,
      );
    }
    return `<table class="blog-table"${attrs}>`;
  });
}

export const BLOG_TABLE_TEMPLATE = `<table class="blog-table">
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
      <th>Column 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Row 1</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Row 2</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>`;
