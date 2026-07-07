"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { CreditCard, CheckCircle2, ShieldCheck, HelpCircle, Loader2, ArrowUpRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Invoice {
  id: string;
  item: string;
  amount: string;
  date: string;
  status: "Paid" | "Pending";
  ref: string;
}

export default function BillingConsole() {
  const { user } = useAuth();
  const [loadingPaystack, setLoadingPaystack] = useState(false);
  const [mockModalOpen, setMockModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState("");
  
  // Invoices list state
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: "INV-2026-003", item: "Loop 13: Portal Shell Auth Release", amount: "$2,500.00", date: "Jul 07, 2026", status: "Paid", ref: "pay_ref_8819273" },
    { id: "INV-2026-002", item: "Loop 11 & 12: Header & Footer SEO Locks", amount: "$2,500.00", date: "Jul 05, 2026", status: "Paid", ref: "pay_ref_7739102" },
    { id: "INV-2026-001", item: "Marketing Framework Setup (Loop 1-10)", amount: "$5,000.00", date: "Jul 01, 2026", status: "Paid", ref: "pay_ref_1120392" },
  ]);

  // Dynamically inject Paystack inline script
  useEffect(() => {
    const existingScript = document.getElementById("paystack-js");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.id = "paystack-js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePaystackPayment = () => {
    setLoadingPaystack(true);

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
    
    // Check if we are running in mock key mode
    if (publicKey.startsWith("pk_test_mock") || !(window as any).PaystackPop) {
      // Offline/Mock mode checkout fallback
      setTimeout(() => {
        setLoadingPaystack(false);
        setMockModalOpen(true);
      }, 800);
      return;
    }

    try {
      // Real Paystack Checkout Integration
      const handler = (window as any).PaystackPop.setup({
        key: publicKey,
        email: user?.email || "billing@company.com",
        amount: 2500 * 100, // $2,500 in kobo/cents
        currency: "USD",
        ref: "thoram-" + Math.floor(Math.random() * 1000000000 + 1),
        callback: (response: any) => {
          setLoadingPaystack(false);
          const newInvoice: Invoice = {
            id: `INV-2026-00${invoices.length + 1}`,
            item: "Loop 15: Firestore Database & Sync Release",
            amount: "$2,500.00",
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
            status: "Paid",
            ref: response.reference,
          };
          setInvoices([newInvoice, ...invoices]);
          setSuccessToast("Loop funded successfully! Release scheduled.");
        },
        onClose: () => {
          setLoadingPaystack(false);
        },
      });
      handler.openIframe();
    } catch (err) {
      console.error("Paystack load error, falling back to mock:", err);
      setLoadingPaystack(false);
      setMockModalOpen(true);
    }
  };

  const handleConfirmMockPayment = () => {
    setMockModalOpen(false);
    const mockRef = "mock-payref-" + Math.floor(Math.random() * 100000000);
    const newInvoice: Invoice = {
      id: `INV-2026-00${invoices.length + 1}`,
      item: "Loop 15: Firestore Database & Sync Release",
      amount: "$2,500.00",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      status: "Paid",
      ref: mockRef,
    };
    setInvoices([newInvoice, ...invoices]);
    setSuccessToast("Sandbox payment completed. Loop 15 status updated to paid.");
    
    // Clear toast automatically
    setTimeout(() => {
      setSuccessToast("");
    }, 4000);
  };

  return (
    <div className="space-y-8">
      {/* Dynamic Success Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-mono text-body-xs flex items-center gap-2 shadow-lg backdrop-blur-xl"
          >
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Plan overview & Payment call to action */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6 border border-steel/60 relative overflow-hidden bg-graphite/10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="space-y-1.5">
                <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest block">Active Contract</span>
                <h3 className="font-display text-body-lg font-bold text-ice">Growth Sprint Cohort</h3>
                <p className="text-body-xs text-frost leading-normal max-w-md">
                  Active sprint deployment. You are currently on a monthly cohort roadmap supporting continuous loops.
                </p>
                <div className="flex items-center gap-2 pt-2 text-[10px] font-mono text-mist">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Gateway: Paystack Checkout</span>
                </div>
              </div>

              <div className="text-left sm:text-right space-y-2">
                <div className="text-display-sm font-bold text-ice">$2,500<span className="text-body-xs text-frost font-normal"> / loop</span></div>
                <button
                  onClick={handlePaystackPayment}
                  disabled={loadingPaystack}
                  className="btn btn-primary py-2.5 px-5 rounded-xl text-body-xs font-mono font-bold flex items-center gap-1.5 w-full justify-center shadow-glow"
                >
                  {loadingPaystack ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Initializing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" /> Fund Loop 15
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Invoice logs list */}
          <div className="space-y-4">
            <h4 className="font-display text-body-xs font-bold text-ice uppercase tracking-wider">
              Transaction History
            </h4>

            <div className="glass rounded-2xl border border-steel/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-steel/30 bg-graphite/30 text-[9px] text-mist font-mono uppercase tracking-wider">
                      <th className="p-4">Invoice ID</th>
                      <th className="p-4">Billing Item</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-[11px] font-mono divide-y divide-steel/20">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-steel/5 transition-colors">
                        <td className="p-4 text-ice font-bold">{inv.id}</td>
                        <td className="p-4 text-frost max-w-[240px] truncate">{inv.item}</td>
                        <td className="p-4 text-ice">{inv.amount}</td>
                        <td className="p-4 text-mist">{inv.date}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                            <CheckCircle2 className="w-3 h-3" /> {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Info/Billing Settings */}
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 border border-steel/40 space-y-4">
            <h4 className="font-display text-body-xs font-bold text-ice uppercase tracking-wider border-b border-steel/20 pb-3">
              Billing Information
            </h4>
            <div className="space-y-3.5 text-body-xs leading-normal">
              <div>
                <span className="text-[9px] text-mist font-mono uppercase block">Billing Email</span>
                <span className="text-frost font-mono">{user?.email || "Not configured"}</span>
              </div>
              <div>
                <span className="text-[9px] text-mist font-mono uppercase block">Legal Entity</span>
                <span className="text-frost">Thoram Growth Partner Ltd</span>
              </div>
              <div>
                <span className="text-[9px] text-mist font-mono uppercase block">Tax Identifier</span>
                <span className="text-frost font-mono">VAT-MOCK-99182</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-steel/40 text-mist text-[10px] space-y-2.5">
            <div className="flex gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <p className="leading-normal text-frost">
                Need customized enterprise invoices? Our systems support customized invoicing schedules, bank wires, and localized VAT references. Reach out to our lead growth architect.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Paystack Mock Checkout Popup Overlay */}
      <AnimatePresence>
        {mockModalOpen && (
          <div className="fixed inset-0 bg-void/90 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-[#0a1124] border border-cyan-500/25 rounded-2xl p-6 shadow-glow space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-[40px] pointer-events-none" />

              {/* Paystack Mock branding */}
              <div className="flex justify-between items-center border-b border-steel/20 pb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">P</div>
                  <span className="text-xs font-bold text-ice font-mono">Paystack <span className="text-emerald-400">test</span></span>
                </div>
                <span className="text-[9px] font-mono text-mist uppercase tracking-widest">Sandbox Mode</span>
              </div>

              {/* Transaction details */}
              <div className="space-y-4 text-body-xs">
                <div className="flex justify-between">
                  <span className="text-frost">Merchant:</span>
                  <span className="text-ice font-bold">Thoram Group</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-frost">Payable:</span>
                  <span className="text-cyan-400 font-bold">$2,500.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-frost">User Email:</span>
                  <span className="text-ice truncate font-mono max-w-[180px]">{user?.email}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setMockModalOpen(false)}
                  className="flex-1 py-2.5 border border-steel bg-steel/10 rounded-xl font-mono text-[10px] text-frost hover:bg-steel/20 uppercase"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmMockPayment}
                  className="flex-1 py-2.5 bg-emerald-500 text-obsidian rounded-xl font-mono text-[10px] font-bold hover:bg-emerald-400 uppercase shadow-glow shadow-emerald-500/15"
                >
                  Authorize Payment
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
