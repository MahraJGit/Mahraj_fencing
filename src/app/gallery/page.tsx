import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { galleryItems } from "@/content/gallery";
import type { GalleryItem } from "@/content/gallery";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { CtaBanner } from "@/components/home/cta-banner";

const galleryCategories: { id: GalleryItem["category"]; label: string }[] = [
  { id: "fencing", label: "Fencing" },
  { id: "gates", label: "Gates" },
  { id: "cabins", label: "Cabins" },
  { id: "branding", label: "Branding" },
];

export const metadata = buildMetadata({
  title: "Project gallery",
  description:
    "Photos from Mahraj Fencing installs: mesh, palisade, gates, cabins, and branded hoarding.",
  path: "/gallery",
  image: "/images/gallery/01.jpg",
});

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />
      <PageHero
        title="Gallery"
        subtitle="Field photos from active sites across UAE & KSA."
        image="/images/gallery/01.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <Section className="pb-8 sm:pb-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
              Browse the work
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold uppercase text-ink sm:text-4xl">
              By project type
            </h2>
          </div>
          <p className="max-w-xl text-body leading-relaxed">
            Explore fence installations, gates, cabins, and branded site
            boundaries from projects across UAE and KSA.
          </p>
        </div>
        <nav aria-label="Gallery categories" className="mt-7 flex flex-wrap gap-3">
          {galleryCategories.map((category) => (
            <a
              key={category.id}
              href={`#gallery-${category.id}`}
              className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink transition hover:border-brand hover:text-brand"
            >
              {category.label}
              <span className="ml-2 text-xs text-body">
                {galleryItems.filter((item) => item.category === category.id).length}
              </span>
            </a>
          ))}
        </nav>
      </Section>
      {galleryCategories.map((category, index) => {
        const items = galleryItems.filter((item) => item.category === category.id);
        if (!items.length) return null;

        return (
          <Section
            key={category.id}
            id={`gallery-${category.id}`}
            tone={index % 2 === 0 ? "alt" : "default"}
          >
            <div className="mb-7 flex items-end justify-between gap-4">
              <h2 className="font-heading text-3xl font-bold uppercase text-ink sm:text-4xl">
                {category.label}
              </h2>
              <span className="text-sm text-body">{items.length} projects</span>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 to-transparent p-4">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-white/75">{item.location}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        );
      })}
      <CtaBanner />
    </>
  );
}
