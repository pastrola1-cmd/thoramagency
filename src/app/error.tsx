"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-6">
      <div className="max-w-md w-full glass border border-steel/60 rounded-2xl p-8 text-center space-y-6">
        <div className="w-12 h-12 rounded-xl bg-danger/10 border border-danger/20 text-danger flex items-center justify-center mx-auto animate-pulse">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-body-lg font-bold text-ice">
            Something went wrong
          </h2>
          <p className="text-body-xs text-frost leading-relaxed">
            An unexpected error occurred while executing this page segment. You can try to reset the current session.
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="w-full btn btn-primary py-3 rounded-xl text-body-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-glow"
        >
          <RotateCcw className="w-4 h-4" /> Reset Interface
        </button>
      </div>
    </div>
  );
}
