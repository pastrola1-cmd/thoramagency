"use client";

import { useAuth } from "@/context/AuthContext";
import LoopTracker from "@/components/portal/LoopTracker";
import BillingConsole from "@/components/portal/BillingConsole";
import CRMConsole from "@/components/admin/CRMConsole";
import { ArrowUpRight, Zap, RefreshCw, CreditCard, LayoutDashboard, Users } from "lucide-react";
import { useState } from "react";

export default function PortalPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"workspace" | "billing" | "crm">("workspace");
  const [requestStatus, setRequestStatus] = useState("");

  const handleRequestNextLoop = () => {
    setRequestStatus("pending");
    setTimeout(() => {
      setRequestStatus("");
    }, 5000);
  };

  return (
    <div className="space-y-10">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-steel/30">
        <div>
          <span className="text-[10px] text-orange-500 font-mono uppercase tracking-widest block">
            Console Workspace & CRM
          </span>
          <h1 className="font-display text-display-sm font-bold text-ice mt-1">
            Welcome, Partner
          </h1>
          <p className="text-body-xs text-frost mt-1 leading-normal">
            Track B2B build sprints, manage client leads & follow-up pipelines, and approve development scopes.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab("crm")}
            className="btn btn-primary py-2.5 px-4 rounded-xl text-body-xs font-mono font-bold flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" /> Client Leads CRM
          </button>

          <button
            onClick={() => setActiveTab("billing")}
            className="btn btn-secondary py-2.5 px-4 rounded-xl text-body-xs font-mono font-bold flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" /> Billing Console <ArrowUpRight className="w-3.5 h-3.5 text-mist" />
          </button>
        </div>
      </div>

      {/* Tabs Selector */}
      <div role="tablist" className="flex border-b border-steel/30 gap-6 overflow-x-auto">
        <button
          role="tab"
          aria-selected={activeTab === "workspace"}
          onClick={() => setActiveTab("workspace")}
          className={`pb-4 text-body-xs font-mono uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all duration-300 shrink-0 ${
            activeTab === "workspace"
              ? "border-orange-500 text-orange-500"
              : "border-transparent text-mist hover:text-frost"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" /> Sprint Workspace
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "crm"}
          onClick={() => setActiveTab("crm")}
          className={`pb-4 text-body-xs font-mono uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all duration-300 shrink-0 ${
            activeTab === "crm"
              ? "border-orange-500 text-orange-500"
              : "border-transparent text-mist hover:text-frost"
          }`}
        >
          <Users className="w-4 h-4" /> Client Leads & Pipeline
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "billing"}
          onClick={() => setActiveTab("billing")}
          className={`pb-4 text-body-xs font-mono uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all duration-300 shrink-0 ${
            activeTab === "billing"
              ? "border-orange-500 text-orange-500"
              : "border-transparent text-mist hover:text-frost"
          }`}
        >
          <CreditCard className="w-4 h-4" /> Billing & Invoices
        </button>
      </div>

      {/* Conditional Sub-Widgets */}
      <div role="tabpanel">
        {activeTab === "workspace" && <LoopTracker />}
        {activeTab === "crm" && <CRMConsole />}
        {activeTab === "billing" && <BillingConsole />}
      </div>

    </div>
  );
}
