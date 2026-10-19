import { Wrap } from "@/components/layout/wrap";
import { ArrowButtonLink } from "@/components/ui/arrow-button";

export function CtaBanner() {
  return (
    <section className="bg-brand text-white">
      <Wrap className="flex flex-col gap-8 py-16 md:py-20 lg:flex-row lg:items-start lg:justify-between lg:gap-20 lg:py-[80px]">
        <h2 className="max-w-[680px] font-heading text-[clamp(2.75rem,5vw,3.875rem)] font-bold uppercase leading-none text-white">
          Let&apos;s secure
          <br />
          your next project.
        </h2>
        <div className="flex max-w-[520px] flex-col items-start gap-6">
          <p className="text-lg leading-relaxed text-white">
            Share your drawings, site location or approximate fence length.
          </p>
          <ArrowButtonLink href="/contact#quote-form" variant="inverse">
            Request a quote
          </ArrowButtonLink>
        </div>
      </Wrap>
    </section>
  );
}
