export type ProductCategory =
  | "perimeter-fencing"
  | "gates-access"
  | "barriers-security"
  | "portable-structures"
  | "signage-branding"
  | "concrete-blocks"
  | "accessories";

export type Product = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  image: string;
  imageAlt?: string;
  gallery?: string[];
  features: string[];
  applications: string[];
  seo: { title: string; description: string };
};

export const productCategories: Record<
  ProductCategory,
  { label: string; description: string }
> = {
  "perimeter-fencing": {
    label: "Fences",
    description: "Chain link, welded mesh, palisade, temporary, and continuous fencing systems.",
  },
  "gates-access": {
    label: "Gates",
    description: "Sliding, swing, and security gates matched to your fence line.",
  },
  "barriers-security": {
    label: "Barrier",
    description: "Crash barriers, anti-climb, and crowd-control perimeter systems.",
  },
  "portable-structures": {
    label: "Portable cabin",
    description: "Site offices, storage, and portable cabin solutions.",
  },
  "signage-branding": {
    label: "Signage & boards",
    description: "Project boards, safety signage, and branded fence banners.",
  },
  "concrete-blocks": {
    label: "Concrete block / foundation",
    description: "Interlocking blocks and bases for fence lines and temporary barriers.",
  },
  accessories: {
    label: "Accessories",
    description: "Posts, clamps, barbed wire, privacy slats, and installation hardware.",
  },
};

