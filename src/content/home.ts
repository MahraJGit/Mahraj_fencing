export const homeContent = {
  hero: {
    brand: "Mahraj Fencing",
    title: "Best fencing suppliers in Dubai, Abu Dhabi, Sharjah & Riyadh",
    subtitle:
      "Fencing, steel fabrication, concrete blocks, fence branding, gates, barriers, and portable cabins, supplied and installed across the UAE and Saudi Arabia.",
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
      "Mahraj Fencing is a trusted fencing contractor for fence, steel fabrication, concrete blocks, fence branding, and construction signage across Dubai, Abu Dhabi, Sharjah, and Riyadh. We deliver turn-key perimeter solutions from supply through installation.",
    points: [
      "ISO-aligned quality processes",
      "Factories & logistics across UAE & KSA",
      "Turn-key manufacturing to installation",
      "Trusted by contractors & developers",
    ],
  },
  projects: {
    title: "Our projects",
    description:
      "Prestigious fencing, hoarding, and security perimeter projects delivered for contractors and asset owners across the GCC.",
  },
  certifications: {
    title: "Certification",
    description:
      "Accredited quality processes and supplier credentials that support consultant specifications and client audits.",
    items: [
      { name: "ISO 9001:2015", detail: "Quality management for supply and install" },
      { name: "ICV aligned", detail: "Local value contribution for regional programmes" },
      { name: "HSE ready", detail: "Method statements and live-site controls" },
    ],
  },
  clients: {
    title: "Our prestigious clients",
    description:
      "We work with contractors, developers, utilities, and industrial operators on high-profile programmes across the UAE and Saudi Arabia.",
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
