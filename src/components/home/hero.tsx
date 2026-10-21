import Image from "next/image";
import { ArrowButtonLink } from "@/components/ui/arrow-button";

const STAT_ICON_GRADIENT =
  "linear-gradient(262.57deg, rgba(255, 255, 255, 0.01) 24.42%, rgba(255, 255, 255, 0.05) 133.08%)";

const stats = [
  {
    value: "4.95/5",
    label: "Client Rating",
    icon: (
      <Image
        src="/images/figma/home/icon-star.svg"
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 brightness-0 invert"
      />
    ),
  },
  {
    value: "100+",
    label: "Projects Completed",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
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
        width={20}
        height={20}
        className="h-5 w-5 brightness-0 invert"
      />
    ),
  },
];

export function HomeHero() {
  return (
    <section className="relative isolate h-svh w-full overflow-hidden bg-black text-white">
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
              href="/contact#quote-form"
              className="h-[54px] rounded-md px-3 text-base font-semibold"
            >
              Get a project quote
            </ArrowButtonLink>
          </div>

          <ul
            className="relative grid w-full max-w-[725px] grid-cols-1 items-center overflow-hidden rounded-[12px] border-b border-white/10 backdrop-blur-[25px] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-[2px] before:rounded-t-[12px] before:bg-gradient-to-r before:from-white/10 before:via-white/90 before:to-white/10 after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:z-10 after:h-4 after:w-4 after:rounded-bl-[12px] after:border-b after:border-l after:border-white/10 min-[821px]:h-[85px] min-[821px]:grid-cols-[251fr_237fr_237fr]"
            style={{
              background:
                "linear-gradient(93.78deg, rgba(0, 0, 0, 0.4) 68.78%, #FFFFFF 132.34%)",
            }}
          >
            {stats.map((stat, i) => (
              <li
                key={stat.label}
                className={`relative flex min-h-[72px] items-center rounded-2xl px-4 py-2.5 min-[821px]:min-h-0 ${
                  i === 0
                    ? "min-[821px]:h-[85px]"
                    : "min-[821px]:h-[80px]"
                }`}
              >
                {i < stats.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-6 bottom-0 h-px bg-white/20 min-[821px]:inset-x-auto min-[821px]:bottom-auto min-[821px]:right-0 min-[821px]:top-1/2 min-[821px]:h-[70px] min-[821px]:w-px min-[821px]:-translate-y-1/2 min-[821px]:bg-white/35"
                  />
                ) : null}
                <div className="flex items-center gap-3.5">
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                      i === 0
                        ? "drop-shadow-[0_-1px_30px_rgba(103,100,100,0.5)]"
                        : "shadow-[0_-1px_30px_rgba(103,100,100,0.5)]"
                    }`}
                    style={
                      i === 0
                        ? undefined
                        : { backgroundImage: STAT_ICON_GRADIENT }
                    }
                  >
                    {stat.icon}
                  </span>
                  <div className="text-left leading-[150%]">
                    <p className="text-2xl font-bold leading-[150%] tracking-[1.8px] text-white">
                      {stat.value}
                    </p>
                    <p className="text-base font-medium leading-[150%] text-white">
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
