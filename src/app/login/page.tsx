"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, AlertCircle, Bot, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      router.push("/portal");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-6 relative overflow-hidden py-16">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md glass rounded-2xl p-8 border border-steel/60 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-cyan-border text-orange-500 flex items-center justify-center mx-auto mb-4">
            <Bot className="w-6 h-6" />
          </div>
          <h2 className="font-display text-body-lg md:text-display-sm font-bold text-ice">
            Sign In to Portal
          </h2>
          <p className="text-body-xs text-frost mt-1.5 font-mono uppercase tracking-wider">
            Thoram Growth Console
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <div role="alert" className="p-3.5 rounded-xl border border-danger/20 bg-danger/10 text-danger text-body-xs flex items-start gap-2.5 mb-6">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="block text-caption text-mist uppercase font-mono mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-mist" />
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@company.com"
                className="w-full bg-void border border-steel rounded-xl pl-11 pr-4 py-3 text-body-sm text-ice focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-caption text-mist uppercase font-mono mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-mist" />
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-void border border-steel rounded-xl pl-11 pr-4 py-3 text-body-sm text-ice focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="w-full btn btn-primary py-3.5 rounded-xl text-body-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-glow"
          >
            {submitting ? "Verifying..." : "Access Console"}
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Sign Up hook */}
        <div className="mt-8 text-center border-t border-steel/30 pt-6">
          <p className="text-body-xs text-frost">
            New partnership?{" "}
            <Link href="/signup" className="text-orange-500 font-semibold hover:underline font-mono">
              Apply/Create Account
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
}
