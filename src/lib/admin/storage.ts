"use client";

import { seedBlogs, seedProducts, seedServices } from "./seed";
import type { AdminBlog, AdminProduct, AdminService } from "./types";

const KEYS = {
  products: "mahraj-admin-products",
  services: "mahraj-admin-services",
  blogs: "mahraj-admin-blogs",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function listProducts(): AdminProduct[] {
  return read(KEYS.products, seedProducts());
}

export function saveProducts(items: AdminProduct[]) {
  write(KEYS.products, items);
}

export function upsertProduct(item: AdminProduct) {
  const items = listProducts();
  const idx = items.findIndex((p) => p.slug === item.slug);
  if (idx >= 0) items[idx] = item;
  else items.unshift(item);
  saveProducts(items);
}

export function deleteProduct(slug: string) {
  saveProducts(listProducts().filter((p) => p.slug !== slug));
}

export function listServices(): AdminService[] {
  return read(KEYS.services, seedServices());
}

export function saveServices(items: AdminService[]) {
  write(KEYS.services, items);
}

export function upsertService(item: AdminService) {
  const items = listServices();
  const idx = items.findIndex((s) => s.slug === item.slug);
  if (idx >= 0) items[idx] = item;
  else items.unshift(item);
  saveServices(items);
}

export function deleteService(slug: string) {
  saveServices(listServices().filter((s) => s.slug !== slug));
}

export function listBlogs(): AdminBlog[] {
  return read(KEYS.blogs, seedBlogs());
}

export function saveBlogs(items: AdminBlog[]) {
  write(KEYS.blogs, items);
}

export function upsertBlog(item: AdminBlog) {
  const items = listBlogs();
  const idx = items.findIndex((b) => b.slug === item.slug);
  if (idx >= 0) items[idx] = item;
  else items.unshift(item);
  saveBlogs(items);
}

export function deleteBlog(slug: string) {
  saveBlogs(listBlogs().filter((b) => b.slug !== slug));
}
