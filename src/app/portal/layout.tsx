"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Bot, LogOut, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-border text-cyan-400 flex items-center justify-center mx-auto animate-spin">
            <Bot className="w-6 h-6" />
          </div>
          <p className="text-body-xs text-mist font-mono uppercase tracking-widest">
            Loading Console Session...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Prevent flash of content during redirect
  }

  return (
    <div className="min-h-screen bg-void flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-graphite/40 border-r border-steel/40 flex flex-col justify-between p-6">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-obsidian">
              <Bot className="w-4.5 h-4.5" />
            </div>
            <span className="font-display text-body-md font-bold text-ice">
              Console <span className="text-cyan-400">v1.0</span>
            </span>
          </div>

          {/* Links */}
          <nav className="space-y-1.5">
            <Link
              href="/portal"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-glow border border-cyan-border/40 text-cyan-400 font-mono text-body-xs uppercase font-semibold"
            >
              <LayoutDashboard className="w-4 h-4" />
              Workspace
            </Link>
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="border-t border-steel/30 pt-6 mt-8 space-y-4">
          <div className="px-2">
            <span className="text-[9px] text-mist font-mono uppercase block">Active Account</span>
            <span className="text-body-xs font-mono text-ice truncate block mt-0.5" title={user.email || ""}>
              {user.email}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-steel bg-steel/20 hover:bg-danger-glow/10 hover:border-danger/25 text-frost hover:text-danger font-mono text-body-xs uppercase font-semibold transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
