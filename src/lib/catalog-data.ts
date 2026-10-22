import type { AdminProduct, AdminService } from "@/lib/admin/types";
import type { ProductRow, ServiceRow } from "@/lib/supabase/database";
import { createPublicSupabaseClient } from "@/lib/supabase/client";
import { parseListItems } from "@/lib/list-items";

type CatalogQueryError = {
  code: string;
  message: string;
};

function isCatalogQueryError(value: unknown): value is CatalogQueryError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    typeof value.code === "string" &&
    "message" in value &&
    typeof value.message === "string"
  );
}

function isMissingCatalogTable(
  error: unknown,
  table: "products" | "services" | "catalog_seed_state",
) {
  if (!isCatalogQueryError(error)) return false;
  return (
    (error.code === "PGRST205" || error.code === "42P01") &&
    error.message.includes(table)
  );
}

let schemaWarningShown = false;

function warnAboutCatalogSetup() {
  if (schemaWarningShown) return;
  schemaWarningShown = true;
  console.warn(
    "The Supabase product/service catalog is not set up yet. Run supabase/catalog.sql; showing the built-in catalog until then.",
  );
}

export function productFromRow(row: ProductRow): AdminProduct {
  return {
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    description: row.description,
    category: row.category,
    image: row.image,
    featuredImage: row.featured_image || row.image,
    imageAlt: row.image_alt,
    gallery: row.gallery,
    features: parseListItems(row.features),
    applications: parseListItems(row.applications),
    seo: row.seo,
    status: row.status,
    isFeatured: row.is_featured,
    sortOrder: row.sort_order,
  };
}

export function serviceFromRow(row: ServiceRow): AdminService {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    description: row.description,
    image: row.image,
    featuredImage: row.featured_image || row.image,
    imageAlt: row.image_alt,
    highlights: parseListItems(row.highlights),
    seo: row.seo,
    status: row.status,
    isFeatured: row.is_featured,
    sortOrder: row.sort_order,
  };
}

export function productToRow(product: AdminProduct) {
  return {
    slug: product.slug,
    title: product.title,
    short_description: product.shortDescription,
    description: product.description,
    category: product.category,
    image: product.image,
    featured_image: product.featuredImage || product.image,
    image_alt: product.imageAlt,
    gallery: product.gallery ?? [],
    features: product.features,
    applications: product.applications,
    seo: product.seo,
    status: product.status,
    is_featured: product.isFeatured,
    sort_order: product.sortOrder,
  };
}

export function serviceToRow(service: AdminService) {
  return {
    slug: service.slug,
    title: service.title,
    summary: service.summary,
    description: service.description,
    image: service.image,
    featured_image: service.featuredImage || service.image,
    image_alt: service.imageAlt,
    highlights: service.highlights,
    seo: service.seo,
    status: service.status,
    is_featured: service.isFeatured,
    sort_order: service.sortOrder,
  };
}

async function hasCatalogSeeded() {
  const { data, error } = await createPublicSupabaseClient()
    .from("catalog_seed_state")
    .select("version")
    .eq("version", "static-catalog-v1")
    .maybeSingle();

  if (error) throw error;
  return Boolean(data);
}

async function canUseStaticFallbackWhenUnseeded() {
  try {
    return !(await hasCatalogSeeded());
  } catch (error) {
    if (!isMissingCatalogTable(error, "catalog_seed_state")) throw error;
    warnAboutCatalogSetup();
    return true;
  }
}

async function getStaticProducts(): Promise<AdminProduct[]> {
  const { products } = await import("@/content/products");
  return products.map((product, sortOrder) => ({
    ...product,
    featuredImage: product.featuredImage ?? product.image,
    imageAlt: product.imageAlt ?? product.title,
    status: "published",
    isFeatured: [
      "welded-mesh-fencing",
      "chain-link-fencing",
      "temporary-fencing",
      "security-gates",
      "palisade-fencing",
      "anti-climb-fencing",
    ].includes(product.slug),
    sortOrder,
  }));
}

async function getStaticProduct(slug: string): Promise<AdminProduct | null> {
  const { getProductBySlug } = await import("@/content/products");
  const product = getProductBySlug(slug);
  return product
    ? {
        ...product,
        featuredImage: product.featuredImage ?? product.image,
        imageAlt: product.imageAlt ?? product.title,
        status: "published",
        isFeatured: [
          "welded-mesh-fencing",
          "chain-link-fencing",
          "temporary-fencing",
          "security-gates",
          "palisade-fencing",
          "anti-climb-fencing",
        ].includes(product.slug),
        sortOrder: 0,
      }
    : null;
}

async function getStaticServices(): Promise<AdminService[]> {
  const { services } = await import("@/content/services");
  return services.map((service, sortOrder) => ({
    ...service,
    featuredImage: service.featuredImage ?? service.image,
    imageAlt: service.imageAlt ?? service.title,
    status: "published",
    isFeatured: true,
    sortOrder,
  }));
}

async function getStaticService(slug: string): Promise<AdminService | null> {
  const { getServiceBySlug } = await import("@/content/services");
  const service = getServiceBySlug(slug);
  return service
    ? {
        ...service,
        featuredImage: service.featuredImage ?? service.image,
        imageAlt: service.imageAlt ?? service.title,
        status: "published",
        isFeatured: true,
        sortOrder: 0,
      }
    : null;
}

export async function getPublishedProducts(): Promise<AdminProduct[]> {
  const client = createPublicSupabaseClient();
  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    if (!isMissingCatalogTable(error, "products")) throw error;
    warnAboutCatalogSetup();
    return getStaticProducts();
  }

  if (data.length > 0) return data.map(productFromRow);
  return (await canUseStaticFallbackWhenUnseeded())
    ? getStaticProducts()
    : [];
}

export async function getPublishedProduct(
  slug: string,
): Promise<AdminProduct | null> {
  const { data, error } = await createPublicSupabaseClient()
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    if (!isMissingCatalogTable(error, "products")) throw error;
    warnAboutCatalogSetup();
    return getStaticProduct(slug);
  }
  if (data) return productFromRow(data);
  return (await canUseStaticFallbackWhenUnseeded())
    ? getStaticProduct(slug)
    : null;
}

export async function getPublishedServices(): Promise<AdminService[]> {
  const { data, error } = await createPublicSupabaseClient()
    .from("services")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    if (!isMissingCatalogTable(error, "services")) throw error;
    warnAboutCatalogSetup();
    return getStaticServices();
  }

  if (data.length > 0) return data.map(serviceFromRow);
  return (await canUseStaticFallbackWhenUnseeded())
    ? getStaticServices()
    : [];
}

export async function getPublishedService(
  slug: string,
): Promise<AdminService | null> {
  const { data, error } = await createPublicSupabaseClient()
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    if (!isMissingCatalogTable(error, "services")) throw error;
    warnAboutCatalogSetup();
    return getStaticService(slug);
  }
  if (data) return serviceFromRow(data);
  return (await canUseStaticFallbackWhenUnseeded())
    ? getStaticService(slug)
    : null;
}
