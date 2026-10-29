// Live Supabase PostgreSQL Configuration (Project: Thoramgroup ltd · cvhopmfoklijshhlmcbi)
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cvhopmfoklijshhlmcbi.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2aG9wbWZva2xpanNoaGxtY2JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MjQxODksImV4cCI6MjA5OTIwMDE4OX0.CKMU6Ha7DoI9CqiSfpTSy3Bq55x-VUzfhc3NH-HkbfM";

function supabaseHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export type LeadStatus =
  | "new"
  | "contacted"
  | "scoping"
  | "proposal_sent"
  | "negotiation"
  | "won"
  | "lost";

export type LeadPriority = "urgent" | "high" | "medium" | "low";

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface CRMLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo?: string;
  notes: LeadNote[];
  nextFollowUp?: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "thoram_crm_leads_v2";

// Map Supabase snake_case row -> CRMLead camelCase
function mapRowToLead(row: any): CRMLead {
  return {
    id: row.id,
    name: row.name || "",
    email: row.email || "",
    phone: row.phone || "",
    company: row.company || "",
    service: row.service || "",
    budget: row.budget || "Not Specified",
    timeline: row.timeline || "Flexible",
    message: row.message || "",
    status: (row.status as LeadStatus) || "new",
    priority: (row.priority as LeadPriority) || "high",
    assignedTo: row.assigned_to || "Olamide (Lead Partner)",
    notes: Array.isArray(row.notes) ? row.notes : [],
    nextFollowUp: row.next_follow_up || "",
    source: row.source || "Website Contact Form",
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

// Map CRMLead camelCase -> Supabase snake_case row
function mapLeadToRow(lead: CRMLead) {
  return {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone || "",
    company: lead.company || "",
    service: lead.service,
    budget: lead.budget || "Not Specified",
    timeline: lead.timeline || "Flexible",
    message: lead.message,
    status: lead.status,
    priority: lead.priority,
    assigned_to: lead.assignedTo || "Olamide (Lead Partner)",
    notes: lead.notes || [],
    next_follow_up: lead.nextFollowUp || "",
    source: lead.source || "Website Contact Form",
    created_at: lead.createdAt,
    updated_at: lead.updatedAt,
  };
}

// Helper to safely fetch local storage leads
function getLocalLeads(): CRMLead[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse CRM leads store:", e);
    return [];
  }
}

// Helper to safely write local storage leads
function saveLocalLeads(leads: CRMLead[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

// ============================================================================
// TABLE 1: `public.crm_leads` (Supabase PostgreSQL + Local Cache)
// ============================================================================

export async function fetchCRMLeads(): Promise<CRMLead[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/crm_leads?select=*&order=created_at.desc`,
      {
        method: "GET",
        headers: supabaseHeaders(),
        cache: "no-store",
      }
    );
    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows)) {
        const remoteLeads = rows.map(mapRowToLead);
        // If local has any unsynced leads not yet in Supabase, push them up
        const localLeads = getLocalLeads();
        const remoteIds = new Set(remoteLeads.map((r) => r.id));
        const unsynced = localLeads.filter((l) => !remoteIds.has(l.id));
        if (unsynced.length > 0) {
          await fetch(`${SUPABASE_URL}/rest/v1/crm_leads?on_conflict=id`, {
            method: "POST",
            headers: supabaseHeaders({ Prefer: "resolution=merge-duplicates" }),
            body: JSON.stringify(unsynced.map(mapLeadToRow)),
          });
          const merged = [...unsynced, ...remoteLeads];
          saveLocalLeads(merged);
          return merged;
        }
        saveLocalLeads(remoteLeads);
        return remoteLeads;
      }
    }
  } catch (e) {
    console.warn("Supabase crm_leads fetch fallback to local cache:", e);
  }
  return getLocalLeads();
}

// ============================================================================
// CONTACT FINGERPRINT & ANTI-DUPLICATE ENGINE
// ============================================================================

export function normalizePhoneKey(raw?: string): string {
  if (!raw) return "";
  const digits = raw.replace(/[^0-9]/g, "");
  if (digits.length < 7) return "";
  // Normalize Nigerian 080/081/090/070 (11 digits) -> 234...
  if (digits.length === 11 && digits.startsWith("0")) {
    return "234" + digits.slice(1);
  }
  return digits;
}

export function normalizeEmailKey(raw?: string): string {
  if (!raw) return "";
  const clean = raw.trim().toLowerCase();
  if (!clean.includes("@")) return "";
  return clean;
}

export function normalizeBusinessKey(raw?: string): string {
  if (!raw) return "";
  return raw
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

export async function createCRMLead(
  data: Omit<CRMLead, "id" | "status" | "priority" | "notes" | "createdAt" | "updatedAt" | "source"> & {
    priority?: LeadPriority;
    status?: LeadStatus;
    source?: string;
  }
): Promise<CRMLead> {
  const now = new Date().toISOString();
  const existing = getLocalLeads();

  const phoneKey = normalizePhoneKey(data.phone);
  const emailKey = normalizeEmailKey(data.email);
  const nameKey = normalizeBusinessKey(data.company || data.name);

  // Check if this contact/business already exists in CRM to prevent duplicates
  const duplicateIndex = existing.findIndex((lead) => {
    const lPhone = normalizePhoneKey(lead.phone);
    const lEmail = normalizeEmailKey(lead.email);
    const lName = normalizeBusinessKey(lead.company || lead.name);

    if (phoneKey && lPhone && phoneKey === lPhone) return true;
    if (
      emailKey &&
      lEmail &&
      !emailKey.startsWith("contact@") &&
      emailKey === lEmail
    ) {
      return true;
    }
    if (nameKey && nameKey.length >= 4 && lName === nameKey) return true;
    return false;
  });

  if (duplicateIndex !== -1) {
    // Enrich existing CRM lead instead of creating a duplicate
    const current = existing[duplicateIndex];
    const enriched: CRMLead = {
      ...current,
      phone: current.phone || data.phone || "",
      email:
        !current.email || current.email.startsWith("contact@")
          ? data.email || current.email
          : current.email,
      company: current.company || data.company || "",
      updatedAt: now,
    };
    existing[duplicateIndex] = enriched;
    saveLocalLeads(existing);

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/crm_leads?on_conflict=id`, {
        method: "POST",
        headers: supabaseHeaders({ Prefer: "resolution=merge-duplicates" }),
        body: JSON.stringify(mapLeadToRow(enriched)),
      });
    } catch (e) {
      console.warn("Supabase crm_leads enrich fallback:", e);
    }

    return enriched;
  }

  const newId = `LD-2026-${Math.floor(100 + Math.random() * 900)}-${Date.now()
    .toString()
    .slice(-3)}`;

  const newLead: CRMLead = {
    id: newId,
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    company: data.company || "",
    service: data.service,
    budget: data.budget || "Not Specified",
    timeline: data.timeline || "Flexible",
    message: data.message,
    status: data.status || "new",
    priority: data.priority || "high",
    assignedTo: data.assignedTo || "Olamide (Lead Partner)",
    notes: [],
    nextFollowUp: data.nextFollowUp || "",
    source: data.source || "Website Contact Form",
    createdAt: now,
    updatedAt: now,
  };

  // Save to LocalStorage immediately
  const updated = [newLead, ...existing];
  saveLocalLeads(updated);

  // Write to Supabase `public.crm_leads`
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/crm_leads?on_conflict=id`, {
      method: "POST",
      headers: supabaseHeaders({ Prefer: "resolution=merge-duplicates" }),
      body: JSON.stringify(mapLeadToRow(newLead)),
    });
  } catch (e) {
    console.warn("Supabase crm_leads insert fallback:", e);
  }

  return newLead;
}

export async function updateLeadStatus(id: string, newStatus: LeadStatus): Promise<void> {
  const now = new Date().toISOString();
  const leads = getLocalLeads();
  const target = leads.find((l) => l.id === id);
  if (target) {
    target.status = newStatus;
    target.updatedAt = now;
    saveLocalLeads(leads);
  }

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/crm_leads?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: supabaseHeaders(),
      body: JSON.stringify({ status: newStatus, updated_at: now }),
    });
  } catch (e) {
    console.warn("Supabase update status fallback:", e);
  }
}

export async function addLeadNote(
  id: string,
  noteText: string,
  author: string = "Staff"
): Promise<void> {
  const now = new Date().toISOString();
  const leads = getLocalLeads();
  const target = leads.find((l) => l.id === id);
  const note: LeadNote = {
    id: `note-${Date.now()}`,
    author,
    text: noteText,
    createdAt: now,
  };

  let updatedNotes: LeadNote[] = [note];
  if (target) {
    target.notes.unshift(note);
    target.updatedAt = now;
    updatedNotes = target.notes;
    saveLocalLeads(leads);
  }

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/crm_leads?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: supabaseHeaders(),
      body: JSON.stringify({
        notes: updatedNotes,
        updated_at: now,
      }),
    });
  } catch (e) {
    console.warn("Supabase add note fallback:", e);
  }
}

export async function updateLeadDetails(
  id: string,
  updates: Partial<Pick<CRMLead, "assignedTo" | "nextFollowUp" | "priority" | "budget">>
): Promise<void> {
  const now = new Date().toISOString();
  const leads = getLocalLeads();
  const target = leads.find((l) => l.id === id);
  if (target) {
    Object.assign(target, updates, { updatedAt: now });
    saveLocalLeads(leads);
  }

  const dbPayload: Record<string, any> = { updated_at: now };
  if (updates.assignedTo !== undefined) dbPayload.assigned_to = updates.assignedTo;
  if (updates.nextFollowUp !== undefined) dbPayload.next_follow_up = updates.nextFollowUp;
  if (updates.priority !== undefined) dbPayload.priority = updates.priority;
  if (updates.budget !== undefined) dbPayload.budget = updates.budget;

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/crm_leads?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: supabaseHeaders(),
      body: JSON.stringify(dbPayload),
    });
  } catch (e) {
    console.warn("Supabase update details fallback:", e);
  }
}

export async function deleteCRMLead(id: string): Promise<void> {
  const leads = getLocalLeads().filter((l) => l.id !== id);
  saveLocalLeads(leads);

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/crm_leads?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: supabaseHeaders(),
    });
  } catch (e) {
    console.warn("Supabase delete fallback:", e);
  }
}

// Export CSV
export function exportLeadsToCSV(leads: CRMLead[]): void {
  const headers = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Company",
    "Service",
    "Budget",
    "Timeline",
    "Status",
    "Priority",
    "AssignedTo",
    "Source",
    "CreatedAt",
  ];
  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${(l.name || "").replace(/"/g, '""')}"`,
    `"${(l.email || "").replace(/"/g, '""')}"`,
    `"${(l.phone || "").replace(/"/g, '""')}"`,
    `"${(l.company || "").replace(/"/g, '""')}"`,
    `"${(l.service || "").replace(/"/g, '""')}"`,
    `"${(l.budget || "").replace(/"/g, '""')}"`,
    `"${(l.timeline || "").replace(/"/g, '""')}"`,
    `"${l.status}"`,
    `"${l.priority}"`,
    `"${(l.assignedTo || "").replace(/"/g, '""')}"`,
    `"${(l.source || "").replace(/"/g, '""')}"`,
    `"${new Date(l.createdAt).toLocaleDateString()}"`,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `thoram_crm_leads_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ============================================================================
// TABLE 2: `public.scraped_prospects` (Supabase PostgreSQL + Local Cache)
// ============================================================================

export interface ScrapedProspect {
  id: string;
  businessName: string;
  category: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  address?: string;
  techGap: string;
  recommendedService: string;
  recommendedProduct: string;
  demoUrl: string;
  sourcePage: string;
  hasMobileApp?: boolean;
  websiteStatus?: "no_website" | "social_only" | "needs_revamp";
  injected?: boolean;
  outreachSent?: boolean;
  scrapedAt?: string;
}

const PROSPECTS_STORAGE_KEY = "thoram_scraped_prospects_v1";

function mapRowToProspect(row: any): ScrapedProspect {
  return {
    id: row.id,
    businessName: row.business_name || "",
    category: row.category || "",
    location: row.location || "",
    phone: row.phone || "",
    email: row.email || "",
    website: row.website || "",
    address: row.address || "",
    techGap: row.tech_gap || "",
    recommendedService: row.recommended_service || "",
    recommendedProduct: row.recommended_product || "",
    demoUrl: row.demo_url || "",
    sourcePage: row.source_page || "",
    hasMobileApp: Boolean(row.has_mobile_app),
    websiteStatus:
      row.website_status || (row.website ? "needs_revamp" : "no_website"),
    injected: Boolean(row.injected),
    outreachSent: Boolean(row.outreach_sent),
    scrapedAt: row.scraped_at || new Date().toISOString(),
  };
}

function mapProspectToRow(p: ScrapedProspect) {
  return {
    id: p.id,
    business_name: p.businessName,
    category: p.category,
    location: p.location,
    phone: p.phone || "",
    email: p.email || "",
    website: p.website || "",
    address: p.address || "",
    tech_gap: p.techGap || "",
    recommended_service: p.recommendedService || "",
    recommended_product: p.recommendedProduct || "",
    demo_url: p.demoUrl || "",
    source_page: p.sourcePage || "",
    has_mobile_app: Boolean(p.hasMobileApp),
    website_status: p.websiteStatus || (p.website ? "needs_revamp" : "no_website"),
    injected: Boolean(p.injected),
    outreach_sent: Boolean(p.outreachSent),
    scraped_at: p.scrapedAt || new Date().toISOString(),
  };
}

export function getSavedScrapedProspects(): ScrapedProspect[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(PROSPECTS_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function fetchScrapedProspectsFromDB(): Promise<ScrapedProspect[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/scraped_prospects?select=*&order=scraped_at.desc`,
      {
        method: "GET",
        headers: supabaseHeaders(),
        cache: "no-store",
      }
    );
    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows)) {
        const remote = rows.map(mapRowToProspect);
        if (typeof window !== "undefined") {
          localStorage.setItem(PROSPECTS_STORAGE_KEY, JSON.stringify(remote));
        }
        return remote;
      }
    }
  } catch (e) {
    console.warn("Supabase scraped_prospects fetch fallback:", e);
  }
  return getSavedScrapedProspects();
}

