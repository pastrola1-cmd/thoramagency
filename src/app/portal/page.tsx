"use client";

import { useAuth } from "@/context/AuthContext";
import LoopTracker from "@/components/portal/LoopTracker";
import BillingConsole from "@/components/portal/BillingConsole";
import { ArrowUpRight, Zap, RefreshCw, CreditCard, LayoutDashboard } from "lucide-react";
import { useState } from "react";

export default function PortalPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"workspace" | "billing">("workspace");
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
            Console Workspace
          </span>
          <h1 className="font-display text-display-sm font-bold text-ice mt-1">
            Welcome, Partner
          </h1>
          <p className="text-body-xs text-frost mt-1 leading-normal">
            Track your B2B build logs, review loop lock indicators, and approve development scopes.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap gap-3">
          {requestStatus === "" ? (
            <button
              onClick={handleRequestNextLoop}
              className="btn btn-primary py-2.5 px-4 rounded-xl text-body-xs font-mono font-bold flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" /> Request Loop Approval
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-yellow-500/20 bg-warning-glow text-warning text-body-xs font-mono">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Next Loop Requested
            </div>
          )}

          <button
            onClick={() => setActiveTab("billing")}
            className="btn btn-secondary py-2.5 px-4 rounded-xl text-body-xs font-mono font-bold flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" /> Billing Console <ArrowUpRight className="w-3.5 h-3.5 text-mist" />
          </button>
        </div>
      </div>

      {/* Tabs Selector */}
      <div role="tablist" className="flex border-b border-steel/30 gap-6">
        <button
          role="tab"
          aria-selected={activeTab === "workspace"}
          onClick={() => setActiveTab("workspace")}
          className={`pb-4 text-body-xs font-mono uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all duration-300 ${
            activeTab === "workspace"
              ? "border-orange-500 text-orange-500"
              : "border-transparent text-mist hover:text-frost"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" /> Workspace
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "billing"}
          onClick={() => setActiveTab("billing")}
          className={`pb-4 text-body-xs font-mono uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 transition-all duration-300 ${
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
        {activeTab === "workspace" ? <LoopTracker /> : <BillingConsole />}
      </div>

    </div>
  );
}

