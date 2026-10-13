export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  highlights: string[];
  seo: { title: string; description: string };
};

export const services: Service[] = [
  {
    slug: "supply-and-branding",
    title: "Fence supply & branding",
    summary: "Bulk material supply with branded mesh banners and project boards.",
    description:
      "We source fence panels, posts, gates, and accessories at scale, then add your branding on mesh banners and statutory boards. One team coordinates deliveries to match your programme.",
    image: "/images/gallery/02.jpg",
    highlights: [
      "Bulk panel & post supply",
      "Branded mesh banners",
      "Material scheduling to site",
      "GCC-wide logistics partners",
    ],
    seo: {
      title: "Fencing supply & branding",
      description:
        "Fence material supply and site branding for projects in UAE and Saudi Arabia.",
    },
  },
  {
    slug: "installation",
    title: "Installation",
    summary: "Experienced crews for permanent and temporary fence lines.",
    description:
      "Our installation teams deploy palisade, mesh, chain link, and temporary systems to engineer drawings. We coordinate with civil works, gate automation, and handover documentation.",
    image: "/images/profile/modular-crane-install.jpg",
    highlights: [
      "Permanent & temporary systems",
      "Gate and access integration",
      "QA walkdowns and snag lists",
      "Night/weekend shifts available",
    ],
    seo: {
      title: "Fence installation services",
      description:
        "Professional fence installation across Dubai, Abu Dhabi, Sharjah, and Riyadh.",
    },
  },
  {
    slug: "transport-and-logistics",
    title: "Transportation",
    summary: "Fleet delivery for panels, blocks, cabins, and accessories.",
    description:
      "Dedicated transport for fence panels, concrete blocks, and portable cabins. We plan routes, crane lifts, and off-loading so your site stays productive.",
    image: "/images/profile/steel-plant-yard.jpg",
    highlights: [
      "Panel and block haulage",
      "Cabins and wide loads",
      "Off-loading coordination",
      "Cross-emirate routing",
    ],
    seo: {
      title: "Fence transport & logistics",
      description:
        "Transport and logistics for fencing materials and site cabins in the GCC.",
    },
  },
  {
    slug: "shifting-and-relocation",
    title: "Fence shifting",
    summary: "Move temporary lines and cabins as your site footprint changes.",
    description:
      "When phases move, we dismantle, shift, and re-install temporary fencing and cabins with minimal downtime. Ideal for infrastructure and phased construction.",
    image: "/images/profile/porta-cabin-site-office.jpg",
    highlights: [
      "Temporary line moves",
      "Cabins repositioning",
      "Inventory tracking",
      "Fast re-mobilisation",
    ],
    seo: {
      title: "Fence shifting & relocation",
      description:
        "Temporary fence and cabin shifting services for active construction sites.",
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