export async function saveScrapedProspects(prospects: ScrapedProspect[]): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem(PROSPECTS_STORAGE_KEY, JSON.stringify(prospects));
  }
  try {
    if (prospects.length === 0) {
      // Clear table in Supabase when user clicks Clear Table
      await fetch(`${SUPABASE_URL}/rest/v1/scraped_prospects?id=neq.__none__`, {
        method: "DELETE",
        headers: supabaseHeaders(),
      });
      return;
    }
    await fetch(`${SUPABASE_URL}/rest/v1/scraped_prospects?on_conflict=id`, {
      method: "POST",
      headers: supabaseHeaders({ Prefer: "resolution=merge-duplicates" }),
      body: JSON.stringify(prospects.map(mapProspectToRow)),
    });
  } catch (e) {
    console.warn("Supabase scraped_prospects upsert fallback:", e);
  }
}

export async function deleteScrapedProspectFromDB(id: string): Promise<void> {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/scraped_prospects?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: supabaseHeaders(),
    });
  } catch {
    // Ignore fallback error
  }
}

const SHARED_PLATFORM_DOMAINS = [
  "instagram.com",
  "facebook.com",
  "fb.com",
  "linkedin.com",
  "twitter.com",
  "x.com",
  "tiktok.com",
  "youtube.com",
  "wa.me",
  "whatsapp.com",
  "linktr.ee",
  "jiji.ng",
  "propertypro.ng",
  "privateproperty.com.ng",
  "vconnect.com",
  "businesslist.com.ng",
  "finelib.com",
  "ngex.com",
];

