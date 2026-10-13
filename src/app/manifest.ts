import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Mahraj Fencing",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#c8102e",
    icons: [
      {
        src: "/brand/mahraj-mark.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
