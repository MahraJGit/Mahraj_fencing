import { Wrap } from "@/components/layout/wrap";

const items = [
  { n: "01", label: "Supply & branding", href: "#supply-and-branding" },
  { n: "02", label: "Installation", href: "#installation" },
  { n: "03", label: "Transportation", href: "#transport-and-logistics" },
  { n: "04", label: "Fence shifting", href: "#shifting-and-relocation" },
];

export function ServicesQuickNav() {
  return (
    <nav aria-label="Services" className="bg-white py-7">
      <Wrap>
        <ul className="grid gap-4 font-semibold text-ink sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block text-base leading-[1.5] transition hover:text-brand"
              >
                {item.n}{"   "}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Wrap>
    </nav>
  );
}
