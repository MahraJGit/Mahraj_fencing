import { slugify } from "@/lib/admin/types";

export type BlogHeading = {
  id: string;
  level: number;
  text: string;
};

function decodeHtmlText(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, code: string) => {
      if (code[0] === "#") {
        const numeric = code[1].toLowerCase() === "x"
          ? Number.parseInt(code.slice(2), 16)
          : Number.parseInt(code.slice(1), 10);
        return Number.isInteger(numeric) && numeric >= 0 && numeric <= 0x10ffff
          ? String.fromCodePoint(numeric)
          : entity;
      }

      const named: Record<string, string> = {
        amp: "&",
        lt: "<",
        gt: ">",
        quot: '"',
        apos: "'",
        nbsp: " ",
      };
      return named[code.toLowerCase()] ?? entity;
    })
    .replace(/\s+/g, " ")
    .trim();
}

export function prepareBlogContent(html: string) {
  const usedIds = new Map<string, number>();
  const headings: BlogHeading[] = [];
  const content = html.replace(
    /<(h[1-3])\b([^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag: string, attributes: string, innerHtml: string) => {
      const text = decodeHtmlText(innerHtml);
      if (!text) return match;

      const baseId = slugify(text) || "section";
      const count = usedIds.get(baseId) ?? 0;
      usedIds.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
      const level = Number(tag.slice(1));
      headings.push({ id, level, text });

      const remainingAttributes = attributes.replace(
        /\s+id\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/i,
        "",
      );
      return `<${tag}${remainingAttributes} id="${id}">${innerHtml}</${tag}>`;
    },
  );

  return { content, headings };
}
