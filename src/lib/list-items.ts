const BULLET_MARKER = /(?:^|\s)[•·▪◦‣⁃]\s*/u;
const BULLET_SPLIT = /(?:^|\s)[•·▪◦‣⁃]\s*/gu;
const LIST_PREFIX = /^\s*(?:[-*+]\s+|\d+[.)]\s+|[•·▪◦‣⁃]\s*)/u;

export function parseListItems(value: string | string[]): string[] {
  const lines = (Array.isArray(value) ? value : [value])
    .flatMap((item) => item.replace(/\u00a0/g, " ").split(/\r\n?|\n/));

  return lines.flatMap((line) => {
    const trimmed = line.trim();
    if (!trimmed) return [];

    const parts = BULLET_MARKER.test(trimmed)
      ? trimmed.split(BULLET_SPLIT)
      : [trimmed];

    return parts
      .map((part) => part.replace(LIST_PREFIX, "").trim())
      .filter(Boolean);
  });
}
