import { products } from "@/content/products";
import { services } from "@/content/services";
import type { AdminProduct, AdminService } from "./types";

export function seedProducts(): AdminProduct[] {
  return products.map((product) => ({
    ...product,
    status: "published" as const,
  }));
}

export function seedServices(): AdminService[] {
  return services.map((service) => ({
    ...service,
    status: "published" as const,
  }));
}
