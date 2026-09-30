"use client";

import { useState, useEffect, useMemo } from "react";
import {
  CRMLead,
  LeadStatus,
  LeadPriority,
  fetchCRMLeads,
  updateLeadStatus,
  addLeadNote,
  updateLeadDetails,
  deleteCRMLead,
  createCRMLead,
  exportLeadsToCSV,
} from "@/lib/crm";
import {
  Users,
  Search,
  Plus,
  Download,
  Filter,
  Kanban,
  Table as TableIcon,
  MessageCircle,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  X,
  Send,
  UserCheck,
  Building2,
  DollarSign,
  Layers,
  ChevronRight,
  TrendingUp,
  Briefcase,
  Flame,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; color: string; bg: string; border: string; iconColor: string }
> = {
  new: {
    label: "New Inquiries",
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    iconColor: "text-amber-500",
  },
  contacted: {
    label: "Contacted / Discovery",
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    iconColor: "text-blue-500",
  },
  scoping: {
    label: "Technical Scoping",
    color: "text-purple-600",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    iconColor: "text-purple-500",
  },
  proposal_sent: {
    label: "Proposal Sent",
    color: "text-orange-600",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    iconColor: "text-orange-500",
  },
  negotiation: {
    label: "In Negotiation",
    color: "text-indigo-600",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    iconColor: "text-indigo-500",
  },
  won: {
    label: "Closed Won 🚀",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-500",
  },
  lost: {
    label: "Closed Lost",
    color: "text-zinc-500",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/20",
    iconColor: "text-zinc-400",
  },
};