export const products: Product[] = [
  {
    slug: "chain-link-fencing",
    title: "Chain link fencing",
    shortDescription: "Galvanized chain link for sites, sports, and industrial yards.",
    description:
      "Heavy-gauge galvanized chain link fencing with steel posts and tension wire. Ideal for warehouses, utilities, schools, and construction hoarding when paired with privacy slats.",
    category: "perimeter-fencing",
    image: "/images/products/chain-link.jpg",
    features: [
      "Hot-dip galvanized mesh",
      "Multiple heights and gauges",
      "Compatible with barbed wire toppers",
      "Fast supply across UAE & KSA",
    ],
    applications: ["Industrial yards", "Sports courts", "Utility substations"],
    seo: {
      title: "Chain link fencing supply & installation",
      description:
        "Chain link fencing supplied and installed in Dubai, Abu Dhabi, Sharjah, and Riyadh. Galvanized mesh, posts, and accessories from Mahraj Fencing.",
    },
  },
  {
    slug: "welded-mesh-fencing",
    title: "Welded mesh fencing",
    shortDescription: "Rigid panels for clean lines and high-security perimeters.",
    description:
      "Welded mesh panel fencing delivers a uniform aesthetic with strong anti-cut performance. Powder-coated finishes available for coastal and industrial environments.",
    category: "perimeter-fencing",
    image: "/images/products/welded-mesh.jpg",
    features: [
      "Anti-cut welded panels",
      "Powder-coated options",
      "Concealed fixings available",
      "Modular panel heights",
    ],
    applications: ["Data centers", "Logistics hubs", "Commercial compounds"],
    seo: {
      title: "Welded mesh fencing panels",
      description:
        "Welded mesh fencing for secure perimeters in the GCC. Supply, transport, and installation by Mahraj Fencing.",
    },
  },
  {
    slug: "palisade-fencing",
    title: "Palisade fencing",
    shortDescription: "High-security steel palisade with deterrent profile.",
    description:
      "Steel palisade fencing with W or D profile pales, tamper-resistant fixings, and optional razor wire. Designed for utilities, oil & gas, and critical infrastructure.",
    category: "perimeter-fencing",
    image: "/images/products/palisade.jpg",
    features: [
      "W/D profile pales",
      "Hot-dip galvanized steel",
      "Razor wire ready",
      "Engineered wind loading",
    ],
    applications: ["Oil & gas facilities", "Substations", "Government sites"],
    seo: {
      title: "Palisade security fencing",
      description:
        "Palisade fencing supply and installation across UAE and Saudi Arabia. High-security perimeter systems from Mahraj Fencing.",
    },
  },
  {
    slug: "anti-climb-fencing",
    title: "Anti-climb fencing",
    shortDescription: "358 mesh and close-profile systems to deter scaling.",
    description:
      "Anti-climb mesh fencing uses small apertures and rigid panels to prevent footholds. Often specified for data centers, airports, and high-value storage.",
    category: "barriers-security",
    image: "/images/products/anti-climb.jpg",
    features: [
      "358 security mesh",
      "Minimal foothold aperture",
      "Integrates with detection systems",
      "Coastal-grade coatings",
    ],
    applications: ["Data centers", "Aviation perimeters", "Cash handling"],
    seo: {
      title: "Anti-climb security fencing",
      description:
        "Anti-climb mesh and high-security fencing in Dubai and Riyadh. Spec-ready systems from Mahraj Fencing.",
    },
  },
  {
    slug: "temporary-fencing",
    title: "Temporary fencing",
    shortDescription: "Site hoarding panels with concrete block feet.",
    description:
      "Temporary fence panels for construction, events, and phased works. Includes couplers, braces, and interlocking block feet for quick deployment and relocation.",
    category: "perimeter-fencing",
    image: "/images/products/temp-fence.jpg",
    features: [
      "Quick-deploy panels",
      "Block feet and braces",
      "Branded mesh banners",
      "Shift-friendly layouts",
    ],
    applications: ["Construction sites", "Events", "Roadworks"],
    seo: {
      title: "Temporary construction fencing",
      description:
        "Temporary fencing hire and supply with installation and shifting across UAE & KSA.",
    },
  },
  {
    slug: "security-gates",
    title: "Security gates",
    shortDescription: "Sliding and swing gates matched to your fence line.",
    description:
      "Manual and automated security gates engineered to match palisade, mesh, or chain link systems. Includes guide tracks, motors, safety edges, and access control prep.",
    category: "gates-access",
    image: "/images/products/gates.jpg",
    features: [
      "Sliding & swing configurations",
      "Automation-ready",
      "Matching infill panels",
      "Safety compliance options",
    ],
    applications: ["Industrial entrances", "Utility yards", "Campus access"],
    seo: {
      title: "Security gates & automation",
      description:
        "Security gate supply and installation (sliding and swing) across the GCC.",
    },
  },
  {
    slug: "crash-barriers",
    title: "Crash barriers & road fencing",
    shortDescription: "W-beam and pedestrian barriers for roads and car parks.",
    description:
      "Galvanized crash barriers, guardrails, and pedestrian fencing for car parks, logistics yards, and roadworks. Installed to site drawings with proper anchorage.",
    category: "barriers-security",
    image: "/images/products/welded-mesh.jpg",
    features: [
      "W-beam guardrail",
      "Pedestrian barrier panels",
      "Powder-coated finishes",
      "Site-specific layouts",
    ],
    applications: ["Car parks", "Distribution centers", "Road projects"],
    seo: {
      title: "Crash barriers & guardrails",
      description:
        "Road and crash barrier supply with installation in UAE and KSA.",
    },
  },
  {
    slug: "portable-site-cabins",
    title: "Portable site cabins",
    shortDescription: "Site offices, storage, and welfare units.",
    description:
      "Portable cabins for site offices, security booths, and storage. Delivered, positioned, and re-located as your project phases change.",
    category: "portable-structures",
    image: "/images/products/portable-cabin.jpg",
    features: [
      "Office & storage layouts",
      "Electrical prep options",
      "Relocatable skids",
      "Fleet delivery",
    ],
    applications: ["Construction HQ", "Security booths", "Temporary storage"],
    seo: {
      title: "Portable site cabins",
      description:
        "Portable cabins for construction and industrial sites, with supply and transport across the GCC.",
    },
  },
  {
    slug: "project-signage",
    title: "Project signage & fence branding",
    shortDescription: "Branded banners and safety boards for live sites.",
    description:
      "Project signage including fence mesh banners, safety boards, and wayfinding panels. We align branding with your marketing team and install on active fence lines.",
    category: "signage-branding",
    image: "/images/gallery/03.jpg",
    features: [
      "Mesh banner printing",
      "Safety & statutory boards",
      "Wind-load aware fixing",
      "Campaign swap-outs",
    ],
    applications: ["Mega projects", "Retail fit-out", "Infrastructure"],
    seo: {
      title: "Construction signage & fence branding",
      description:
        "Project signage and fence branding for sites in Dubai, Abu Dhabi, Sharjah, and Riyadh.",
    },
  },
  {
    slug: "interlocking-concrete-blocks",
    title: "Interlocking concrete blocks",
    shortDescription: "Heavy blocks for fence feet and temporary walls.",
    description:
      "Interlocking concrete blocks for temporary fence feet, kentledge, and low retaining runs. Delivered in volume with placement support on large sites.",
    category: "concrete-blocks",
    image: "/images/profile/steel-fabrication-workshop.jpg",
    features: [
      "Fence foot ballast",
      "Interlocking geometry",
      "High-volume delivery",
      "Crane-friendly lifts",
    ],
    applications: ["Temporary fence lines", "Hoarding", "Yard segregation"],
    seo: {
      title: "Interlocking concrete blocks",
      description:
        "Concrete blocks for fence ballast and site segregation, supplied across UAE & KSA.",
    },
  },
  {
    slug: "fence-accessories",
    title: "Fence accessories & toppings",
    shortDescription: "Posts, clamps, barbed wire, and privacy slats.",
    description:
      "Complete accessory packs: posts, rails, clamps, barbed wire, razor coil, and privacy slats. Spec matched to your fence type with bulk pricing for contractors.",
    category: "accessories",
    image: "/images/products/chain-link.jpg",
    features: [
      "Post & rail systems",
      "Barbed & razor wire",
      "Privacy slats",
      "Contractor bulk packs",
    ],
    applications: ["Contractor packages", "Maintenance", "Upgrades"],
    seo: {
      title: "Fence accessories & hardware",
      description:
        "Fence accessories, toppings, and hardware. Fast supply from Mahraj Fencing.",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}
