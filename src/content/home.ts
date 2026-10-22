export const homeContent = {
  hero: {
    brand: "Mahraj Fencing",
    title: "Fencing suppliers and contractors in Dubai",
    subtitle:
      "Fencing, steel fabrication, concrete blocks, fence branding, gates, barriers, and portable cabins, supplied and installed for projects in Dubai.",
    primaryCta: { label: "View products", href: "/products" },
    secondaryCta: { label: "Contact us", href: "/contact" },
    image: "/images/profile/site-compound-fencing.jpg",
    video: "/images/home-hero-video.mp4",
  },
  productShowcase: {
    title: "Our products",
    description:
      "Fences, gates, barriers, portable cabins, signage & boards, concrete blocks, accessories, and complete fencing solutions for construction sites.",
  },
  services: {
    title: "Our services",
    description:
      "Fence supply & branding, installation, transportation, and fence shifting. One contractor from factory to site.",
  },
  about: {
    title: "Mahraj Fencing, fencing company you can trust",
    description:
      "Mahraj Fencing is a trusted Dubai fencing contractor for fences, steel fabrication, concrete blocks, fence branding, and construction signage. We deliver turn-key perimeter solutions from supply through installation.",
    points: [
      "ISO-aligned quality processes",
      "Dubai-based supply & logistics",
      "Turn-key manufacturing to installation",
      "Trusted by contractors & developers",
    ],
  },
  projects: {
    title: "Our projects",
    description:
      "Fencing, hoarding, and security perimeter projects delivered for contractors and asset owners in Dubai.",
  },
  certifications: {
    title: "Certification",
    description:
      "Accredited quality processes and supplier credentials that support consultant specifications and client audits.",
    items: [
      { name: "ISO 9001:2015", detail: "Quality management for supply and install" },
      { name: "ICV aligned", detail: "Local value contribution for Dubai projects" },
      { name: "HSE ready", detail: "Method statements and live-site controls" },
    ],
  },
  clients: {
    title: "Our prestigious clients",
    description:
      "We work with contractors, developers, utilities, and industrial operators on high-profile projects across Dubai.",
    names: [
      "Tier-1 contractors",
      "Real estate developers",
      "Infrastructure JVs",
      "Utilities & energy",
      "Logistics operators",
      "Industrial facilities",
    ],
  },
  cta: {
    title: "Get in touch",
    description:
      "Request a quote for fencing supply, branding, installation, transportation, or shifting. Share drawings or approximate lengths and we will respond promptly.",
    button: { label: "Contact us", href: "/contact" },
  },
} as const;
