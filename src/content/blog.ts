export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  publishedAt: string;
  author: string;
  image: string;
  tags: string[];
  seo: { title: string; description: string };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "choosing-perimeter-fencing-gcc",
    title: "Choosing perimeter fencing for GCC sites",
    excerpt:
      "How to match mesh, palisade, and temporary systems to security level, wind load, and programme.",
    body: [
      "Perimeter fencing in the GCC must handle heat, sand, and coastal corrosion while meeting security tiers. Start with your risk assessment: asset value, public interface, and required detection integration.",
      "Welded mesh and palisade suit fixed facilities with long design life. Temporary panels with block feet excel on construction where layouts change monthly.",
      "Mahraj Fencing aligns material specs with your engineer, then schedules supply and install windows around civil and MEP milestones.",
    ],
    publishedAt: "2025-11-08",
    author: "Mahraj Fencing Team",
    image: "/images/heroes/blogs-hero.png",
    tags: ["Specifying", "Security"],
    seo: {
      title: "Choosing perimeter fencing in the GCC",
      description:
        "Guide to selecting fence systems for UAE and KSA sites: mesh, palisade, and temporary options.",
    },
  },
  {
    slug: "temporary-fence-shifting-tips",
    title: "Temporary fence shifting without downtime",
    excerpt:
      "Planning couplers, braces, and block feet so hoarding moves cleanly between phases.",
    body: [
      "Shifting temporary fencing fails when inventories are unknown and block feet are scattered. Tag panels and feet at first install so reconfiguration is a checklist, not a search mission.",
      "Schedule shifts during low-traffic windows and pre-stage branded mesh rolls to avoid crane idle time.",
      "Our shifting crews document outgoing and incoming layouts so safety officers sign off quickly.",
    ],
    publishedAt: "2025-10-02",
    author: "Mahraj Fencing Team",
    image: "/images/gallery/04.jpg",
    tags: ["Temporary fencing", "Operations"],
    seo: {
      title: "Temporary fence shifting tips",
      description:
        "Operational tips for moving temporary fence lines on active construction sites.",
    },
  },
  {
    slug: "gate-automation-readiness",
    title: "Gate automation readiness for industrial sites",
    excerpt:
      "What to prepare before motors, safety edges, and access control arrive on site.",
    body: [
      "Automated gates need civil-ready tracks, correct power feeds, and safety zoning before motors mount. Align gate infill with fence type so wind load calculations stay valid.",
      "Plan maintenance access and manual release locations with your security consultant early.",
      "Mahraj integrates gate frames with fence lines and leaves conduits ready for your access control vendor.",
    ],
    publishedAt: "2025-09-15",
    author: "Mahraj Fencing Team",
    image: "/images/products/gates.jpg",
    tags: ["Gates", "Automation"],
    seo: {
      title: "Industrial gate automation readiness",
      description:
        "Checklist for preparing sliding and swing gates for automation on GCC industrial sites.",
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
