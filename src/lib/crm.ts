import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

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

// Get all leads (Firestore or Local fallback)
export async function fetchCRMLeads(): Promise<CRMLead[]> {
  try {
    if (db && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.startsWith("mock-")) {
      const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const firestoreLeads: CRMLead[] = [];
        snapshot.forEach((docSnap) => {
          firestoreLeads.push({ id: docSnap.id, ...(docSnap.data() as any) });
        });
        saveLocalLeads(firestoreLeads);
        return firestoreLeads;
      }
    }
  } catch (e) {
    console.warn("Firestore fetch fallback to persistent local store:", e);
  }
  return getLocalLeads();
}

// Create new lead
export async function createCRMLead(
  data: Omit<CRMLead, "id" | "status" | "priority" | "notes" | "createdAt" | "updatedAt" | "source"> & {
    priority?: LeadPriority;
    status?: LeadStatus;
    source?: string;
  }
): Promise<CRMLead> {
  const newId = `LD-2026-${Math.floor(100 + Math.random() * 900)}`;
  const now = new Date().toISOString();

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
    assignedTo: data.assignedTo || "Unassigned",
    notes: [],
    nextFollowUp: data.nextFollowUp || "",
    source: data.source || "Website Contact Form",
    createdAt: now,
    updatedAt: now,
  };

  // Try Firestore
  try {
    if (db && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.startsWith("mock-")) {
      await addDoc(collection(db, "leads"), newLead);
    }
  } catch (e) {
    console.warn("Firestore lead write fallback to local store:", e);
  }

  // Save to LocalStorage
  const existing = getLocalLeads();
  const updated = [newLead, ...existing];
  saveLocalLeads(updated);

  return newLead;
}

// Update Lead Status
export async function updateLeadStatus(id: string, newStatus: LeadStatus): Promise<void> {
  const leads = getLocalLeads();
  const target = leads.find((l) => l.id === id);
  if (target) {
    target.status = newStatus;
    target.updatedAt = new Date().toISOString();
    saveLocalLeads(leads);
  }

  try {
    if (db && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.startsWith("mock-")) {
      const docRef = doc(db, "leads", id);
      await updateDoc(docRef, { status: newStatus, updatedAt: new Date().toISOString() });
    }
  } catch (e) {
    console.warn("Firestore update status fallback:", e);
  }
}

// Add note to lead
export async function addLeadNote(id: string, noteText: string, author: string = "Staff"): Promise<void> {
  const leads = getLocalLeads();
  const target = leads.find((l) => l.id === id);
  if (target) {
    const note: LeadNote = {
      id: `note-${Date.now()}`,
      author,
      text: noteText,
      createdAt: new Date().toISOString(),
    };
    target.notes.unshift(note);
    target.updatedAt = new Date().toISOString();
    saveLocalLeads(leads);
  }

  try {
    if (db && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.startsWith("mock-")) {
      const docRef = doc(db, "leads", id);
      await updateDoc(docRef, {
        notes: target?.notes || [],
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (e) {
    console.warn("Firestore add note fallback:", e);
  }
}

// Update Next Follow Up & Assignee
export async function updateLeadDetails(
  id: string,
  updates: Partial<Pick<CRMLead, "assignedTo" | "nextFollowUp" | "priority" | "budget">>
): Promise<void> {
  const leads = getLocalLeads();
  const target = leads.find((l) => l.id === id);
  if (target) {
    Object.assign(target, updates, { updatedAt: new Date().toISOString() });
    saveLocalLeads(leads);
  }

  try {
    if (db && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.startsWith("mock-")) {
      const docRef = doc(db, "leads", id);
      await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
    }
  } catch (e) {
    console.warn("Firestore update details fallback:", e);
  }
}

// Delete Lead
export async function deleteCRMLead(id: string): Promise<void> {
  const leads = getLocalLeads().filter((l) => l.id !== id);
  saveLocalLeads(leads);

  try {
    if (db && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.startsWith("mock-")) {
      await deleteDoc(doc(db, "leads", id));
    }
  } catch (e) {
    console.warn("Firestore delete fallback:", e);
  }
}

// Export CSV
export function exportLeadsToCSV(leads: CRMLead[]): void {
  const headers = ["ID", "Name", "Email", "Phone", "Company", "Service", "Budget", "Timeline", "Status", "Priority", "AssignedTo", "CreatedAt"];
  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${l.name}"`,
    `"${l.email}"`,
    `"${l.phone || ""}"`,
    `"${l.company || ""}"`,
    `"${l.service}"`,
    `"${l.budget || ""}"`,
    `"${l.timeline || ""}"`,
    `"${l.status}"`,
    `"${l.priority}"`,
    `"${l.assignedTo || ""}"`,
    `"${new Date(l.createdAt).toLocaleDateString()}"`,
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `thoram_leads_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
