export const siteConfig = {
  name: "Mahraj Fencing",
  legalName: "Mahraj Fencing",
  tagline: "Fencing suppliers and contractors in Dubai",
  description:
    "Mahraj Fencing supplies and installs fences, steel fabrication, concrete blocks, fence branding, gates, barriers, and portable cabins for construction and industrial projects in Dubai.",
  url: "https://mahrajfencing.com",
  locale: "en_AE",
  emails: ["Fencing@mahraj.com"],
  phones: [
    { label: "Dubai", display: "+971 55 765 7570", href: "tel:+971557657570" },
  ],
  whatsapp: {
    display: "+971 55 765 7570",
    href: "https://wa.me/971557657570",
  },
  address: {
    street: "2204 B2B Tower, Marasi Drive Street, Business Bay",
    city: "Dubai",
    country: "United Arab Emirates",
    full: "2204 B2B Tower, Marasi Drive Street, Business Bay, Dubai, UAE",
  },
  regions: ["Dubai"],
  social: {
    instagram: "https://www.instagram.com/mahrajarabia/",
    facebook: "https://www.facebook.com/mahrajarabia/",
    linkedin: "https://www.linkedin.com/company/mahrajarabia/",
  },
  copyrightYear: 2026,
} as const;

export const cataloguePdf = {
  href: "/MAHRAJ_FENCING_CATALOG_UPDATED.pdf",
  downloadName: "Mahraj-Fencing-Catalogue.pdf",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Our company", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Fences",
        href: "/products?category=perimeter-fencing",
        description: "Chain link, mesh, palisade & temporary",
      },
      {
        label: "Accessories",
        href: "/products?category=accessories",
        description: "Posts, clamps, wire & hardware",
      },
      {
        label: "Concrete block / foundation",
        href: "/products?category=concrete-blocks",
        description: "Interlocking blocks & fence bases",
      },
      {
        label: "Gates",
        href: "/products?category=gates-access",
        description: "Sliding, swing & security gates",
      },
      {
        label: "Signage & boards",
        href: "/products?category=signage-branding",
        description: "Project boards & fence branding",
      },
      {
        label: "Portable cabin",
        href: "/products?category=portable-structures",
        description: "Site offices & storage units",
      },
      {
        label: "Barrier",
        href: "/products?category=barriers-security",
        description: "Crash barriers & anti-climb",
      },
      {
        label: "Other fencing solutions",
        href: "/products",
        description: "View full product catalog",
      },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Contact us", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export const footerNav = {
  company: [
    { label: "Our company", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;