function extractStandaloneDomainKey(url?: string): string {
  if (!url) return "";
  const clean = url
    .toLowerCase()
    .replace(/^https?:\/\/(www\.)?/, "")
    .split("/")[0]
    .trim();
  if (!clean || SHARED_PLATFORM_DOMAINS.some((d) => clean.includes(d))) {
    return "";
  }
  return clean;
}

export function deduplicateAndMergeProspects(
  incoming: ScrapedProspect[],
  existing: ScrapedProspect[]
): {
  merged: ScrapedProspect[];
  addedCount: number;
  duplicateCount: number;
  enrichedCount: number;
  removedIds: string[];
} {
  const crmLeads = getLocalLeads();
  const crmPhones = new Set(crmLeads.map((l) => normalizePhoneKey(l.phone)).filter(Boolean));
  const crmEmails = new Set(
    crmLeads
      .map((l) => normalizeEmailKey(l.email))
      .filter((e) => e && !e.startsWith("contact@"))
  );
  const crmNames = new Set(
    crmLeads
      .map((l) => normalizeBusinessKey(l.company || l.name))
      .filter((n) => n.length >= 4)
  );

  const isAlreadyInCRM = (p: ScrapedProspect): boolean => {
    if (p.injected) return true;
    const pPhone = normalizePhoneKey(p.phone);
    const pEmail = normalizeEmailKey(p.email);
    const pName = normalizeBusinessKey(p.businessName);
    if (pPhone && crmPhones.has(pPhone)) return true;
    if (pEmail && crmEmails.has(pEmail)) return true;
    if (pName && pName.length >= 4 && crmNames.has(pName)) return true;
    return false;
  };

  const result: ScrapedProspect[] = [];
  const removedIds: string[] = [];
  let addedCount = 0;
  let duplicateCount = 0;
  let enrichedCount = 0;

  // First, deduplicate existing rows themselves
  for (const item of existing) {
    const stamped = { ...item, injected: isAlreadyInCRM(item) };
    const pPhone = normalizePhoneKey(stamped.phone);
    const pEmail = normalizeEmailKey(stamped.email);
    const pDomain = extractStandaloneDomainKey(stamped.website);
    const pName = normalizeBusinessKey(stamped.businessName);

    const matchIdx = result.findIndex((r) => {
      const rPhone = normalizePhoneKey(r.phone);
      const rEmail = normalizeEmailKey(r.email);
      const rDomain = extractStandaloneDomainKey(r.website);
      const rName = normalizeBusinessKey(r.businessName);

      if (pPhone && rPhone && pPhone === rPhone) return true;
      if (pEmail && rEmail && pEmail === rEmail) return true;
      if (pDomain && rDomain && pDomain === rDomain) return true;
      if (pName && pName.length >= 4 && rName === pName) return true;
      return false;
    });

    if (matchIdx === -1) {
      result.push(stamped);
    } else {
      duplicateCount++;
      removedIds.push(stamped.id);
      const curr = result[matchIdx];
      result[matchIdx] = {
        ...curr,
        phone: curr.phone || stamped.phone,
        email: curr.email || stamped.email,
        website: curr.website || stamped.website,
        hasMobileApp: Boolean(curr.hasMobileApp || stamped.hasMobileApp),
        injected: Boolean(curr.injected || stamped.injected),
        outreachSent: Boolean(curr.outreachSent || stamped.outreachSent),
      };
    }
  }

  // Next, merge incoming scraped prospects against deduplicated list
  const newlyAdded: ScrapedProspect[] = [];
  for (const rawItem of incoming) {
    const item = { ...rawItem, injected: isAlreadyInCRM(rawItem) };
    const pPhone = normalizePhoneKey(item.phone);
    const pEmail = normalizeEmailKey(item.email);
    const pDomain = extractStandaloneDomainKey(item.website);
    const pName = normalizeBusinessKey(item.businessName);

    const pool = [...newlyAdded, ...result];
    const match = pool.find((r) => {
      const rPhone = normalizePhoneKey(r.phone);
      const rEmail = normalizeEmailKey(r.email);
      const rDomain = extractStandaloneDomainKey(r.website);
      const rName = normalizeBusinessKey(r.businessName);

      if (pPhone && rPhone && pPhone === rPhone) return true;
      if (pEmail && rEmail && pEmail === rEmail) return true;
      if (pDomain && rDomain && pDomain === rDomain) return true;
      if (pName && pName.length >= 4 && rName === pName) return true;
      return false;
    });

    if (!match) {
      newlyAdded.push(item);
      addedCount++;
    } else {
      duplicateCount++;
      const hadNewInfo =
        (!match.phone && Boolean(item.phone)) ||
        (!match.email && Boolean(item.email)) ||
        (!match.website && Boolean(item.website));
      if (hadNewInfo) {
        enrichedCount++;
        match.phone = match.phone || item.phone;
        match.email = match.email || item.email;
        match.website = match.website || item.website;
        match.hasMobileApp = Boolean(match.hasMobileApp || item.hasMobileApp);
        match.injected = Boolean(match.injected || item.injected);
      }
    }
  }

  return {
    merged: [...newlyAdded, ...result],
    addedCount,
    duplicateCount,
    enrichedCount,
    removedIds,
  };
}

