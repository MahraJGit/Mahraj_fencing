import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { galleryItems } from "@/content/gallery";
import { buildMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";

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
      />
      <Section tone="alt">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <li
              key={item.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 to-transparent p-4">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-white/75">{item.location}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
