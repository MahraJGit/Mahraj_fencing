import Image from "next/image";
import { ArrowButtonLink } from "@/components/ui/arrow-button";

const STAT_ICON_GRADIENT =
  "linear-gradient(262.56541078619387deg, rgba(255, 255, 255, 0.1) 24.42%, rgba(255, 255, 255, 0.5) 133.08%)";

const stats = [
  {
    value: "4.95/5",
    label: "Client Rating",
    icon: (
      <Image
        src="/images/figma/home/icon-star.svg"
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 brightness-0 invert"
      />
    ),
  },
  {
    value: "100+",
    label: "Projects Completed",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
        <path
          fill="currentColor"
          d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h-2V5a.5.5 0 0 0-.5-.5h-3A.5.5 0 0 0 10 5v2H8Zm-4 0h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"
        />
        <path d="M2 11h20v2H2z" fill="rgba(0,0,0,.55)" />
        <rect x="10.5" y="10.5" width="3" height="3" rx="0.7" fill="currentColor" />
      </svg>
    ),
  },
  {
    value: "24/7",
    label: "Site Support",
    icon: (
      <Image
        src="/images/figma/home/icon-projects.svg"
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 brightness-0 invert"
      />
    ),
  },
];

export function HomeHero() {
  return (
    <section className="relative isolate h-[max(100svh,820px)] min-h-[560px] w-full overflow-hidden bg-black text-white sm:h-[760px] sm:max-h-[100svh]">
      <video
        src="/hero-image-video.mp4"
        poster="/images/figma/home/hero.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] hero-image-overlay" />

      {/* Hero / Message and actions */}
      <div className="absolute inset-x-0 top-[120px] z-10 flex justify-center px-5 md:top-[157px] md:px-10">
        <div className="flex w-full max-w-[1283px] flex-col items-center gap-8 pt-8 md:gap-[60px] md:pt-[49px]">
          <div className="flex w-full flex-col items-center gap-8">
            <div className="flex w-full flex-col items-center gap-[26px] text-center">
              <p className="w-full text-xs font-semibold uppercase leading-[150%] tracking-[1.8px] text-white">
                Your trusted fencing partner
              </p>
              <h1 className="max-w-[771px] font-heading text-[clamp(2.75rem,5.5vw,64px)] font-bold uppercase leading-none text-white">
                A stronger line of defence for every site
              </h1>
              <p className="max-w-[771px] text-base leading-[22px] text-white md:text-xl md:leading-[22px]">
                Protect your site with strong, durable fencing solutions. From
                fences and gates to site barriers, Mahraj Fencing supports
                construction and industrial projects across the UAE and KSA.
              </p>
            </div>
            <ArrowButtonLink
              href="/contact"
              className="h-[54px] rounded-md px-3 text-base font-semibold"
            >
              Get a project quote
            </ArrowButtonLink>
          </div>

          <ul className="flex w-full flex-col items-center justify-center sm:flex-row">
            {stats.map((stat, i) => (
              <li key={stat.label} className="flex items-center">
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="mx-1 hidden h-[65px] w-px bg-[#767676] sm:block"
                  />
                ) : null}
                <div className="flex items-center gap-3.5 rounded-2xl px-4 py-2.5">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white"
                    style={{ backgroundImage: STAT_ICON_GRADIENT }}
                  >
                    {stat.icon}
                  </span>
                  <div className="text-left leading-[150%]">
                    <p className="text-2xl font-bold tracking-[1.8px] text-white">
                      {stat.value}
                    </p>
                    <p className="text-base font-medium text-white">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
