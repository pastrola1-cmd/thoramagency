import { servicesData } from "@/data/services";
import ServiceClient from "./ServiceClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return servicesData.map((srv) => ({
    id: srv.id,
  }));
}

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = servicesData.find((srv) => srv.id === params.id);

  if (!service) {
    notFound();
  }

  return <ServiceClient service={service} />;
}
