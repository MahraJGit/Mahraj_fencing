"use client";

import { products as staticProducts } from "@/content/products";
import { services as staticServices } from "@/content/services";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { AdminProduct, AdminService } from "@/lib/admin/types";
import {
  productFromRow,
  productToRow,
  serviceFromRow,
  serviceToRow,
} from "@/lib/catalog-data";

const CATALOG_SEED_VERSION = "static-catalog-v1";

function throwCatalogError(error: { code: string; message: string }): never {
  if (
    error.code === "PGRST205" ||
    error.code === "PGRST204" ||
    error.code === "42P01" ||
    error.code === "42703"
  ) {
    throw new Error(
      "The catalog database is missing its tables or columns. Run supabase/catalog.sql in the Supabase SQL Editor, then reload this page.",
    );
  }
  throw error;
}

function readLegacyItems<T>(key: string, fallback: T[]): T[] {
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`Saved local ${key} data is invalid. Clear it before continuing.`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error(`Saved local ${key} data has an invalid format.`);
  }
  return parsed as T[];
}

async function ensureCatalogSeeded() {
  const client = getSupabaseClient();
  const { data: seedState, error: seedStateError } = await client
    .from("catalog_seed_state")
    .select("version")
    .eq("version", CATALOG_SEED_VERSION)
    .maybeSingle();

  if (seedStateError) throwCatalogError(seedStateError);
  if (seedState) return;

  const legacyProducts = readLegacyItems<AdminProduct>(
    "mahraj-admin-products",
    [],
  );
  const legacyServices = readLegacyItems<AdminService>(
    "mahraj-admin-services",
    [],
  );

  const productItems = legacyProducts.length
    ? legacyProducts.map((item, index) => ({
        ...item,
        featuredImage: item.featuredImage || item.image,
        imageAlt: item.imageAlt || item.title,
        isFeatured:
          item.isFeatured ??
          [
            "welded-mesh-fencing",
            "chain-link-fencing",
            "temporary-fencing",
            "security-gates",
            "palisade-fencing",
            "anti-climb-fencing",
          ].includes(item.slug),
        sortOrder: item.sortOrder ?? index,
      }))
    : staticProducts.map((item, sortOrder) => ({
        ...item,
        featuredImage: item.featuredImage ?? item.image,
        imageAlt: item.imageAlt ?? item.title,
        isFeatured: [
          "welded-mesh-fencing",
          "chain-link-fencing",
          "temporary-fencing",
          "security-gates",
          "palisade-fencing",
          "anti-climb-fencing",
        ].includes(item.slug),
        status: "published" as const,
        sortOrder,
      }));
  const serviceItems = legacyServices.length
    ? legacyServices.map((item, index) => ({
        ...item,
        featuredImage: item.featuredImage || item.image,
        imageAlt: item.imageAlt || item.title,
        isFeatured: item.isFeatured ?? true,
        sortOrder: item.sortOrder ?? index,
      }))
    : staticServices.map((item, sortOrder) => ({
        ...item,
        featuredImage: item.featuredImage ?? item.image,
        imageAlt: item.imageAlt ?? item.title,
        isFeatured: true,
        status: "published" as const,
        sortOrder,
      }));

  const { error: productSeedError } = await client
    .from("products")
    .upsert(productItems.map(productToRow), {
      onConflict: "slug",
      ignoreDuplicates: true,
    });
  if (productSeedError) throwCatalogError(productSeedError);

  const { error: serviceSeedError } = await client
    .from("services")
    .upsert(serviceItems.map(serviceToRow), {
      onConflict: "slug",
      ignoreDuplicates: true,
    });
  if (serviceSeedError) throwCatalogError(serviceSeedError);

  const { error: markerError } = await client
    .from("catalog_seed_state")
    .upsert({ version: CATALOG_SEED_VERSION }, { onConflict: "version" });
  if (markerError) throwCatalogError(markerError);

  window.localStorage.removeItem("mahraj-admin-products");
  window.localStorage.removeItem("mahraj-admin-services");
}

export async function listAdminProducts(): Promise<AdminProduct[]> {
  await ensureCatalogSeeded();
  const { data, error } = await getSupabaseClient()
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throwCatalogError(error);
  return data.map(productFromRow);
}

export async function getAdminProduct(
  slug: string,
): Promise<AdminProduct | null> {
  await ensureCatalogSeeded();
  const { data, error } = await getSupabaseClient()
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throwCatalogError(error);
  return data ? productFromRow(data) : null;
}

export async function saveAdminProduct(
  product: AdminProduct,
  previousSlug?: string,
): Promise<void> {
  await ensureCatalogSeeded();
  const client = getSupabaseClient();
  const result = previousSlug
    ? await client
        .from("products")
        .update(productToRow(product))
        .eq("slug", previousSlug)
        .select("slug")
        .maybeSingle()
    : await client.from("products").insert(productToRow(product));

  if (result.error) throwCatalogError(result.error);
  if (previousSlug && !result.data) {
    throw new Error(`Product "${previousSlug}" no longer exists.`);
  }
}

export async function deleteAdminProduct(slug: string): Promise<void> {
  await ensureCatalogSeeded();
  const { error } = await getSupabaseClient()
    .from("products")
    .delete()
    .eq("slug", slug);

  if (error) throwCatalogError(error);
}

export async function listAdminServices(): Promise<AdminService[]> {
  await ensureCatalogSeeded();
  const { data, error } = await getSupabaseClient()
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throwCatalogError(error);
  return data.map(serviceFromRow);
}

export async function getAdminService(
  slug: string,
): Promise<AdminService | null> {
  await ensureCatalogSeeded();
  const { data, error } = await getSupabaseClient()
    .from("services")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? serviceFromRow(data) : null;
}

export async function saveAdminService(
  service: AdminService,
  previousSlug?: string,
): Promise<void> {
  await ensureCatalogSeeded();
  const client = getSupabaseClient();
  const result = previousSlug
    ? await client
        .from("services")
        .update(serviceToRow(service))
        .eq("slug", previousSlug)
        .select("slug")
        .maybeSingle()
    : await client.from("services").insert(serviceToRow(service));

  if (result.error) throwCatalogError(result.error);
  if (previousSlug && !result.data) {
    throw new Error(`Service "${previousSlug}" no longer exists.`);
  }
}

export async function deleteAdminService(slug: string): Promise<void> {
  await ensureCatalogSeeded();
  const { error } = await getSupabaseClient()
    .from("services")
    .delete()
    .eq("slug", slug);

  if (error) throwCatalogError(error);
}