export function exportProspectsToCSV(prospects: ScrapedProspect[]): void {
  const headers = [
    "ID",
    "BusinessName",
    "Category",
    "Location",
    "Phone_WhatsApp",
    "Email",
    "Website",
    "WebsiteStatus",
    "HasMobileAPK",
    "DiagnosedTechGap",
    "RecommendedProduct",
    "DemoURL",
    "Source",
    "InjectedToCRM",
    "ScrapedAt",
  ];
  const rows = prospects.map((p) => [
    `"${p.id}"`,
    `"${(p.businessName || "").replace(/"/g, '""')}"`,
    `"${(p.category || "").replace(/"/g, '""')}"`,
    `"${(p.location || "").replace(/"/g, '""')}"`,
    `"${(p.phone || "").replace(/"/g, '""')}"`,
    `"${(p.email || "").replace(/"/g, '""')}"`,
    `"${(p.website || "").replace(/"/g, '""')}"`,
    `"${p.websiteStatus || (p.website ? "needs_revamp" : "no_website")}"`,
    `"${p.hasMobileApp ? "YES" : "NO"}"`,
    `"${(p.techGap || "").replace(/"/g, '""')}"`,
    `"${(p.recommendedProduct || "").replace(/"/g, '""')}"`,
    `"${(p.demoUrl || "").replace(/"/g, '""')}"`,
    `"${(p.sourcePage || "").replace(/"/g, '""')}"`,
    `"${p.injected ? "YES" : "NO"}"`,
    `"${p.scrapedAt ? new Date(p.scrapedAt).toLocaleString() : new Date().toLocaleString()}"`,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `thoram_scraped_prospects_${new Date().toISOString().split("T")[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ============================================================================
// TABLE 3: `public.scrape_campaigns` (Supabase PostgreSQL + Local Cache)
// ============================================================================

export interface ScrapeCampaignLog {
  id: string;
  industry: string;
  location: string;
  mode: string;
  pagesScanned: number;
  leadsFound: number;
  phonesFound: number;
  emailsFound: number;
  createdAt: string;
}

const CAMPAIGNS_STORAGE_KEY = "thoram_scrape_campaigns_v1";

function mapRowToCampaign(row: any): ScrapeCampaignLog {
  return {
    id: row.id,
    industry: row.industry || "",
    location: row.location || "",
    mode: row.mode || "",
    pagesScanned: Number(row.pages_scanned || 1),
    leadsFound: Number(row.leads_found || 0),
    phonesFound: Number(row.phones_found || 0),
    emailsFound: Number(row.emails_found || 0),
    createdAt: row.created_at || new Date().toISOString(),
  };
}

export function getScrapeCampaignLogs(): ScrapeCampaignLog[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function fetchScrapeCampaignsFromDB(): Promise<ScrapeCampaignLog[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/scrape_campaigns?select=*&order=created_at.desc`,
      {
        method: "GET",
        headers: supabaseHeaders(),
        cache: "no-store",
      }
    );
    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows)) {
        const remote = rows.map(mapRowToCampaign);
        if (typeof window !== "undefined") {
          localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(remote));
        }
        return remote;
      }
    }
  } catch (e) {
    console.warn("Supabase scrape_campaigns fetch fallback:", e);
  }
  return getScrapeCampaignLogs();
}

