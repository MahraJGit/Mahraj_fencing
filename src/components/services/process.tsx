import { Eyebrow, Wrap } from "@/components/layout/wrap";

const steps = [
  {
    n: "01",
    title: "Share your requirements",
    text: "Send drawings or approximate lengths, your site location and the services you need.",
  },
  {
    n: "02",
    title: "Plan supply & delivery",
    text: "Schedule panels, branding and accessories. Coordinate routes, crane lifts and off-loading.",
  },
  {
    n: "03",
    title: "Install & inspect",
    text: "Install to engineer drawings, integrate access systems and complete QA walkdowns and snag lists.",
  },
  {
    n: "04",
    title: "Adapt as your site changes",
    text: "Dismantle, shift and re-install temporary fencing and cabins, with inventory tracking and re-mobilisation.",
  },
];

export function ServicesProcess() {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-[80px]">
      <Wrap className="flex flex-col gap-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
          <div className="max-w-[650px]">
            <Eyebrow>Our work process</Eyebrow>
            <h2 className="mt-4 font-heading text-[clamp(2.5rem,5vw,3.25rem)] font-bold uppercase leading-none text-ink">
              A clear plan.
              <br />
              From first call to final check.
            </h2>
          </div>
          <p className="max-w-[550px] text-lg leading-relaxed text-ink">
            Coordinated supply, site delivery, installation and phased support
            across Dubai.
          </p>
        </div>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.n}
              className="flex min-h-[230px] flex-col gap-4 rounded-lg border border-line bg-paper p-6"
            >
              <span className="font-heading text-[28px] font-bold leading-[1.1] text-brand">
                {step.n}
              </span>
              <h3 className="font-heading text-[28px] font-bold uppercase leading-[1.1] text-ink">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-body">{step.text}</p>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}
