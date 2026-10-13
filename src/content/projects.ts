export type Project = {
  slug: string;
  title: string;
  location: string;
  sector: string;
  summary: string;
  description: string;
  image: string;
  scope: string[];
  products: string[];
  seo: { title: string; description: string };
};

export const projects: Project[] = [
  {
    slug: "riyadh-logistics-perimeter",
    title: "Riyadh logistics hub perimeter",
    location: "Riyadh, KSA",
    sector: "Logistics",
    summary: "2.4 km welded mesh with automated sliding gates.",
    description:
      "Full perimeter upgrade with welded mesh panels, anti-climb toppings, and dual automated sliding gates integrated with access control conduits.",
    image: "/images/projects/steel-structures-fabrication-works.jpg",
    scope: ["Survey & layout", "Panel install", "Gate automation prep"],
    products: ["welded-mesh-fencing", "security-gates", "anti-climb-fencing"],
    seo: {
      title: "Riyadh logistics perimeter project",
      description: "Welded mesh perimeter and gates delivered in Riyadh.",
    },
  },
  {
    slug: "dubai-mega-project-hoarding",
    title: "Dubai mega-project hoarding",
    location: "Dubai, UAE",
    sector: "Construction",
    summary: "Temporary fencing with branded mesh and block feet.",
    description:
      "Phased temporary fence lines with interlocking block feet, storm braces, and full-height branded mesh banners swapped per campaign.",
    image: "/images/projects/custom-steel-fabrication.jpg",
    scope: ["Supply", "Branding", "Shifting across phases"],
    products: ["temporary-fencing", "interlocking-concrete-blocks", "project-signage"],
    seo: {
      title: "Dubai construction hoarding",
      description: "Temporary fencing and branding for a Dubai mega project.",
    },
  },
  {
    slug: "abudhabi-substation-palisade",
    title: "Abu Dhabi substation palisade",
    location: "Abu Dhabi, UAE",
    sector: "Utilities",
    summary: "Palisade with razor wire and monitored gates.",
    description:
      "High-security palisade fencing with razor wire, tamper-resistant fixings, and swing gates aligned to utility security standards.",
    image: "/images/profile/site-compound-fencing.jpg",
    scope: ["Palisade install", "Razor wire", "Gate alignment"],
    products: ["palisade-fencing", "security-gates", "fence-accessories"],
    seo: {
      title: "Abu Dhabi substation fencing",
      description: "Palisade perimeter for a utility substation in Abu Dhabi.",
    },
  },
  {
    slug: "sharjah-industrial-yard",
    title: "Sharjah industrial yard upgrade",
    location: "Sharjah, UAE",
    sector: "Industrial",
    summary: "Chain link with privacy slats and crash barriers.",
    description:
      "Replaced aging fence lines with galvanized chain link, privacy slats, and internal crash barriers separating yard traffic from pedestrian routes.",
    image: "/images/projects/porta-cabins-site-offices.jpg",
    scope: ["Demolition", "New fence line", "Barrier install"],
    products: ["chain-link-fencing", "crash-barriers", "fence-accessories"],
    seo: {
      title: "Sharjah industrial fencing",
      description: "Chain link and crash barriers for an industrial yard in Sharjah.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
