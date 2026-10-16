import { Eyebrow, Wrap } from "@/components/layout/wrap";

const items = [
  {
    name: "Omar H.",
    quote:
      "Mahraj kept our temporary lines moving across three phases without slowing civil works. Branding swaps were handled overnight.",
    role: "Project Manager · Tier-1 contractor · Dubai",
  },
  {
    name: "Sarah K.",
    quote:
      "Palisade and gate packages arrived on schedule with clean documentation. Installation crew understood utility security requirements.",
    role: "Facilities Lead · Energy operator · Abu Dhabi",
  },
  {
    name: "Faisal A.",
    quote:
      "From welded mesh supply to sliding gate prep, one team coordinated deliveries across Riyadh traffic windows.",
    role: "Construction Director · Logistics developer · Riyadh",
  },
  {
    name: "Leena M.",
    quote:
      "Responsive on WhatsApp, accurate quantities, and fair pricing on accessories and block feet for our hoarding.",
    role: "Procurement · Infrastructure JV · Sharjah",
  },
];

type TestimonialsSectionProps = {
  className?: string;
};

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  return (
    <section className={className ?? "bg-paper py-16 md:py-20 lg:py-[80px]"}>
      <Wrap>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
          <div className="max-w-[650px]">
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,5vw,3.25rem)] font-bold uppercase leading-none text-ink">
              What project
              <br />
              teams say.
            </h2>
          </div>
          <p className="max-w-[550px] text-lg leading-relaxed text-ink">
            Contractors and facility owners across UAE &amp; KSA rely on Mahraj
            for responsive supply and disciplined field work.
          </p>
        </div>

        <ul className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2">
          {items.map((item) => (
            <li key={item.name}>
              <figure className="flex h-full min-h-[268px] flex-col gap-[18px] rounded-lg border border-white bg-white px-8 py-[26px] shadow-[0px_6px_18px_0px_rgba(26,20,20,0.04)] backdrop-blur-[10px]">
                <blockquote className="text-lg leading-[1.5] text-ink">
                  “{item.quote}”
                </blockquote>
                <figcaption>
                  <p className="font-heading text-[22px] font-bold leading-[1.1] text-brand">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm leading-[1.5] text-body">
                    {item.role}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
