"use client";

import { useState } from "react";
import { CRMLead, createCRMLead } from "@/lib/crm";
import {
  Search,
  Globe,
  MapPin,
  Sparkles,
  Plus,
  CheckCircle2,
  MessageCircle,
  Mail,
  ExternalLink,
  Loader2,
  Layers,
  Key,
  FileText,
  Copy,
  Check,
  ArrowRight,
  Building2,
  Phone,
  Zap,
  AlertTriangle,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  injected?: boolean;
}

interface IndustryPreset {
  id: string;
  label: string;
  keywords: string;
  osmTag: string;
  service: string;
  productName: string;
  demoUrl: string;
  defaultGap: string;
  pitchHook: string;
}

const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    id: "schools",
    label: "🎓 Private Schools & Academies",
    keywords: "Private Secondary School Academy College",
    osmTag: "school",
    service: "Business Systems & Custom Software",
    productName: "EduThoramOS School Portal",
    demoUrl: "https://eduthoramos.web.app",
    defaultGap: "Manual fee receipts & spreadsheet report cards — High fit for EduThoramOS",
    pitchHook:
      "we engineered EduThoramOS (eduthoramos.web.app), a unified school portal that cuts end-of-term report card computation from 2 weeks to 30 seconds and automates Paystack tuition receipts + parent WhatsApp alerts.",
  },
  {
    id: "realestate",
    label: "🏠 Real Estate Developers & Agencies",
    keywords: "Real Estate Agency Property Developer Homes",
    osmTag: "estate_agent",
    service: "Customer Platforms & SaaS",
    productName: "ScaleWealth / Nissie Real Estate CRM",
    demoUrl: "https://thoramgroup.com/case-studies#scalewealth-crm",
    defaultGap: "Unautomated buyer inquiries & slow WhatsApp follow-up — High fit for Property CRM",
    pitchHook:
      "we built the property portal and automated WhatsApp lead CRM for ScaleWealth Estate & Nissie Ideal Shelters — routing buyer inquiries to sales reps in under 2 seconds and tracking ₦800M+ in deal pipelines.",
  },
  {
    id: "studyabroad",
    label: "✈️ Study Abroad & Travel Agencies",
    keywords: "Study Abroad Education Consultant Visa Travel Agency",
    osmTag: "travel_agency",
    service: "Business Systems & Custom Software",
    productName: "D-Wealth Admissions & Agency CRM",
    demoUrl: "https://dgncrm.com",
    defaultGap: "Tracking student applications on spreadsheets — High fit for Admissions CRM",
    pitchHook:
      "we engineered D-Wealth CRM (dgncrm.com), an international student admissions & counselor pipeline command system that tracks 500+ visa/university applications and counselor performance in real time.",
  },
  {
    id: "healthcare",
    label: "🏥 Hospitals, Clinics & Diagnostics",
    keywords: "Specialist Hospital Medical Clinic Diagnostics Center",
    osmTag: "hospital",
    service: "Business Systems & Custom Software",
    productName: "Patient Booking, EMR & Billing System",
    demoUrl: "https://thoramgroup.com/case-studies",
    defaultGap: "No automated patient booking or WhatsApp appointment reminders",
    pitchHook:
      "we build custom hospital & clinic patient portals with automated WhatsApp appointment reminders, digital medical records, and zero-leakage billing reconciliation.",
  },
  {
    id: "hospitality",
    label: "🏨 Hotels, Short-Lets & Apartments",
    keywords: "Boutique Hotel Luxury Shortlet Serviced Apartments",
    osmTag: "hotel",
    service: "Customer Platforms & SaaS",
    productName: "Direct Booking Engine & AI WhatsApp Concierge",
    demoUrl: "https://thoramgroup.com/case-studies",
    defaultGap: "Relying on manual WhatsApp DMs or paying 15% OTA commissions",
    pitchHook:
      "we build direct booking engines with instant Paystack room reservation and 24/7 AI WhatsApp guest reception so you keep 100% of your booking revenue.",
  },
  {
    id: "ministry",
    label: "⛪ Churches & Ministries",
    keywords: "Church Ministry Christian Center",
    osmTag: "place_of_worship",
    service: "Mobile App Development",
    productName: "Manna Custom Scripture & Ministry App",
    demoUrl: "https://thoramgroup.com/case-studies#manna-bible",
    defaultGap: "No dedicated mobile app for sermons, devotionals & member fellowship",
    pitchHook:
      "we engineered the Manna Bible & Community mobile platform (15,000+ study sessions) and help ministries launch their own custom mobile app for daily devotionals, sermon audio, and member fellowship.",
  },
  {
    id: "custom",
    label: "⚡ Custom Industry / Any Niche",
    keywords: "",
    osmTag: "office",
    service: "Automation & AI Workflows",
    productName: "Custom Web, Mobile App & AI Automation",
    demoUrl: "https://thoramgroup.com",
    defaultGap: "Needs modern web platform, mobile app, or AI WhatsApp workflow automation",
    pitchHook:
      "we partner with growing businesses at Thoram Group (thoramgroup.com) to engineer high-conversion web platforms, mobile apps, and 24/7 AI WhatsApp sales & operations workflows.",
  },
];

// Helper to normalize phone numbers for WhatsAppwa.me links
function formatPhoneForWhatsApp(raw: string, defaultCountryCode = "234"): string {
  const digits = raw.replace(/[^0-9+]/g, "");
  if (!digits) return "";
  if (digits.startsWith("+")) return digits.slice(1);
  if (digits.startsWith("0") && digits.length === 11) {
    return defaultCountryCode + digits.slice(1);
  }
  return digits;
}

