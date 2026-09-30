import CRMConsole from "@/components/admin/CRMConsole";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agency CRM & Pipeline | Thoram Group",
  description: "Internal client lead tracking and sales pipeline command.",
};

export default function AdminLeadsPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CRMConsole />
      </div>
    </div>
  );
}
