export const WHATSAPP_NUMBER = "2349067914511";

export interface LeadPayload {
  name: string;
  email: string;
  company?: string;
  interest: string;
  message: string;
}

export function buildLeadMessage(p: LeadPayload): string {
  return [
    "NEW PROJECT INQUIRY — Thoram Group",
    "",
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    p.company ? `Company: ${p.company}` : "",
    `Interest: ${p.interest}`,
    "",
    "Details:",
    p.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export function submitLeadViaWhatsApp(p: LeadPayload): void {
  const text = encodeURIComponent(buildLeadMessage(p));
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
}

export function mailtoFallback(p: LeadPayload): string {
  const subject = encodeURIComponent(`Project inquiry — ${p.name} (${p.interest})`);
  const body = encodeURIComponent(buildLeadMessage(p));
  return `mailto:hello@thoramgroup.com?subject=${subject}&body=${body}`;
}