// Extract phones and emails from raw text/HTML
function extractContactsFromText(text: string) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const phoneRegex =
    /(?:\+?234|0)[789][01]\d[\s.-]?\d{3}[\s.-]?\d{4}|\+\d{1,3}[\s.-]?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/g;

  const emails = Array.from(new Set(text.match(emailRegex) || [])).filter(
    (e) =>
      !e.endsWith(".png") &&
      !e.endsWith(".jpg") &&
      !e.endsWith(".svg") &&
      !e.endsWith(".webp") &&
      !e.includes("example.com") &&
      !e.includes("sentry.io") &&
      !e.includes("wixpress.com")
  );

  const phones = Array.from(new Set(text.match(phoneRegex) || [])).map((p) => p.trim());

  return { emails, phones };
}

export default function LeadScraper({
  onLeadsInjected,
}: {
  onLeadsInjected: (newLeads: CRMLead[]) => void;
}) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("schools");
  const [customNiche, setCustomNiche] = useState<string>("");
  const [location, setLocation] = useState<string>("Lagos, Nigeria");
  const [maxPages, setMaxPages] = useState<number>(5);
  const [scrapeMode, setScrapeMode] = useState<"live_search" | "xray_dork" | "url_spider">(
    "live_search"
  );

  // Optional API Keys (saved in localStorage so user never loses them)
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [serperKey, setSerperKey] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("thoram_serper_key") || "" : ""
  );
  const [googlePlacesKey, setGooglePlacesKey] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("thoram_gplaces_key") || "" : ""
  );

  // Scraper State
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeStatus, setScrapeStatus] = useState<string>("");
  const [prospects, setProspects] = useState<ScrapedProspect[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Bulk Paste / URL inputs
  const [rawPasteText, setRawPasteText] = useState("");
  const [urlListText, setUrlListText] = useState("");

  // Active Pitch Modal
  const [pitchProspect, setPitchProspect] = useState<ScrapedProspect | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);

  const activePreset =
    INDUSTRY_PRESETS.find((p) => p.id === selectedPresetId) || INDUSTRY_PRESETS[0];

  const effectiveQuery =
    selectedPresetId === "custom"
      ? customNiche || "Businesses"
      : customNiche
      ? `${customNiche} ${activePreset.keywords}`
      : activePreset.keywords;

  const saveApiKeys = (sKey: string, gKey: string) => {
    setSerperKey(sKey);
    setGooglePlacesKey(gKey);
    if (typeof window !== "undefined") {
      localStorage.setItem("thoram_serper_key", sKey.trim());
      localStorage.setItem("thoram_gplaces_key", gKey.trim());
    }
  };

  // Deep crawl a single website via Jina/AllOrigins to pull email & phone if missing
  async function enrichWebsiteContacts(url: string): Promise<{ email: string; phone: string }> {
    if (!url || !url.startsWith("http")) return { email: "", phone: "" };
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) return { email: "", phone: "" };
      const data = await res.json();
      const html = data.contents || "";
      const { emails, phones } = extractContactsFromText(html);
      return {
        email: emails[0] || "",
        phone: phones[0] || "",
      };
    } catch {
      return { email: "", phone: "" };
    }
  }

  // ─── ENGINE 1: LIVE DEEP SEARCH & DIRECTORY SPIDER (PAGES 1 TO 10) ───
  const handleRunLiveScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScraping(true);
    setScrapeStatus("Initializing multi-page industry discovery...");
    const found: ScrapedProspect[] = [];
    const seenNames = new Set<string>();

    try {
      // 1A. If Serper.dev API Key is provided -> Crawl Google Places & Google Search Pages 1..maxPages!
      if (serperKey.trim()) {
        for (let page = 1; page <= maxPages; page++) {
          setScrapeStatus(
            `Scanning Google Maps & Search Page ${page} of ${maxPages} for "${effectiveQuery}" in ${location}...`
          );

          // Query Serper Places API
          const placesRes = await fetch("https://google.serper.dev/places", {
            method: "POST",
            headers: {
              "X-API-KEY": serperKey.trim(),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              q: `${effectiveQuery} in ${location}`,
              page,
            }),
          });

          if (placesRes.ok) {
            const placesData = await placesRes.json();
            const places = placesData.places || [];
            for (const p of places) {
              const name = (p.title || "").trim();
              if (!name || seenNames.has(name.toLowerCase())) continue;
              seenNames.add(name.toLowerCase());

              const hasWebsite = Boolean(p.website);
              found.push({
                id: `SCR-${Date.now()}-${found.length}`,
                businessName: name,
                category: p.category || activePreset.label.replace(/^[^\s]+\s/, ""),
                location: p.address || location,
                phone: p.phoneNumber || "",
                email: "",
                website: p.website || "",
                techGap: !hasWebsite
                  ? "⚠️ NO WEBSITE — Urgent need for Web Design & WhatsApp Lead Funnel"
                  : activePreset.defaultGap,
                recommendedService: activePreset.service,
                recommendedProduct: activePreset.productName,
                demoUrl: activePreset.demoUrl,
                sourcePage: `Google Page ${page}`,
              });
            }
          }

          // Also query Serper Organic Search for emails & phone numbers on deep pages
          const searchRes = await fetch("https://google.serper.dev/search", {
            method: "POST",
            headers: {
              "X-API-KEY": serperKey.trim(),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              q: `${effectiveQuery} ${location} contact phone OR email`,
              page,
            }),
          });

          if (searchRes.ok) {
            const searchData = await searchRes.json();
            const organic = searchData.organic || [];
            for (const item of organic) {
              const title = (item.title || "").split(" - ")[0].split(" | ")[0].trim();
              if (!title || seenNames.has(title.toLowerCase())) continue;
              seenNames.add(title.toLowerCase());

              const { emails, phones } = extractContactsFromText(
                `${item.title} ${item.snippet || ""}`
              );

              found.push({
                id: `SCR-${Date.now()}-${found.length}`,
                businessName: title,
                category: activePreset.label.replace(/^[^\s]+\s/, ""),
                location,
                phone: phones[0] || "",
                email: emails[0] || "",
                website: item.link || "",
                techGap: activePreset.defaultGap,
                recommendedService: activePreset.service,
                recommendedProduct: activePreset.productName,
                demoUrl: activePreset.demoUrl,
                sourcePage: `Google Search Page ${page}`,
              });
            }
          }
        }
      }

      // 1B. Built-in Zero-Key OpenStreetMap + Nominatim + Overpass + Live Web Search Spider
      setScrapeStatus(`Querying global business registries & web directories in ${location}...`);

      // Geocode city bounding box via Nominatim
      const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}&limit=1`;
      const geoRes = await fetch(geoUrl, {
        headers: { Accept: "application/json" },
      });

      if (geoRes.ok) {
        const geoData = await geoRes.json();
        if (geoData && geoData[0] && geoData[0].boundingbox) {
          const [south, north, west, east] = geoData[0].boundingbox;
          setScrapeStatus(
            `Scanning mapped ${activePreset.label} across ${location} (Depth: ${maxPages * 20} records)...`
          );

          // Overpass query for matching business nodes/ways in bounding box
          const limitCount = Math.min(maxPages * 25, 150);
          const tagQuery =
            selectedPresetId === "schools"
              ? `["amenity"~"school|college|university"]`
              : selectedPresetId === "healthcare"
              ? `["amenity"~"hospital|clinic|doctors|pharmacy"]`
              : selectedPresetId === "hospitality"
              ? `["tourism"~"hotel|guest_house|apartment"]`
              : selectedPresetId === "ministry"
              ? `["amenity"="place_of_worship"]`
              : `["name"]`;

          const overpassQuery = `[out:json][timeout:15];(node${tagQuery}(${south},${west},${north},${east});way${tagQuery}(${south},${west},${north},${east}););out center ${limitCount};`;
          const overpassRes = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: overpassQuery,
          });

          if (overpassRes.ok) {
            const osmData = await overpassRes.json();
            const elements = osmData.elements || [];
            elements.forEach((el: any, idx: number) => {
              const tags = el.tags || {};
              const name = (tags.name || "").trim();
              if (!name || seenNames.has(name.toLowerCase())) return;

              // If custom niche, filter by keyword if possible, or prioritize ones with contact details
              const rawPhone =
                tags.phone ||
                tags["contact:phone"] ||
                tags["contact:mobile"] ||
                tags["contact:whatsapp"] ||
                "";
              const rawEmail = tags.email || tags["contact:email"] || "";
              const rawWeb = tags.website || tags["contact:website"] || tags.url || "";
              const street = [tags["addr:street"], tags["addr:city"] || location]
                .filter(Boolean)
                .join(", ");

              seenNames.add(name.toLowerCase());
              const pageNum = Math.floor(idx / 10) + 1;

              found.push({
                id: `OSM-${Date.now()}-${found.length}`,
                businessName: name,
                category: activePreset.label.replace(/^[^\s]+\s/, ""),
                location: street || location,
                phone: rawPhone,
                email: rawEmail,
                website: rawWeb,
                techGap: !rawWeb
                  ? "⚠️ NO WEBSITE LISTED — High-priority pitch for Website + Portal/CRM"
                  : activePreset.defaultGap,
                recommendedService: activePreset.service,
                recommendedProduct: activePreset.productName,
                demoUrl: activePreset.demoUrl,
                sourcePage: `Directory Page ${pageNum}`,
              });
            });
          }
        }
      }

      // 1C. Live Web Search via CORS Proxy (DuckDuckGo HTML multi-page scrape)
      for (let page = 1; page <= Math.min(maxPages, 3); page++) {
        setScrapeStatus(`Crawling live web search results (Page ${page}) for contacts...`);
        const searchQ = `${effectiveQuery} ${location} phone OR email OR contact`;
        const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchQ)}&s=${
          (page - 1) * 30
        }`;

        try {
          const proxyRes = await fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(ddgUrl)}`
          );
          if (proxyRes.ok) {
            const proxyData = await proxyRes.json();
            const html = proxyData.contents || "";
            if (html && typeof DOMParser !== "undefined") {
              const doc = new DOMParser().parseFromString(html, "text/html");
              const results = doc.querySelectorAll(".result");
              results.forEach((resEl) => {
                const titleEl = resEl.querySelector(".result__title a") as HTMLAnchorElement | null;
                const snippetEl = resEl.querySelector(".result__snippet");
                const urlEl = resEl.querySelector(".result__url");
                if (!titleEl) return;

                const rawTitle = (titleEl.textContent || "").trim();
                const cleanTitle = rawTitle.split(" - ")[0].split(" | ")[0].trim();
                if (!cleanTitle || cleanTitle.length < 3 || seenNames.has(cleanTitle.toLowerCase()))
                  return;

                const snippet = (snippetEl?.textContent || "").trim();
                const linkUrl = (urlEl?.textContent || "").trim();
                const fullUrl = linkUrl.startsWith("http")
                  ? linkUrl
                  : linkUrl
                  ? `https://${linkUrl}`
                  : "";

                const { emails, phones } = extractContactsFromText(`${rawTitle} ${snippet}`);
                seenNames.add(cleanTitle.toLowerCase());

                found.push({
                  id: `WEB-${Date.now()}-${found.length}`,
                  businessName: cleanTitle,
                  category: activePreset.label.replace(/^[^\s]+\s/, ""),
                  location,
                  phone: phones[0] || "",
                  email: emails[0] || "",
                  website: fullUrl,
                  techGap: activePreset.defaultGap,
                  recommendedService: activePreset.service,
                  recommendedProduct: activePreset.productName,
                  demoUrl: activePreset.demoUrl,
                  sourcePage: `Web Search Page ${page}`,
                });
              });
            }
          }
        } catch {
          // continue gracefully
        }
      }

      // 1D. Enrich top websites that are missing phone/email by crawling their homepage
      const toEnrich = found.filter((p) => p.website && (!p.phone || !p.email)).slice(0, 6);
      if (toEnrich.length > 0) {
        setScrapeStatus(`Deep-crawling ${toEnrich.length} discovered websites for emails & phones...`);
        await Promise.all(
          toEnrich.map(async (item) => {
            const enriched = await enrichWebsiteContacts(item.website);
            if (!item.email && enriched.email) item.email = enriched.email;
            if (!item.phone && enriched.phone) item.phone = enriched.phone;
          })
        );
      }

      // Sort so prospects with phone or email or website appear at the very top
      found.sort((a, b) => {
        const scoreA = (a.phone ? 4 : 0) + (a.email ? 3 : 0) + (a.website ? 1 : 0);
        const scoreB = (b.phone ? 4 : 0) + (b.email ? 3 : 0) + (b.website ? 1 : 0);
        return scoreB - scoreA;
      });

      setProspects((prev) => [...found, ...prev]);
      // Auto-select newly found prospects
      setSelectedIds(new Set(found.map((f) => f.id)));
      setScrapeStatus(
        found.length > 0
          ? `✅ Discovered ${found.length} targeted prospects in ${location}!`
          : `No direct public listings returned automatically. Try the Google X-Ray Dork tab to extract deep Google pages 1–10!`
      );
    } catch (err) {
      console.error("Scrape error:", err);
      setScrapeStatus("Completed scan. Check results below or use Google X-Ray Dork mode.");
    } finally {
      setIsScraping(false);
    }
  };

  // ─── ENGINE 2: GOOGLE X-RAY DORK + RAW PAGE CONTACT RIPPER ───
  const handleExtractFromRawText = () => {
    if (!rawPasteText.trim()) return;
    setIsScraping(true);
    setScrapeStatus("Parsing raw Google results for phones, WhatsApp numbers & emails...");

    const lines = rawPasteText
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean);

    const extracted: ScrapedProspect[] = [];
    const { emails: allEmails, phones: allPhones } = extractContactsFromText(rawPasteText);

    // Group chunks or lines into prospects
    let usedEmails = new Set<string>();
    let usedPhones = new Set<string>();

    for (let i = 0; i < lines.length; i++) {
      const chunk = [lines[i - 1] || "", lines[i], lines[i + 1] || ""].join(" ");
      const { emails, phones } = extractContactsFromText(chunk);
      const newEmail = emails.find((e) => !usedEmails.has(e));
      const newPhone = phones.find((p) => !usedPhones.has(p));

      if (newEmail || newPhone) {
        if (newEmail) usedEmails.add(newEmail);
        if (newPhone) usedPhones.add(newPhone);

        // Guess business name from the preceding or current line
        let titleCandidate = lines[i]
          .replace(newEmail || "", "")
          .replace(newPhone || "", "")
          .replace(/https?:\/\/[^\s]+/g, "")
          .split(" - ")[0]
          .split(" | ")[0]
          .trim();

        if (titleCandidate.length < 4 && lines[i - 1]) {
          titleCandidate = lines[i - 1].split(" - ")[0].split(" | ")[0].trim();
        }
        if (!titleCandidate || titleCandidate.length < 3 || titleCandidate.length > 75) {
          titleCandidate = newEmail
            ? `${newEmail.split("@")[1].split(".")[0].toUpperCase()} (${
                activePreset.label.replace(/^[^\s]+\s/, "").split(" ")[0]
              })`
            : `${activePreset.label.replace(/^[^\s]+\s/, "")} Prospect #${extracted.length + 1}`;
        }

        const urlMatch = chunk.match(/https?:\/\/[^\s"<>]+/);

        extracted.push({
          id: `XRAY-${Date.now()}-${extracted.length}`,
          businessName: titleCandidate,
          category: activePreset.label.replace(/^[^\s]+\s/, ""),
          location,
          phone: newPhone || "",
          email: newEmail || "",
          website: urlMatch ? urlMatch[0] : "",
          techGap: activePreset.defaultGap,
          recommendedService: activePreset.service,
          recommendedProduct: activePreset.productName,
          demoUrl: activePreset.demoUrl,
          sourcePage: "Google Deep X-Ray",
        });
      }
    }

    // Fallback if regex found contacts globally but chunking missed them
    if (extracted.length === 0 && (allEmails.length > 0 || allPhones.length > 0)) {
      const maxLen = Math.max(allEmails.length, allPhones.length);
      for (let i = 0; i < maxLen; i++) {
        extracted.push({
          id: `XRAY-${Date.now()}-${i}`,
          businessName: `${activePreset.label.replace(/^[^\s]+\s/, "")} Prospect #${i + 1}`,
          category: activePreset.label.replace(/^[^\s]+\s/, ""),
          location,
          phone: allPhones[i] || "",
          email: allEmails[i] || "",
          website: "",
          techGap: activePreset.defaultGap,
          recommendedService: activePreset.service,
          recommendedProduct: activePreset.productName,
          demoUrl: activePreset.demoUrl,
          sourcePage: "Google Deep X-Ray",
        });
      }
    }

    setProspects((prev) => [...extracted, ...prev]);
    setSelectedIds(new Set(extracted.map((e) => e.id)));
    setIsScraping(false);
    setScrapeStatus(
      `✅ Extracted ${extracted.length} verified business contacts (${allPhones.length} phones, ${allEmails.length} emails)!`
    );
    setRawPasteText("");
  };

  // ─── ENGINE 3: DEEP WEBSITE SPIDER (BULK URL CRAWLER) ───
  const handleRunUrlSpider = async () => {
    const urls = urlListText
      .split(/[\n,\s]+/)
      .map((u) => u.trim())
      .filter((u) => u.length > 3)
      .map((u) => (u.startsWith("http") ? u : `https://${u}`));

    if (urls.length === 0) return;
    setIsScraping(true);
    const crawled: ScrapedProspect[] = [];

    for (let i = 0; i < urls.length; i++) {
      const targetUrl = urls[i];
      setScrapeStatus(`Spidering website ${i + 1} of ${urls.length}: ${targetUrl}...`);
      const { email, phone } = await enrichWebsiteContacts(targetUrl);

      let domainName = targetUrl
        .replace(/^https?:\/\/(www\.)?/, "")
        .split("/")[0]
        .split(".")[0];
      domainName = domainName.charAt(0).toUpperCase() + domainName.slice(1);

      crawled.push({
        id: `URL-${Date.now()}-${i}`,
        businessName: `${domainName} (${activePreset.label.replace(/^[^\s]+\s/, "")})`,
        category: activePreset.label.replace(/^[^\s]+\s/, ""),
        location,
        phone,
        email,
        website: targetUrl,
        techGap: activePreset.defaultGap,
        recommendedService: activePreset.service,
        recommendedProduct: activePreset.productName,
        demoUrl: activePreset.demoUrl,
        sourcePage: "Direct Website Spider",
      });
    }

    setProspects((prev) => [...crawled, ...prev]);
    setSelectedIds(new Set(crawled.map((c) => c.id)));
    setIsScraping(false);
    setScrapeStatus(`✅ Crawled ${crawled.length} websites and extracted contact endpoints!`);
    setUrlListText("");
  };

  // ─── INJECT SINGLE OR BULK PROSPECTS INTO CRM PIPELINE ───
  const handleInjectSingle = async (prospect: ScrapedProspect) => {
    const created = await createCRMLead({
      name: prospect.businessName,
      email:
        prospect.email ||
        `contact@${prospect.businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      phone: prospect.phone,
      company: prospect.businessName,
      service: prospect.recommendedService,
      budget: "To Be Scoped",
      timeline: "Outbound Prospect",
      message: `[OUTBOUND SCRAPED LEAD — ${prospect.category}]\n📍 Location: ${prospect.location}\n🌐 Website: ${
        prospect.website || "None listed"
      }\n💡 Opportunity: ${prospect.techGap}\n🎯 Pitch Product: ${prospect.recommendedProduct} (${
        prospect.demoUrl
      })`,
      priority: prospect.phone || prospect.email ? "urgent" : "high",
      status: "new",
      assignedTo: "Olamide (Lead Partner)",
      source: `Outbound Scraper (${prospect.sourcePage})`,
    });

    setProspects((prev) =>
      prev.map((p) => (p.id === prospect.id ? { ...p, injected: true } : p))
    );
    onLeadsInjected([created]);
  };

  const handleInjectSelected = async () => {
    const toInject = prospects.filter((p) => selectedIds.has(p.id) && !p.injected);
    if (toInject.length === 0) return;

    setIsScraping(true);
    setScrapeStatus(`Injecting ${toInject.length} prospects into your CRM pipeline...`);
    const createdList: CRMLead[] = [];

    for (const prospect of toInject) {
      const created = await createCRMLead({
        name: prospect.businessName,
        email:
          prospect.email ||
          `contact@${prospect.businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
        phone: prospect.phone,
        company: prospect.businessName,
        service: prospect.recommendedService,
        budget: "To Be Scoped",
        timeline: "Outbound Prospect",
        message: `[OUTBOUND SCRAPED LEAD — ${prospect.category}]\n📍 Location: ${prospect.location}\n🌐 Website: ${
          prospect.website || "None listed"
        }\n💡 Opportunity: ${prospect.techGap}\n🎯 Pitch Product: ${prospect.recommendedProduct} (${
          prospect.demoUrl
        })`,
        priority: prospect.phone || prospect.email ? "urgent" : "high",
        status: "new",
        assignedTo: "Olamide (Lead Partner)",
        source: `Outbound Scraper (${prospect.sourcePage})`,
      });
      createdList.push(created);
    }

    setProspects((prev) =>
      prev.map((p) => (selectedIds.has(p.id) ? { ...p, injected: true } : p))
    );
    onLeadsInjected(createdList);
    setIsScraping(false);
    setScrapeStatus(`🚀 Injected ${createdList.length} leads directly into your CRM Pipeline!`);
  };

  // Generate personalized founder outreach message
  const buildPersonalizedPitch = (p: ScrapedProspect) => {
    return `Hello ${p.businessName} team,\n\nI came across ${p.businessName} in ${p.location} while reviewing leading ${p.category.toLowerCase()} operations.\n\nAt Thoram Group, ${activePreset.pitchHook}\n\nWe already have the core architecture built and live (${p.demoUrl}), which means we can deploy a tailored version for ${p.businessName} in days rather than months.\n\nAre you open to a quick 5-minute WhatsApp walkthrough this week?\n\nBest regards,\nOlamide\nLead Partner, Thoram Group\nhttps://thoramgroup.com`;
  };

  // Build Google X-Ray Dork URL for deep pages
  const buildGoogleDorkUrl = (pageOffset: number = 0) => {
    const isNigeria =
      location.toLowerCase().includes("nigeria") ||
      location.toLowerCase().includes("lagos") ||
      location.toLowerCase().includes("abuja") ||
      location.toLowerCase().includes("port harcourt") ||
      location.toLowerCase().includes("ibadan");

    const phonePattern = isNigeria
      ? `("080" OR "081" OR "090" OR "070" OR "+234")`
      : `("phone" OR "whatsapp" OR "call" OR "@gmail.com" OR "info@")`;

    const dork = `${effectiveQuery} "${location}" ${phonePattern} ("@gmail.com" OR "info@" OR "contact" OR "whatsapp")`;
    return `https://www.google.com/search?q=${encodeURIComponent(dork)}&num=100&start=${
      pageOffset * 10
    }`;
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Solo Founder Outbound Engine */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-800 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-orange-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Outbound B2B Client Acquisition Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Scrape Any Niche. Inject to CRM. Pitch Live Products.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Target any industry (Schools, Real Estate, Study Abroad, Clinics, Hotels) across deep search pages. Extract phone numbers, WhatsApp contacts & emails, inject them into your pipeline, and send 1-click pitches backed by your live case studies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowApiKeys(!showApiKeys)}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-mono text-zinc-200 inline-flex items-center gap-2 transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-orange-400" />
              <span>{serperKey ? "Google API Connected ✓" : "Connect Deep Google API (Optional)"}</span>
            </button>
          </div>
        </div>

        {/* Optional API Key Drawer for 10-Page Automated Google SERP & Maps */}
        <AnimatePresence>
          {showApiKeys && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-6 pt-6 border-t border-zinc-800 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-zinc-300">
                      Serper.dev Google Search & Maps API Key (2,500 Free Searches)
                    </label>
                    <a
                      href="https://serper.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-orange-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Get Free Key at serper.dev</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="password"
                    value={serperKey}
                    onChange={(e) => saveApiKeys(e.target.value, googlePlacesKey)}
                    placeholder="Paste Serper API key to auto-scrape Google Pages 1 to 10..."
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1.5 flex flex-col justify-end">
                  <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
                    💡 <strong>Zero-Cost Built-In Mode:</strong> Even without an API key, our engine scrapes OpenStreetMap registries, live web search pages, and includes the <strong>Google Page 1–10 X-Ray Ripper</strong> for unlimited free lead extraction!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* STEP 1: SELECT TARGET INDUSTRY, LOCATION & SCRAPE MODE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-900/[0.08] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-900/[0.06]">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-orange-600 font-semibold">
              Step 1 · Target Parameters
            </span>
            <h3 className="text-lg font-bold text-zinc-900">
              Choose Target Industry & Location
            </h3>
          </div>

          {/* 3 Scraping Engine Tabs */}
          <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-900/[0.06] self-start">
            <button
              type="button"
              onClick={() => setScrapeMode("live_search")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                scrapeMode === "live_search"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              ⚡ Auto-Scraper (Pages 1–10)
            </button>
            <button
              type="button"
              onClick={() => setScrapeMode("xray_dork")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                scrapeMode === "xray_dork"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              🔍 Google X-Ray Ripper
            </button>
            <button
              type="button"
              onClick={() => setScrapeMode("url_spider")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                scrapeMode === "url_spider"
                  ? "bg-white text-zinc-900 shadow-xs"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              🌐 Website URL Spider
            </button>
          </div>
        </div>

        {/* Industry Presets Grid */}
        <div>
          <label className="block text-xs font-mono uppercase text-zinc-500 mb-2.5">
            Select High-Value Industry (Auto-matches your live case study pitch)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {INDUSTRY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelectedPresetId(preset.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedPresetId === preset.id
                    ? "bg-orange-500/10 border-orange-600 text-zinc-900 ring-2 ring-orange-500/20"
                    : "bg-zinc-50/80 border-zinc-900/[0.08] text-zinc-600 hover:border-zinc-400"
                }`}
              >
                <div className="text-xs font-bold text-zinc-900">{preset.label}</div>
                <div className="text-[11px] font-mono text-orange-600 truncate mt-1">
                  Pitch: {preset.productName}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Search Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5">
              Specific Niche / Keywords (Optional)
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={customNiche}
                onChange={(e) => setCustomNiche(e.target.value)}
                placeholder={
                  selectedPresetId === "custom"
                    ? "e.g. Law Firms, Logistics, Microfinance Bank, Car Dealers..."
                    : `Sub-niche (e.g. Montessori, Lekki Estates, Dental Clinic)...`
                }
                className="w-full bg-zinc-50 border border-zinc-900/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-orange-600"
              />
            </div>
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5">
              Target City / Country *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-orange-600 absolute left-3.5 top-3" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Lagos, Abuja, London, Dubai, Houston..."
                className="w-full bg-zinc-50 border border-zinc-900/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-orange-600"
              />
            </div>
            {/* Fast City Pills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[
                "Lagos, Nigeria",
                "Abuja, Nigeria",
                "Port Harcourt",
                "Ibadan",
                "London, UK",
                "Dubai, UAE",
                "Houston, USA",
              ].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setLocation(city)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                    location === city
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-zinc-100 text-zinc-600 border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-mono uppercase text-zinc-500 mb-1.5">
              Search Depth (Pages)
            </label>
            <select
              value={maxPages}
              onChange={(e) => setMaxPages(Number(e.target.value))}
              className="w-full bg-zinc-50 border border-zinc-900/[0.08] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:border-orange-600"
            >
              <option value={3}>Pages 1 – 3 (Fast Scan)</option>
              <option value={5}>Pages 1 – 5 (Deep Scan)</option>
              <option value={10}>Pages 1 – 10 (Max Depth · 100+ Leads)</option>
            </select>
          </div>
        </div>

        {/* MODE 1: LIVE AUTO-SCRAPER */}
        {scrapeMode === "live_search" && (
          <form onSubmit={handleRunLiveScrape} className="pt-2">
            <button
              type="submit"
              disabled={isScraping}
              className="w-full btn-solid py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-600/15"
            >
              {isScraping ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{scrapeStatus}</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>
                    Scrape {activePreset.label.replace(/^[^\s]+\s/, "")} in {location} (Pages 1–
                    {maxPages})
                  </span>
                </>
              )}
            </button>
          </form>
        )}

        {/* MODE 2: GOOGLE X-RAY DEEP DORK + RAW CONTACT RIPPER */}
        {scrapeMode === "xray_dork" && (
          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-900/[0.08] space-y-5">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase text-orange-600">
                 Step A · Open Deep Google X-Ray Search (Pages 1 to 10)
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Click any Google Page button below. It uses a specialized <strong>X-Ray Search Formula</strong> that forces Google to display businesses in <strong>{location}</strong> along with their <strong>WhatsApp numbers (080/081/090/070)</strong> and <strong>email addresses</strong> right in the snippets — even on Page 10!
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((pageIdx) => (
                  <a
                    key={pageIdx}
                    href={buildGoogleDorkUrl(pageIdx)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-white border border-zinc-300 hover:border-orange-600 hover:text-orange-600 text-xs font-mono font-semibold text-zinc-800 inline-flex items-center gap-1.5 shadow-2xs transition-all"
                  >
                    <span>Google Page {pageIdx + 1}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-zinc-200">
              <div className="text-xs font-mono font-bold uppercase text-emerald-700">
                Step B · Paste Copied Page Text (Ctrl+A, Ctrl+C) to Rip All Contacts
              </div>
              <textarea
                rows={4}
                value={rawPasteText}
                onChange={(e) => setRawPasteText(e.target.value)}
                placeholder="On the Google results page (or any directory/Instagram/Google Maps page), press Ctrl+A then Ctrl+C, and paste everything here. Our parser will automatically extract every Business Name, Phone/WhatsApp number, and Email..."
                className="w-full bg-white border border-zinc-300 rounded-xl p-3.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-600"
              />
              <button
                type="button"
                onClick={handleExtractFromRawText}
                disabled={!rawPasteText.trim() || isScraping}
                className="btn-solid py-3 px-6 rounded-xl text-xs font-bold inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Extract All Phones, Emails & Businesses</span>
              </button>
            </div>
          </div>
        )}

        {/* MODE 3: WEBSITE URL SPIDER */}
        {scrapeMode === "url_spider" && (
          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-900/[0.08] space-y-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-orange-600">
                Deep Website Contact Spider
              </div>
              <p className="text-xs text-zinc-600 mt-0.5">
                Paste 1 to 30 business website URLs (one per line). Our spider will crawl their homepage and extract their phone numbers, WhatsApp links, and email addresses.
              </p>
            </div>
            <textarea
              rows={4}
              value={urlListText}
              onChange={(e) => setUrlListText(e.target.value)}
              placeholder={`https://greenspringsschool.com\nhttps://chrisland.org\nhttps://lagoonhospitals.com`}
              className="w-full bg-white border border-zinc-300 rounded-xl p-3.5 text-xs font-mono text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-600"
            />
            <button
              type="button"
              onClick={handleRunUrlSpider}
              disabled={!urlListText.trim() || isScraping}
              className="btn-solid py-3 px-6 rounded-xl text-xs font-bold inline-flex items-center gap-2"
            >
              {isScraping ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{scrapeStatus}</span>
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4" />
                  <span>Crawl Websites & Extract Contacts</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Status Toast */}
        {scrapeStatus && !isScraping && (
          <div className="p-3.5 rounded-xl bg-zinc-900 text-white text-xs font-mono flex items-center justify-between">
            <span>{scrapeStatus}</span>
            <button
              onClick={() => setScrapeStatus("")}
              className="text-zinc-400 hover:text-white ml-4"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* STEP 2: SCRAPED PROSPECTS REVIEW QUEUE & 1-CLICK CRM INJECTION */}
      {prospects.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-900/[0.08] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-900/[0.06]">
            <div>
              <div className="text-xs font-mono uppercase text-emerald-600 font-bold">
                Step 2 · Prospect Review & Pitch Queue
              </div>
              <h3 className="text-xl font-bold text-zinc-900">
                {prospects.length} Discovered Businesses ({selectedIds.size} Selected)
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  if (selectedIds.size === prospects.length) {
                    setSelectedIds(new Set());
                  } else {
                    setSelectedIds(new Set(prospects.map((p) => p.id)));
                  }
                }}
                className="btn-ghost text-xs py-2 px-3"
              >
                {selectedIds.size === prospects.length ? "Deselect All" : "Select All"}
              </button>

              <button
                type="button"
                onClick={() => setProspects([])}
                className="btn-ghost text-xs py-2 px-3 text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Queue</span>
              </button>

              <button
                type="button"
                onClick={handleInjectSelected}
                disabled={selectedIds.size === 0 || isScraping}
                className="btn-solid text-xs py-2.5 px-5 font-bold inline-flex items-center gap-2 shadow-md shadow-orange-600/15"
              >
                <Plus className="w-4 h-4" />
                <span>Inject {selectedIds.size} Selected into CRM Pipeline</span>
              </button>
            </div>
          </div>

          {/* Prospects Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-900/[0.06] text-[11px] font-mono uppercase text-zinc-500">
                <tr>
                  <th className="py-3 px-3 w-8">✓</th>
                  <th className="py-3 px-3">Business & Location</th>
                  <th className="py-3 px-3">Scraped Contacts</th>
                  <th className="py-3 px-3">Diagnosed Opportunity & Product Pitch</th>
                  <th className="py-3 px-3 text-right">Outreach & CRM Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/[0.06]">
                {prospects.map((p) => {
                  const isSelected = selectedIds.has(p.id);
                  const waNumber = formatPhoneForWhatsApp(p.phone);
                  const pitchText = encodeURIComponent(buildPersonalizedPitch(p));

                  return (
                    <tr
                      key={p.id}
                      className={`transition-colors ${
                        p.injected ? "bg-emerald-50/40" : "hover:bg-orange-50/20"
                      }`}
                    >
                      <td className="py-3.5 px-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            const next = new Set(selectedIds);
                            if (next.has(p.id)) next.delete(p.id);
                            else next.add(p.id);
                            setSelectedIds(next);
                          }}
                          className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
                        />
                      </td>

                      <td className="py-3.5 px-3 max-w-[240px]">
                        <div className="font-bold text-zinc-900 truncate">{p.businessName}</div>
                        <div className="text-xs text-zinc-500 truncate flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                          <span>{p.location}</span>
                        </div>
                        <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
                          {p.sourcePage}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 space-y-1 font-mono text-xs">
                        {p.phone ? (
                          <div className="text-emerald-700 font-semibold flex items-center gap-1.5">
                            <Phone className="w-3 h-3" />
                            <span>{p.phone}</span>
                          </div>
                        ) : (
                          <div className="text-zinc-400 text-[11px]">No public phone</div>
                        )}

                        {p.email ? (
                          <div className="text-zinc-700 flex items-center gap-1.5 truncate max-w-[200px]">
                            <Mail className="w-3 h-3 text-orange-600 shrink-0" />
                            <span className="truncate">{p.email}</span>
                          </div>
                        ) : null}

                        {p.website ? (
                          <a
                            href={p.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline inline-flex items-center gap-1 text-[11px] truncate max-w-[190px]"
                          >
                            <Globe className="w-3 h-3 shrink-0" />
                            <span className="truncate">
                              {p.website.replace(/^https?:\/\/(www\.)?/, "")}
                            </span>
                          </a>
                        ) : (
                          <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 font-semibold">
                            ⚠️ No Website
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 max-w-[280px]">
                        <div className="text-xs font-semibold text-orange-600">
                          Pitch: {p.recommendedProduct}
                        </div>
                        <div className="text-xs text-zinc-600 mt-0.5 leading-snug">
                          {p.techGap}
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Open AI Pitch Generator Modal */}
                          <button
                            type="button"
                            onClick={() => setPitchProspect(p)}
                            className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                            title="View & Send Tailored Pitch"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                            <span>Pitch Script</span>
                          </button>

                          {/* 1-Click Direct WhatsApp Pitch */}
                          {waNumber && (
                            <a
                              href={`https://wa.me/${waNumber}?text=${pitchText}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                              title="Send Pitch on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">WhatsApp</span>
                            </a>
                          )}

                          {/* Inject to CRM Button */}
                          {p.injected ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 text-xs font-mono font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>In CRM</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleInjectSingle(p)}
                              className="px-2.5 py-1.5 rounded-lg bg-orange-600/10 hover:bg-orange-600 hover:text-white text-orange-600 border border-orange-500/20 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to CRM</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI OUTBOUND PITCH MODAL */}
      <AnimatePresence>
        {pitchProspect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPitchProspect(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-900/[0.08] space-y-5"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-900/[0.08]">
                <div>
                  <span className="text-xs font-mono uppercase text-orange-600 font-semibold">
                    Tailored Founder Outreach Pitch
                  </span>
                  <h3 className="text-xl font-bold text-zinc-900 mt-0.5">
                    Pitching {pitchProspect.businessName}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Product Match: <strong>{pitchProspect.recommendedProduct}</strong>
                  </p>
                </div>
                <button
                  onClick={() => setPitchProspect(null)}
                  className="text-zinc-400 hover:text-zinc-900 text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-zinc-500">
                    High-Converting WhatsApp / Email Script
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(buildPersonalizedPitch(pitchProspect));
                      setCopiedPitch(true);
                      setTimeout(() => setCopiedPitch(false), 2000);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-mono text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    {copiedPitch ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs sm:text-sm text-zinc-800 whitespace-pre-wrap font-sans leading-relaxed">
                  {buildPersonalizedPitch(pitchProspect)}
                </pre>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  {pitchProspect.phone && (
                    <a
                      href={`https://wa.me/${formatPhoneForWhatsApp(
                        pitchProspect.phone
                      )}?text=${encodeURIComponent(buildPersonalizedPitch(pitchProspect))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send on WhatsApp Now</span>
                    </a>
                  )}

                  {pitchProspect.email && (
                    <a
                      href={`mailto:${pitchProspect.email}?subject=${encodeURIComponent(
                        `Software & Digital Operations Partnership — ${pitchProspect.businessName}`
                      )}&body=${encodeURIComponent(buildPersonalizedPitch(pitchProspect))}`}
                      className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold inline-flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Cold Email</span>
                    </a>
                  )}
                </div>

                {!pitchProspect.injected && (
                  <button
                    type="button"
                    onClick={() => {
                      handleInjectSingle(pitchProspect);
                      setPitchProspect(null);
                    }}
                    className="btn-solid text-xs py-2.5 px-4 font-bold inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Save Lead to CRM</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
