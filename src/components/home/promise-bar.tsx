import { Wrap } from "@/components/layout/wrap";

const promises = [
  "01   Supply & branding",
  "02   Professional installation",
  "03   Delivery & fence shifting",
];

export function PromiseBar() {
  return (
    <section className="bg-white py-[30px]">
      <Wrap>
        <ul className="grid gap-4 font-medium text-ink md:grid-cols-3 md:gap-0">
          {promises.map((label) => (
            <li
              key={label}
              className="text-center text-base leading-[1.5] md:text-left"
            >
              {label}
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
