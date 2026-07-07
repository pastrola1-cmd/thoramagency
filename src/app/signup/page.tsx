"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, AlertCircle, Bot, UserPlus } from "lucide-react";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);

    try {
      await signup(email, password);
      router.push("/portal");
    } catch (err: any) {
      setError(err?.message || "Registration failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-6 relative overflow-hidden py-16">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md glass rounded-2xl p-8 border border-steel/60 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-border text-cyan-400 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="font-display text-body-lg md:text-display-sm font-bold text-ice">
            Register Partner Account
          </h2>
          <p className="text-body-xs text-frost mt-1.5 font-mono uppercase tracking-wider">
            Thoram Growth Console
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="p-3.5 rounded-xl border border-danger/20 bg-danger/10 text-danger text-body-xs flex items-start gap-2.5 mb-6">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-caption text-mist uppercase font-mono mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-mist" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@company.com"
                className="w-full bg-void border border-steel rounded-xl pl-11 pr-4 py-3 text-body-sm text-ice focus:border-cyan-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-caption text-mist uppercase font-mono mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-mist" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full bg-void border border-steel rounded-xl pl-11 pr-4 py-3 text-body-sm text-ice focus:border-cyan-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-caption text-mist uppercase font-mono mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-mist" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full bg-void border border-steel rounded-xl pl-11 pr-4 py-3 text-body-sm text-ice focus:border-cyan-500 outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn btn-primary py-3.5 rounded-xl text-body-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-glow"
          >
            {submitting ? "Registering..." : "Create Account"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Sign In hook */}
        <div className="mt-8 text-center border-t border-steel/30 pt-6">
          <p className="text-body-xs text-frost">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-400 font-semibold hover:underline font-mono">
              Sign In Instead
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
}
