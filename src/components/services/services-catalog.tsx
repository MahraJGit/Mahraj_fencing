import { io } from "next/cache";
import { ServiceCards } from "@/components/services/service-cards";
import { ServicesQuickNav } from "@/components/services/quick-nav";
import { getPublishedServices } from "@/lib/catalog-data";

export async function ServicesCatalog() {
  await io();
  const services = await getPublishedServices();

  return (
    <>
      <ServicesQuickNav services={services} />
      <ServiceCards services={services} />
    </>
  );
}