const PRIORITY_BADGES: Record<LeadPriority, { label: string; cls: string }> = {
  urgent: { label: "Urgent", cls: "bg-rose-500/10 text-rose-600 border-rose-500/20" },
  high: { label: "High", cls: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  medium: { label: "Medium", cls: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  low: { label: "Low", cls: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20" },
};

const PIPELINE_ORDER: LeadStatus[] = [
  "new",
  "contacted",
  "scoping",
  "proposal_sent",
  "negotiation",
  "won",
  "lost",
];

export default function CRMConsole() {
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  // Selected Lead for Detail Drawer
  const [activeLead, setActiveLead] = useState<CRMLead | null>(null);
  const [newNoteText, setNewNoteText] = useState("");
  const [authorName, setAuthorName] = useState("Staff");

  // Create Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Business Systems & Custom Software",
    budget: "₦3M - ₦10M ($2k - $6k)",
    timeline: "1 - 2 Months",
    message: "",
    priority: "high" as LeadPriority,
    status: "new" as LeadStatus,
    assignedTo: "Olamide (Lead Partner)",
    source: "Manual Staff Entry",
  });

  const loadLeads = async () => {
    setLoading(true);
    const data = await fetchCRMLeads();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        lead.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || lead.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [leads, searchQuery, statusFilter, priorityFilter]);

  // Metrics
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "new").length;
    const active = leads.filter((l) => !["won", "lost"].includes(l.status)).length;
    const wonCount = leads.filter((l) => l.status === "won").length;
    const urgentCount = leads.filter((l) => l.priority === "urgent" && l.status !== "won").length;
    return { total, newCount, active, wonCount, urgentCount };
  }, [leads]);

  // Actions
  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await updateLeadStatus(leadId, newStatus);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus, updatedAt: new Date().toISOString() } : l))
    );
    if (activeLead && activeLead.id === leadId) {
      setActiveLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLead || !newNoteText.trim()) return;

    await addLeadNote(activeLead.id, newNoteText.trim(), authorName);
    const noteObj = {
      id: `note-${Date.now()}`,
      author: authorName,
      text: newNoteText.trim(),
      createdAt: new Date().toISOString(),
    };
    const updatedNotes = [noteObj, ...activeLead.notes];

    setActiveLead({ ...activeLead, notes: updatedNotes });
    setLeads((prev) =>
      prev.map((l) => (l.id === activeLead.id ? { ...l, notes: updatedNotes } : l))
    );
    setNewNoteText("");
  };

  const handleUpdateDetails = async (
    field: keyof CRMLead,
    value: string
  ) => {
    if (!activeLead) return;
    await updateLeadDetails(activeLead.id, { [field]: value } as any);
    const updated = { ...activeLead, [field]: value };
    setActiveLead(updated);
    setLeads((prev) => prev.map((l) => (l.id === activeLead.id ? updated : l)));
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm("Are you sure you want to remove this lead from the CRM?")) return;
    await deleteCRMLead(leadId);
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    if (activeLead?.id === leadId) setActiveLead(null);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await createCRMLead(newLeadForm);
    setLeads((prev) => [created, ...prev]);
    setCreateModalOpen(false);
    setNewLeadForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "Business Systems & Custom Software",
      budget: "₦3M - ₦10M ($2k - $6k)",
      timeline: "1 - 2 Months",
      message: "",
      priority: "high",
      status: "new",
      assignedTo: "Olamide (Lead Partner)",
      source: "Manual Staff Entry",
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-orange-600">
              Agency Internal Ops
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mt-1">
            Client Inquiries & Lead Pipeline
          </h1>
          <p className="text-sm text-zinc-500">
            Real-time prospective client briefing logs, stage progression, and follow-up routing.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => exportLeadsToCSV(leads)}
            className="btn-ghost text-xs py-2.5 px-3.5 inline-flex items-center gap-1.5 font-medium"
            title="Download CSV report"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="btn-solid text-xs py-2.5 px-4 inline-flex items-center gap-1.5 font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-zinc-900/[0.08] shadow-xs">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
            Total Inquiries
          </div>
          <div className="text-2xl font-bold text-zinc-900">{stats.total}</div>
        </div>
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-xs">
          <div className="text-xs font-mono text-amber-600 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            <span>New Leads</span>
          </div>
          <div className="text-2xl font-bold text-amber-600">{stats.newCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 shadow-xs">
          <div className="text-xs font-mono text-blue-600 uppercase tracking-wider mb-1">
            Active Discussions
          </div>
          <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
        </div>
        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 shadow-xs">
          <div className="text-xs font-mono text-rose-600 uppercase tracking-wider mb-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Urgent Action</span>
          </div>
          <div className="text-2xl font-bold text-rose-600">{stats.urgentCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 shadow-xs col-span-2 sm:col-span-1">
          <div className="text-xs font-mono text-emerald-600 uppercase tracking-wider mb-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Deals Won</span>
          </div>
          <div className="text-2xl font-bold text-emerald-600">{stats.wonCount}</div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, View Switcher */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 p-3 rounded-2xl bg-white border border-zinc-900/[0.08]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, email, company, service..."
            className="w-full bg-zinc-50 border border-zinc-900/[0.06] rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-600 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-50 border border-zinc-900/[0.06] rounded-xl px-3 py-2 text-xs text-zinc-700 focus:outline-none focus:border-orange-600"
          >
            <option value="all">All Stages</option>
            {PIPELINE_ORDER.map((st) => (
              <option key={st} value={st}>
                {STATUS_CONFIG[st].label}
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-zinc-50 border border-zinc-900/[0.06] rounded-xl px-3 py-2 text-xs text-zinc-700 focus:outline-none focus:border-orange-600"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-zinc-100 p-0.5 rounded-xl border border-zinc-900/[0.06] shrink-0">
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === "kanban"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pipeline</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === "table"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: KANBAN PIPELINE BOARD */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 overflow-x-auto pb-6">
          {PIPELINE_ORDER.map((stage) => {
            const cfg = STATUS_CONFIG[stage];
            const stageLeads = filteredLeads.filter((l) => l.status === stage);

            return (
              <div
                key={stage}
                className="flex flex-col rounded-2xl bg-zinc-100/70 border border-zinc-900/[0.06] p-3 min-w-[260px] xl:min-w-0"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-900/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${cfg.bg.replace("/10", "")}`}
                    />
                    <span className="text-xs font-mono font-bold text-zinc-800">
                      {cfg.label}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white text-zinc-600 border border-zinc-900/[0.06]">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[700px]">
                  {stageLeads.length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-zinc-400 font-mono">
                      No leads
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setActiveLead(lead)}
                        className="p-3.5 rounded-xl bg-white border border-zinc-900/[0.08] hover:border-orange-600/40 hover:shadow-md transition-all cursor-pointer space-y-2.5 group"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${
                              PRIORITY_BADGES[lead.priority].cls
                            }`}
                          >
                            {lead.priority}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {new Date(lead.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-zinc-900 group-hover:text-orange-600 transition-colors">
                            {lead.name}
                          </h4>
                          {lead.company && (
                            <div className="text-xs text-zinc-500 truncate flex items-center gap-1 mt-0.5">
                              <Building2 className="w-3 h-3 text-zinc-400" />
                              <span>{lead.company}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-[11px] font-mono text-zinc-600 bg-zinc-50 p-1.5 rounded-lg border border-zinc-900/[0.04] truncate">
                          {lead.service}
                        </div>

                        {lead.budget && (
                          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            <span>{lead.budget}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-zinc-900/[0.04] text-[11px] text-zinc-400">
                          <span className="truncate max-w-[120px]">
                            {lead.assignedTo || "Unassigned"}
                          </span>
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-emerald-600 hover:text-emerald-700 p-1 rounded hover:bg-emerald-50"
                              title="Chat WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: TABLE LIST VIEW */}
      {viewMode === "table" && (
        <div className="rounded-2xl bg-white border border-zinc-900/[0.08] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-zinc-50/80 border-b border-zinc-900/[0.06] text-zinc-500 font-mono uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Client / Company</th>
                  <th className="py-3 px-4">Capability & Requirements</th>
                  <th className="py-3 px-4">Budget / Timeline</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Assignee</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/[0.06]">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-zinc-400 font-mono">
                      No matching leads found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setActiveLead(lead)}
                      className="hover:bg-orange-50/30 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-zinc-900">{lead.name}</div>
                        <div className="text-xs text-zinc-500">{lead.email}</div>
                        {lead.company && (
                          <div className="text-[11px] text-zinc-400 mt-0.5">{lead.company}</div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 max-w-[260px]">
                        <div className="font-semibold text-zinc-800 truncate">{lead.service}</div>
                        <div className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                          {lead.message}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs">
                        <div className="text-emerald-700 font-semibold">{lead.budget || "N/A"}</div>
                        <div className="text-zinc-400">{lead.timeline || "Flexible"}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[11px] font-mono px-2.5 py-1 rounded-full border font-semibold inline-block ${
                            STATUS_CONFIG[lead.status].bg
                          } ${STATUS_CONFIG[lead.status].color} ${
                            STATUS_CONFIG[lead.status].border
                          }`}
                        >
                          {STATUS_CONFIG[lead.status].label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${
                            PRIORITY_BADGES[lead.priority].cls
                          }`}
                        >
                          {lead.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-zinc-600">
                        {lead.assignedTo || "Unassigned"}
                      </td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                              title="WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          )}
                          <a
                            href={`mailto:${lead.email}`}
                            className="p-1.5 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors"
                            title="Email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LEAD DETAILS & NOTES DRAWER (MODAL) */}
      <AnimatePresence>
        {activeLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
            onClick={() => setActiveLead(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col"
            >
              {/* Drawer Topbar */}
              <div className="p-6 border-b border-zinc-900/[0.08] flex items-center justify-between sticky top-0 bg-white z-10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-orange-600 uppercase">
                    <span>{activeLead.id}</span>
                    <span>·</span>
                    <span>{activeLead.source}</span>
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 mt-1">{activeLead.name}</h2>
                </div>
                <button
                  onClick={() => setActiveLead(null)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 space-y-6 flex-1">
                {/* 1-Tap Fast Contact Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {activeLead.phone ? (
                    <a
                      href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat WhatsApp</span>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="p-3 rounded-xl bg-zinc-100 text-zinc-400 text-xs font-medium flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>No WhatsApp</span>
                    </button>
                  )}

                  <a
                    href={`mailto:${activeLead.email}`}
                    className="p-3 rounded-xl bg-orange-600 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors shadow-xs"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>

                  {activeLead.phone && (
                    <a
                      href={`tel:${activeLead.phone}`}
                      className="p-3 rounded-xl bg-zinc-900 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors col-span-2 sm:col-span-1"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Client</span>
                    </a>
                  )}
                </div>

                {/* Stage & Controls Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-900/[0.06]">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                      Pipeline Stage
                    </label>
                    <select
                      value={activeLead.status}
                      onChange={(e) => handleStatusChange(activeLead.id, e.target.value as LeadStatus)}
                      className="w-full bg-white border border-zinc-900/[0.08] rounded-xl px-3 py-2 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-orange-600"
                    >
                      {PIPELINE_ORDER.map((st) => (
                        <option key={st} value={st}>
                          {STATUS_CONFIG[st].label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                      Priority Level
                    </label>
                    <select
                      value={activeLead.priority}
                      onChange={(e) => handleUpdateDetails("priority", e.target.value)}
                      className="w-full bg-white border border-zinc-900/[0.08] rounded-xl px-3 py-2 text-xs font-semibold text-zinc-900 focus:outline-none focus:border-orange-600"
                    >
                      <option value="urgent">🔥 Urgent</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                      Assigned Lead Partner / Staff
                    </label>
                    <input
                      type="text"
                      value={activeLead.assignedTo || ""}
                      onChange={(e) => handleUpdateDetails("assignedTo", e.target.value)}
                      placeholder="e.g. Olamide"
                      className="w-full bg-white border border-zinc-900/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                      Next Follow-Up Date
                    </label>
                    <input
                      type="date"
                      value={activeLead.nextFollowUp || ""}
                      onChange={(e) => handleUpdateDetails("nextFollowUp", e.target.value)}
                      className="w-full bg-white border border-zinc-900/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-600"
                    />
                  </div>
                </div>

                {/* Brief & Parameters */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                    Project Parameters & Brief
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-900/[0.06]">
                      <div className="text-zinc-400 font-mono text-[10px] uppercase">Service</div>
                      <div className="font-semibold text-zinc-900 mt-0.5">{activeLead.service}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-900/[0.06]">
                      <div className="text-zinc-400 font-mono text-[10px] uppercase">Budget Target</div>
                      <div className="font-semibold text-emerald-700 mt-0.5">{activeLead.budget || "Unspecified"}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-900/[0.06]">
                      <div className="text-zinc-400 font-mono text-[10px] uppercase">Timeline Target</div>
                      <div className="font-semibold text-zinc-900 mt-0.5">{activeLead.timeline || "Flexible"}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-900/[0.06]">
                      <div className="text-zinc-400 font-mono text-[10px] uppercase">Company</div>
                      <div className="font-semibold text-zinc-900 mt-0.5">{activeLead.company || "Direct Individual"}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-900/[0.06] space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-zinc-400 font-semibold">
                      Client Brief Message:
                    </div>
                    <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
                      {activeLead.message}
                    </p>
                  </div>
                </div>

                {/* Internal Staff Notes Thread */}
                <div className="space-y-4 pt-4 border-t border-zinc-900/[0.08]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                      Internal Staff Notes & Activity Log
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {activeLead.notes.length} note(s)
                    </span>
                  </div>

                  {/* Add Note Form */}
                  <form onSubmit={handleAddNote} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        placeholder="Log meeting summary, client objection, or follow-up note..."
                        className="flex-1 bg-zinc-50 border border-zinc-900/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-600"
                      />
                      <button
                        type="submit"
                        disabled={!newNoteText.trim()}
                        className="btn-solid text-xs px-4 py-2 font-semibold shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post Note</span>
                      </button>
                    </div>
                  </form>

                  {/* Notes Timeline */}
                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
                    {activeLead.notes.length === 0 ? (
                      <div className="text-center py-6 text-xs text-zinc-400 font-mono">
                        No internal notes posted yet.
                      </div>
                    ) : (
                      activeLead.notes.map((note) => (
                        <div
                          key={note.id}
                          className="p-3 rounded-xl bg-zinc-50 border border-zinc-900/[0.06] text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                            <span className="font-semibold text-zinc-700">{note.author}</span>
                            <span>{new Date(note.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="text-zinc-800 leading-relaxed">{note.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Delete Lead Button */}
                <div className="pt-6 border-t border-zinc-900/[0.08] flex justify-end">
                  <button
                    onClick={() => handleDelete(activeLead.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors font-semibold font-mono"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Lead Record</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MANUAL ADD LEAD MODAL */}
      <AnimatePresence>
        {createModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setCreateModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-900/[0.08] space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-900/[0.08]">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">Manually Log Client Lead</h3>
                  <p className="text-xs text-zinc-500">Record a phone inquiry, event prospect, or referral.</p>
                </div>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-500 mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newLeadForm.name}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                      placeholder="e.g. Chief Raymond"
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-500 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={newLeadForm.email}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                      placeholder="raymond@company.ng"
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-500 mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={newLeadForm.phone}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                      placeholder="+234 800 000 0000"
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-500 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={newLeadForm.company}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                      placeholder="e.g. Raymond Holdings"
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-500 mb-1">
                      Service Focus
                    </label>
                    <select
                      value={newLeadForm.service}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] rounded-xl px-2.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-600"
                    >
                      <option value="Business Systems & Custom Software">Business Systems</option>
                      <option value="Customer Platforms & SaaS">Platforms & SaaS</option>
                      <option value="Mobile App Development">Mobile Apps</option>
                      <option value="Automation & AI Workflows">Automation & AI</option>
                      <option value="Product Strategy & Architecture">Product Strategy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-500 mb-1">
                      Budget
                    </label>
                    <select
                      value={newLeadForm.budget}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] rounded-xl px-2.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-600"
                    >
                      <option value="< ₦3M (< $2k)">&lt; ₦3M</option>
                      <option value="₦3M - ₦10M ($2k - $6k)">₦3M - ₦10M</option>
                      <option value="₦10M - ₦30M ($6k - $20k)">₦10M - ₦30M</option>
                      <option value="₦30M+ ($20k+ Enterprise)">₦30M+ (Enterprise)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-500 mb-1">
                      Priority
                    </label>
                    <select
                      value={newLeadForm.priority}
                      onChange={(e) =>
                        setNewLeadForm({ ...newLeadForm, priority: e.target.value as LeadPriority })
                      }
                      className="w-full bg-zinc-50 border border-zinc-900/[0.08] rounded-xl px-2.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-600"
                    >
                      <option value="urgent">🔥 Urgent</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-1">
                    Requirements / Notes *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newLeadForm.message}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                    placeholder="Project details, technical scope, or conversation context..."
                    className="w-full bg-zinc-50 border border-zinc-900/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-600 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-900/[0.08]">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="btn-ghost text-xs py-2.5 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-solid text-xs py-2.5 px-5 font-semibold"
                  >
                    Save to Pipeline
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
