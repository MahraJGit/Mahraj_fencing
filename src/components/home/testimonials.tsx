import { testimonials } from "@/content/testimonials";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";

export function TestimonialsSection() {
  return (
    <Section tone="alt">
      <Reveal>
        <SectionHeading
          eyebrow="Testimonials"
          title="What project teams say"
          description="Contractors and facility owners across UAE & KSA rely on Mahraj for responsive supply and disciplined field work."
        />
      </Reveal>
      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {testimonials.map((item, i) => (
          <li key={item.id}>
            <Reveal delay={i * 0.05}>
              <figure className="relative h-full border-l-2 border-brand bg-background/70 py-2 pl-6 pr-2">
                <blockquote className="text-base leading-relaxed text-charcoal sm:text-[1.05rem]">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-ink">{item.name}</span>
                  <span className="text-body">
                    {" "}
                    · {item.role}, {item.company} ({item.location})
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
