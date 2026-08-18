import ProductClient from "./ProductClient";

export function generateStaticParams() {
  return [
    { id: "growth-os" },
    { id: "ai-sales-engine" },
    { id: "conversion-lab" },
    { id: "brand-visibility" },
    { id: "automation-studio" },
  ];
}

export default function ProductDetailPage() {
  return <ProductClient />;
}
