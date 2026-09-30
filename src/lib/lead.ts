import { createCRMLead } from "./crm";

export const WHATSAPP_NUMBER = "2349067914511";

export interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest: string;
  budget?: string;
  timeline?: string;
  message: string;
  source?: string;
}

export function buildLeadMessage(p: LeadPayload): string {
  return [
    "🔥 NEW PROJECT INQUIRY — Thoram Group",
    "──────────────────────────",
    `👤 Client: ${p.name}`,
    `📧 Email: ${p.email}`,
    p.phone ? `📞 Phone / WhatsApp: ${p.phone}` : "",
    p.company ? `🏢 Company: ${p.company}` : "",
    `⚡ Service: ${p.interest}`,
    p.budget ? `💰 Target Budget: ${p.budget}` : "",
    p.timeline ? `⏱️ Timeline: ${p.timeline}` : "",
    "",
    "📋 Project Brief:",
    p.message,
    "──────────────────────────",
    "Sent via thoramgroup.com",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function submitLeadAndDispatch(p: LeadPayload, openWhatsApp: boolean = true): Promise<void> {
  // 1. Save to Internal CRM Backend
  try {
    await createCRMLead({
      name: p.name,
      email: p.email,
      phone: p.phone,
      company: p.company,
      service: p.interest,
      budget: p.budget,
      timeline: p.timeline,
      message: p.message,
      source: p.source || "Website Contact Form",
    });
  } catch (e) {
    console.error("CRM auto-save failed:", e);
  }

  // 2. Open WhatsApp for instant 1-tap direct chat
  if (openWhatsApp) {
    const text = encodeURIComponent(buildLeadMessage(p));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
  }
}

export function submitLeadViaWhatsApp(p: LeadPayload): void {
  submitLeadAndDispatch(p, true);
}

export function mailtoFallback(p: LeadPayload): string {
  const subject = encodeURIComponent(`Project inquiry — ${p.name} (${p.interest})`);
  const body = encodeURIComponent(buildLeadMessage(p));
  return `mailto:hello@thoramgroup.com?subject=${subject}&body=${body}`;
}
