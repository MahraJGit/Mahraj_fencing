export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Mahraj kept our temporary lines moving across three phases without slowing civil works. Branding swaps were handled overnight.",
    name: "Omar H.",
    role: "Project Manager",
    company: "Tier-1 contractor",
    location: "Dubai",
  },
  {
    id: "t2",
    quote:
      "Palisade and gate packages arrived on schedule with clean documentation. Installation crew understood utility security requirements.",
    name: "Sarah K.",
    role: "Facilities Lead",
    company: "Energy operator",
    location: "Abu Dhabi",
  },
  {
    id: "t3",
    quote:
      "From welded mesh supply to sliding gate prep, one team coordinated deliveries across Riyadh traffic windows.",
    name: "Faisal A.",
    role: "Construction Director",
    company: "Logistics developer",
    location: "Riyadh",
  },
  {
    id: "t4",
    quote:
      "Responsive on WhatsApp, accurate quantities, and fair pricing on accessories and block feet for our hoarding.",
    name: "Leena M.",
    role: "Procurement",
    company: "Infrastructure JV",
    location: "Sharjah",
  },
];
