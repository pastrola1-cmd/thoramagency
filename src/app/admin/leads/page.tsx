"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import CRMConsole from "@/components/admin/CRMConsole";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Loader2, LogOut, KeyRound } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLeadsPage() {
  const { user, loading, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Invalid staff credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-orange-600 animate-spin mx-auto" />
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Verifying Security Session...
          </p>
        </div>
      </div>
    );
  }

  // ─── IF NOT LOGGED IN: SHOW STRICT STAFF LOGIN GATE ───
  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6 text-white"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-600/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Staff Security Gate
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              RESTRICTED ACCESS · THORAM GROUP INTERNAL CRM
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div role="alert" className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleStaffLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@thoramgroup.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1.5">
                Staff Password / Key
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-solid py-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 mt-2 shadow-lg shadow-orange-600/20"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Authorization...</span>
                </>
              ) : (
                <>
                  <span>Unlock Staff CRM</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Hint */}
          <div className="pt-4 border-t border-zinc-800/80 text-center">
            <button
              type="button"
              onClick={() => {
                setEmail("admin@thoramgroup.com");
                setPassword("thoram2026");
              }}
              className="text-[11px] font-mono text-zinc-500 hover:text-orange-400 transition-colors inline-flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Use Authorized Staff Credentials</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── IF LOGGED IN: SHOW FULL PROTECTED CRM ───
  return (
    <div className="py-10 sm:py-16 bg-zinc-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top User Bar with Logout */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-zinc-900/[0.08] shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-zinc-600">
              Authenticated Session: <strong className="text-zinc-900">{user.email}</strong>
            </span>
          </div>

          <button
            onClick={() => logout()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 hover:border-rose-300 hover:bg-rose-50 text-zinc-600 hover:text-rose-600 text-xs font-mono transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock / Sign Out</span>
          </button>
        </div>

        {/* CRM Console */}
        <CRMConsole />
      </div>
    </div>
  );
}
