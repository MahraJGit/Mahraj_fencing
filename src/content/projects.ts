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
    slug: "dubai-logistics-perimeter",
    title: "Dubai logistics hub perimeter",
    location: "Dubai, UAE",
    sector: "Logistics",
    summary: "2.4 km welded mesh with automated sliding gates.",
    description:
      "Full perimeter upgrade with welded mesh panels, anti-climb toppings, and dual automated sliding gates integrated with access control conduits.",
    image: "/images/figma/home/hero-photo.png",
    scope: ["Survey & layout", "Panel install", "Gate automation prep"],
    products: ["welded-mesh-fencing", "security-gates", "anti-climb-fencing"],
    seo: {
      title: "Dubai logistics perimeter project",
      description: "Welded mesh perimeter and gates delivered in Dubai.",
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
    image: "/images/figma/home/product-3.png",
    scope: ["Supply", "Branding", "Shifting across phases"],
    products: ["temporary-fencing", "interlocking-concrete-blocks", "project-signage"],
    seo: {
      title: "Dubai construction hoarding",
      description: "Temporary fencing and branding for a Dubai mega project.",
    },
  },
  {
    slug: "dubai-substation-palisade",
    title: "Dubai substation palisade",
    location: "Dubai, UAE",
    sector: "Utilities",
    summary: "Palisade with razor wire and monitored gates.",
    description:
      "High-security palisade fencing with razor wire, tamper-resistant fixings, and swing gates aligned to utility security standards.",
    image: "/images/profile/site-compound-fencing.jpg",
    scope: ["Palisade install", "Razor wire", "Gate alignment"],
    products: ["palisade-fencing", "security-gates", "fence-accessories"],
    seo: {
      title: "Dubai substation fencing",
      description: "Palisade perimeter for a utility substation in Dubai.",
    },
  },
  {
    slug: "dubai-industrial-yard",
    title: "Dubai industrial yard upgrade",
    location: "Dubai, UAE",
    sector: "Industrial",
    summary: "Chain link with privacy slats and crash barriers.",
    description:
      "Replaced aging fence lines with galvanized chain link, privacy slats, and internal crash barriers separating yard traffic from pedestrian routes.",
    image: "/images/projects/porta-cabins-site-offices.jpg",
    scope: ["Demolition", "New fence line", "Barrier install"],
    products: ["chain-link-fencing", "crash-barriers", "fence-accessories"],
    seo: {
      title: "Dubai industrial fencing",
      description: "Chain link and crash barriers for an industrial yard in Dubai.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
