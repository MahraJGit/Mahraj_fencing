import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Mahraj Fencing",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#191819",
    theme_color: "#8c1024",
    icons: [
      {
        src: "/images/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
