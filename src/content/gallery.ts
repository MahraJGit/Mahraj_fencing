export type GalleryItem = {
  id: string;
  title: string;
  location: string;
  image: string;
  category: "fencing" | "gates" | "cabins" | "branding";
};

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Welded mesh perimeter",
    location: "Riyadh",
    image: "/images/gallery/01.jpg",
    category: "fencing",
  },
  {
    id: "g2",
    title: "Temporary hoarding line",
    location: "Dubai",
    image: "/images/gallery/02.jpg",
    category: "branding",
  },
  {
    id: "g3",
    title: "Palisade with razor wire",
    location: "Abu Dhabi",
    image: "/images/gallery/03.jpg",
    category: "fencing",
  },
  {
    id: "g4",
    title: "Automated sliding gate",
    location: "Sharjah",
    image: "/images/gallery/04.jpg",
    category: "gates",
  },
  {
    id: "g5",
    title: "Site cabin deployment",
    location: "Riyadh",
    image: "/images/gallery/05.jpg",
    category: "cabins",
  },
  {
    id: "g6",
    title: "Branded mesh campaign",
    location: "Dubai",
    image: "/images/gallery/06.jpg",
    category: "branding",
  },
];
