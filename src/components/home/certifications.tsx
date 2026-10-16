import Image from "next/image";
import { Wrap } from "@/components/layout/wrap";

const items = [
  {
    name: "ISO 9001:2015",
    detail: "Quality management for supply and install",
  },
  {
    name: "ICV aligned",
    detail: "Local value contribution for regional programmes",
  },
  {
    name: "HSE ready",
    detail: "Method statements and live-site controls",
  },
];

export function CertificationsSection() {
  return (
    <section className="bg-white py-16 md:py-[100px]">
      <Wrap className="max-w-none xl:px-[6vw]">
        <div className="max-w-[900px]">
          <h2 className="font-heading text-[68px] font-semibold leading-none text-ink">
            Certification
          </h2>
          <p className="mt-5 max-w-[900px] text-[22px] leading-9 text-body">
            Accredited quality processes and supplier credentials that support
            consultant specifications and client audits.
          </p>
        </div>

        <ul className="mt-10 grid auto-rows-fr gap-10 md:grid-cols-3 md:gap-12">
          {items.map((item) => (
            <li key={item.name} className="relative flex h-full flex-col pt-8">
              <span className="absolute left-8 top-0 flex size-14 items-center justify-center">
                <Image
                  src="/images/figma/home/icon-support.svg"
                  alt=""
                  width={56}
                  height={56}
                  className="size-14"
                />
              </span>
              <div className="flex h-full flex-col rounded-lg border border-line bg-[#f4f5f6] px-8 pb-8 pt-12">
                <h3 className="font-heading text-[22px] font-semibold leading-[1.2] text-ink">
                  {item.name}
                </h3>
                <p className="mt-2 text-lg leading-relaxed text-body">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
