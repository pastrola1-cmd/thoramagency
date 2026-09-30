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

const STORAGE_KEY = "thoram_crm_leads_v1";

const INITIAL_DEMO_LEADS: CRMLead[] = [
  {
    id: "LD-2026-001",
    name: "Dr. Kunle Adeleke",
    email: "k.adeleke@lagoshealth.ng",
    phone: "+2348035550192",
    company: "Lagoon Specialist Hospitals",
    service: "Business Systems & Custom Software",
    budget: "₦10M - ₦25M",
    timeline: "1-2 Months",
    message: "We need a unified multi-branch patient electronic records and automated billing management portal connecting 4 clinic locations across Lagos.",
    status: "proposal_sent",
    priority: "urgent",
    assignedTo: "Olamide (Lead Partner)",
    notes: [
      {
        id: "note-1",
        author: "Olamide",
        text: "Had discovery call with Chief Medical Director. Architecture draft sent for review.",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
    ],
    nextFollowUp: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    source: "Website Contact Form",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "LD-2026-002",
    name: "Tariq Mansoor",
    email: "tariq@vertexcapital.ae",
    phone: "+971501234567",
    company: "Vertex Asset Management (Dubai)",
    service: "Customer Platforms & SaaS",
    budget: "$30,000 - $50,000",
    timeline: "Immediate (< 2 weeks)",
    message: "Seeking to build an institutional LP investor portal with automated capital call notifications and Paystack / Stripe multi-currency rails.",
    status: "negotiation",
    priority: "urgent",
    assignedTo: "Engineering Team",
    notes: [
      {
        id: "note-2",
        author: "Staff",
        text: "Contract terms agreed. Awaiting final board signature on Monday.",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
    nextFollowUp: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    source: "Direct Referral",
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "LD-2026-003",
    name: "Amina Bello",
    email: "amina@kadirischools.com",
    phone: "+2349021118899",
    company: "Kadiri Academy Network",
    service: "Business Systems & Custom Software",
    budget: "₦5M - ₦10M",
    timeline: "1-2 Months",
    message: "Inspired by your EduThoramOS case study. We have 2 campuses and want to eliminate manual paper report cards and automate fee receipts.",
    status: "new",
    priority: "high",
    assignedTo: "Unassigned",
    notes: [],
    source: "EduThoramOS Case Study",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "LD-2026-004",
    name: "David Sterling",
    email: "david@propwealth.co.uk",
    phone: "+447700900123",
    company: "Sterling Realty London",
    service: "Automation & AI Workflows",
    budget: "£15,000 - £25,000",
    timeline: "Quarterly",
    message: "Need automated WhatsApp lead distribution webhooks connected to our custom property CRM, similar to your Nissie Shelters system.",
    status: "contacted",
    priority: "medium",
    assignedTo: "Olamide (Lead Partner)",
    notes: [
      {
        id: "note-3",
        author: "Olamide",
        text: "Sent initial tech stack overview and WhatsApp Cloud API specs.",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
    nextFollowUp: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
    source: "Nissie Shelters Case Study",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "LD-2026-005",
    name: "Emeka Nwosu",
    email: "emeka@nwosugroup.com",
    phone: "+2348109988776",
    company: "Nwosu Logistics & Freight",
    service: "Mobile App Development",
    budget: "₦8M - ₦15M",
    timeline: "1-2 Months",
    message: "Driver tracking and consignment dispatching app with offline sync capability.",
    status: "won",
    priority: "high",
    assignedTo: "Engineering Team",
    notes: [
      {
        id: "note-4",
        author: "Olamide",
        text: "Kickoff payment confirmed via Paystack. Sprints starting this Friday.",
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
    ],
    source: "Website Contact Form",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

// Helper to safely fetch local storage leads
function getLocalLeads(): CRMLead[] {
  if (typeof window === "undefined") return INITIAL_DEMO_LEADS;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
    return INITIAL_DEMO_LEADS;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse CRM leads store:", e);
    return INITIAL_DEMO_LEADS;
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