export async function addScrapeCampaignLog(
  entry: Omit<ScrapeCampaignLog, "id" | "createdAt">
): Promise<ScrapeCampaignLog> {
  const newLog: ScrapeCampaignLog = {
    ...entry,
    id: `CMP-${Date.now().toString().slice(-5)}`,
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    const existing = getScrapeCampaignLogs();
    localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify([newLog, ...existing.slice(0, 49)]));
  }

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/scrape_campaigns?on_conflict=id`, {
      method: "POST",
      headers: supabaseHeaders({ Prefer: "resolution=merge-duplicates" }),
      body: JSON.stringify({
        id: newLog.id,
        industry: newLog.industry,
        location: newLog.location,
        mode: newLog.mode,
        pages_scanned: newLog.pagesScanned,
        leads_found: newLog.leadsFound,
        phones_found: newLog.phonesFound,
        emails_found: newLog.emailsFound,
        created_at: newLog.createdAt,
      }),
    });
  } catch {
    // Fallback to localStorage table silently
  }

  return newLog;
}

export async function clearScrapeCampaignLogs(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CAMPAIGNS_STORAGE_KEY);
  }
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/scrape_campaigns?id=neq.__none__`, {
      method: "DELETE",
      headers: supabaseHeaders(),
    });
  } catch {
    // Ignore fallback error
  }
}


