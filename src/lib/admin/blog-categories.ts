export const BLOG_CATEGORIES = [
  "Specifying",
  "Security",
  "Temporary fencing",
  "Operations",
  "Gates",
  "Automation",
  "Installation",
  "Company news",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number] | string;
