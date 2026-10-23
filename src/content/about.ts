import { cataloguePdf } from "./site";

export const aboutContent = {
  hero: {
    title: "About Mahraj Fencing",
    subtitle:
      "Trusted Dubai fencing contractors for supply, fabrication, branding, and installation.",
    image: "/images/heroes/about-hero.png",
  },
  chairman: {
    eyebrow: "Chairman message",
    greeting: "Welcome to Mahraj Fencing",
    paragraphs: [
      "We strive hard to meet the expectations of our valued customers. As trusted fencing contractors, we guarantee quality products at competitive prices and we truly value your highest satisfaction.",
      "Our mission is to deliver creative, durable fencing solutions for our clients. Experience, traditional workmanship, and modern fabrication ensure our reputation as a dedicated partner in the field.",
      "I invite you to explore our products and projects. We continuously improve our systems and welcome your comments, queries, and recommendations.",
    ],
    signOff: "Sincerely,",
    role: "CEO",
    company: "Mahraj Fencing",
  },
  introduction: {
    title: "Introduction",
    paragraphs: [
      "Mahraj Fencing is a trusted name in Dubai's construction industry for fencing, steel fabrication, concrete blocks, fence branding, construction signage, and portable site solutions.",
      "As a Dubai fencing contractor, we supply and install perimeter systems for construction, industrial, and commercial sites. Our processes follow ISO-aligned quality standards so every programme receives consistent material and site workmanship.",
      "We go the extra mile on the fencing problems others ignore: temporary hoarding that must shift with the programme, high-security palisade for utilities, branded mesh for mega-projects, and turn-key packages from manufacturing through installation.",
    ],
    image: "/images/profile/steel-plant-yard.jpg",
    brochureLabel: "Download brochure",
    brochureHref: cataloguePdf.href,
  },
  history: {
    title: "History",
    lead: "The journey of Mahraj Fencing is rooted in steel, site logistics, and perimeter solutions for demanding Dubai projects, growing from contracting support into a full turn-key fencing partner.",
    milestones: [
      {
        year: "Foundation",
        title: "Steel & site solutions in Dubai",
        body: "Mahraj operations began supporting Dubai construction and industrial clients with fabricated steel, portable facilities, and site compound systems.",
      },
      {
        year: "Expansion",
        title: "Dedicated fencing division",
        body: "Demand for perimeter, hoarding, and security fencing led to a focused fencing contracting capability serving contractors, developers, and facility owners with supply and install packages.",
      },
      {
        year: "Manufacturing",
        title: "In-house production & turn-key delivery",
        body: "We strengthened fabrication, concrete block, and prefabricated metal capacity so projects receive complete solutions from manufacturing to installation, not just traded panels.",
      },
      {
        year: "Today",
        title: "Dubai fencing services",
        body: "Mahraj Fencing supports Dubai projects with fence supply, branding, installation, transport, and shifting.",
      },
    ],
  },
  exhibitions: {
    title: "Exhibitions",
    description:
      "We meet project teams and partners at construction and industrial events in Dubai.",
    items: [
      {
        title: "Dubai Exhibition",
        location: "Dubai, UAE",
        image: "/images/gallery/01.jpg",
        summary:
          "Showcasing temporary fencing, branded hoarding, gates, and site cabin packages for mega-project contractors.",
      },
    ],
  },
  certifications: {
    title: "Certification",
    description:
      "Quality, safety, and supplier credentials that support consultant specifications and client audits.",
    items: [
      {
        name: "ISO 9001:2015",
        detail: "Quality management for supply and installation processes",
      },
      {
        name: "ICV aligned",
        detail: "Local value contribution practices for Dubai projects",
      },
      {
        name: "HSE ready",
        detail: "Site induction, method statements, and live-site controls",
      },
      {
        name: "Spec support",
        detail: "Documentation packs for consultants and main contractors",
      },
    ],
  },
  clients: {
    title: "Our clients",
    description:
      "We support contractors, developers, utilities, and industrial operators on high-profile projects in Dubai.",
    names: [
      "Tier-1 contractors",
      "Real estate developers",
      "Infrastructure JVs",
      "Utilities & energy",
      "Logistics operators",
      "Industrial facilities",
      "Facility managers",
      "Event & temporary works",
    ],
  },
  seo: {
    title: "Best fencing company | About Mahraj Fencing",
    description:
      "About Mahraj Fencing, trusted Dubai fencing contractors for fence supply, steel fabrication, branding, and installation.",
  },
} as const;
