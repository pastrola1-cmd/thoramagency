"use client";

import { useAuth } from "@/context/AuthContext";
import LoopTracker from "@/components/portal/LoopTracker";
import { ArrowUpRight, Zap, RefreshCw, CreditCard } from "lucide-react";
import { useState } from "react";

export default function PortalPage() {
  const { user } = useAuth();
  const [requestStatus, setRequestStatus] = useState("");

  const handleRequestNextLoop = () => {
    setRequestStatus("pending");
    console.log("Requested next build loop approval for user:", user?.email);
  };

  return (
    <div className="space-y-10">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-steel/30">
        <div>
          <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest block">
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

          <a
            href="#"
            className="btn btn-secondary py-2.5 px-4 rounded-xl text-body-xs font-mono font-bold flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" /> Billing Console <ArrowUpRight className="w-3.5 h-3.5 text-mist" />
          </a>
        </div>
      </div>

      {/* Main Loop Tracker Widget */}
      <LoopTracker />

    </div>
  );
}
