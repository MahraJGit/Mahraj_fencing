import { io } from "next/cache";
import { SiteChrome } from "@/components/layout/site-chrome";
import { mainNav, type NavItem } from "@/content/site";
import { productCategories } from "@/content/products";
import { getPublishedProducts, getPublishedServices } from "@/lib/catalog-data";

export async function SiteChromeData({
  children,
}: {
  children: React.ReactNode;
}) {
  await io();
  const [products, services] = await Promise.all([
    getPublishedProducts(),
    getPublishedServices(),
  ]);

  const categories = [...new Set(products.map((product) => product.category))];
  const productLinks = [
    { label: "All products", href: "/products" },
    ...categories.map((category) => ({
      label: productCategories[category].label,
      href: `/products?category=${category}`,
      description: productCategories[category].description,
    })),
  ];
  const serviceLinks = [
    { label: "All services", href: "/services" },
    ...services.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
      description: service.summary,
    })),
  ];

  const navItems: NavItem[] = mainNav.map((item) => {
    if (item.href === "/products") {
      return { ...item, children: productLinks };
    }
    if (item.href === "/services") {
      return { ...item, children: serviceLinks };
    }
    return item;
  });

  return (
    <SiteChrome
      navItems={navItems}
      productFooterLinks={productLinks}
      serviceFooterLinks={serviceLinks}
    >
      {children}
    </SiteChrome>
  );
}
