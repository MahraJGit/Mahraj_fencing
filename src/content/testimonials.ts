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
];
