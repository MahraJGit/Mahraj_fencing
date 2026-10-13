export const siteConfig = {
  name: "Mahraj Fencing",
  legalName: "Mahraj Fencing",
  tagline: "Best fencing suppliers in Dubai | Abu Dhabi | Sharjah | UAE & KSA",
  description:
    "Mahraj Fencing is a trusted fencing company for fences, steel fabrication, concrete blocks, fence branding, gates, barriers, portable cabins, and installation across Dubai, Abu Dhabi, Sharjah, and Riyadh.",
  url: "https://mahrajfencing.com",
  locale: "en_AE",
  emails: ["Waseem@mahraj.com"],
  phones: [
    { label: "KSA", display: "+966 56 602 1891", href: "tel:+966566021891" },
    { label: "UAE", display: "+971 50 882 2414", href: "tel:+971508822414" },
  ],
  whatsapp: {
    display: "+971 50 882 2414",
    href: "https://wa.me/971508822414",
  },
  address: {
    street: "Building 5207 Street 392 Al Malqa",
    city: "Riyadh",
    country: "Saudi Arabia",
    full: "Building 5207 Street 392 Al Malqa, Riyadh, Saudi Arabia",
  },
  regions: ["Dubai", "Abu Dhabi", "Sharjah", "Riyadh"],
  social: {
    instagram: "https://www.instagram.com/mahrajarabia/",
    facebook: "https://www.facebook.com/mahrajarabia/",
    linkedin: "https://www.linkedin.com/company/mahrajarabia/",
  },
  copyrightYear: 2026,
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
        href: "/products/portable-site-cabins",
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
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
];

export const footerNav = {
  company: [
    { label: "Our company", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact us", href: "/contact" },
  ],
  products: [
    { label: "Fences", href: "/products?category=perimeter-fencing" },
    { label: "Gates", href: "/products?category=gates-access" },
    { label: "Barriers", href: "/products?category=barriers-security" },
    { label: "Portable cabin", href: "/products/portable-site-cabins" },
  ],
  services: [
    { label: "Fence branding", href: "/services/supply-and-branding" },
    { label: "Installation", href: "/services/installation" },
    { label: "Transportation", href: "/services/transport-and-logistics" },
    { label: "Shifting", href: "/services/shifting-and-relocation" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
