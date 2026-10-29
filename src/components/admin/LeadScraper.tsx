"use client";

import { useState, useEffect, useMemo } from "react";
import {
  CRMLead,
  createCRMLead,
  ScrapedProspect,
  getSavedScrapedProspects,
  fetchScrapedProspectsFromDB,
  saveScrapedProspects,
  deleteScrapedProspectFromDB,
  deduplicateAndMergeProspects,
  exportProspectsToCSV,
  ScrapeCampaignLog,
  getScrapeCampaignLogs,
  fetchScrapeCampaignsFromDB,
  addScrapeCampaignLog,
  clearScrapeCampaignLogs,
} from "@/lib/crm";
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
  Download,
  Database,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type { ScrapedProspect };

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

// Multi-Platform & Social Media Target Channels
interface PlatformChannel {
  id: string;
  label: string;
  shortBadge: string;
  siteOperator: string;
  description: string;
}

const PLATFORM_CHANNELS: PlatformChannel[] = [
  {
    id: "all_web",
    label: "🌐 All Web, Maps & Directories",
    shortBadge: "All Web + Maps",
    siteOperator: "",
    description: "Scrapes Google Maps, OpenStreetMap, Web Search & Business Directories",
  },
  {
    id: "instagram",
    label: "📸 Instagram Business Bios",
    shortBadge: "Instagram",
    siteOperator: "site:instagram.com",
    description: "Finds Instagram businesses posting WhatsApp numbers (080/081/+234) in their bio",
  },
  {
    id: "facebook",
    label: "📘 Facebook Business Pages",
    shortBadge: "Facebook",
    siteOperator: "site:facebook.com",
    description: "Finds active Facebook business pages with phone numbers & emails",
  },
  {
    id: "linkedin",
    label: "💼 LinkedIn Founders & CEOs",
    shortBadge: "LinkedIn",
    siteOperator: "(site:linkedin.com/company OR site:linkedin.com/in)",
    description: "Targets Founders, Proprietors, CEOs & Companies on LinkedIn",
  },
  {
    id: "jiji_property",
    label: "🛍️ Jiji.ng & PropertyPro Sellers",
    shortBadge: "Jiji / PropertyPro",
    siteOperator: "(site:jiji.ng OR site:propertypro.ng OR site:privateproperty.com.ng)",
    description: "Targets active merchants, car dealers & realtors paying for classified ads",
  },
  {
    id: "tiktok",
    label: "🎵 TikTok Business Profiles",
    shortBadge: "TikTok",
    siteOperator: "site:tiktok.com",
    description: "Finds fast-growing TikTok vendors & brands that need an official website/app",
  },
  {
    id: "directories",
    label: "🏢 Nigerian B2B Directories",
    shortBadge: "B2B Directories",
    siteOperator:
      "(site:businesslist.com.ng OR site:finelib.com OR site:vconnect.com OR site:ngex.com)",
    description: "Scrapes verified Nigerian business directories with direct phone numbers",
  },
  {
    id: "youtube",
    label: "🎥 YouTube Channels & Ministries",
    shortBadge: "YouTube",
    siteOperator: "site:youtube.com",
    description: "Finds ministries, academies & realtors with active channels needing a Mobile APK",
  },
];

// Helper to normalize phone numbers for WhatsApp wa.me links
function formatPhoneForWhatsApp(raw: string, defaultCountryCode = "234"): string {
  if (!raw) return "";
  let digits = raw.replace(/\(0\)/g, "").replace(/[^0-9+]/g, "");
  if (!digits) return "";
  if (digits.startsWith("+2340")) digits = "+234" + digits.slice(5);
  else if (digits.startsWith("2340")) digits = "234" + digits.slice(4);
  if (digits.startsWith("+")) return digits.slice(1);
  if (digits.startsWith("0") && digits.length === 11) {
    return defaultCountryCode + digits.slice(1);
  }
  return digits;
}

// Clean phone number into standard international format (+234...)
function cleanPhoneNumber(raw: string): string {
  if (!raw) return "";
  const cleaned = raw.replace(/\(0\)/g, "").replace(/[^\d+]/g, "");
  if (!cleaned) return "";
  if (cleaned.startsWith("234") && !cleaned.startsWith("+234")) return "+" + cleaned;
  if (cleaned.startsWith("0") && cleaned.length === 11) return "+234" + cleaned.slice(1);
  return raw.trim();
}

// Classify whether a URL is a real standalone website, a social/directory page only, or missing
const SOCIAL_OR_DIRECTORY_DOMAINS = [
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
  "yellowpages",
  "directory",
];

function classifyWebsiteStatus(url: string): "no_website" | "social_only" | "needs_revamp" {
  const clean = (url || "").trim().toLowerCase();
  if (!clean) return "no_website";
  if (SOCIAL_OR_DIRECTORY_DOMAINS.some((d) => clean.includes(d))) {
    return "social_only";
  }
  return "needs_revamp";
}

// God-Level Lead Readiness & Deal Value Scorer (0 - 100)
function calculateLeadScore(p: ScrapedProspect): number {
  let score = 0;
  if (p.phone) score += 35;
  if (p.email) score += 20;
  const webStatus = p.websiteStatus || classifyWebsiteStatus(p.website);
  if (webStatus === "no_website" || webStatus === "social_only") {
    score += 25; // Urgent need for first website
  } else {
    score += 15; // Website revamp candidate
  }
  if (!p.hasMobileApp) {
    score += 20; // Needs Mobile App / Android APK
  }
  return Math.min(100, score);
}

// Extract phones, emails, and mobile APK / App Store presence from raw text/HTML
function extractContactsFromText(text: string) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const phoneRegex =
    /(?:\+?234[\s.-]?(?:\(0\)[\s.-]?)?|0)[789][01]\d[\s.-]?\d{3}[\s.-]?\d{4}|\+\d{1,3}[\s.-]?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/g;

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

  const rawPhones = text.match(phoneRegex) || [];
  const phones = Array.from(new Set(rawPhones.map(cleanPhoneNumber))).filter(
    (p) => p.replace(/[^\d]/g, "").length >= 9
  );

  const lower = text.toLowerCase();
  const hasMobileApp =
    lower.includes("play.google.com/store/apps") ||
    lower.includes("apps.apple.com") ||
    lower.includes(".apk");

  return { emails, phones, hasMobileApp };
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

  // Target Digital Gap Focus (Step 1)
  const [targetGapMode, setTargetGapMode] = useState<
    "all" | "no_website" | "needs_revamp" | "no_apk"
  >("all");

  // Target Platform / Social Channel (Step 1)
  const [targetPlatformId, setTargetPlatformId] = useState<string>("all_web");

  // Require Phone or Email Contact Toggle (Default: TRUE - skips empty map pins like AFDB HALL)
  const [requireContact, setRequireContact] = useState<boolean>(true);

  // Optional API Keys (saved in localStorage so user never loses them)
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [serperKey, setSerperKey] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("thoram_serper_key") || "" : ""
  );
  const [googlePlacesKey, setGooglePlacesKey] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("thoram_gplaces_key") || "" : ""
  );

  // Scraper State + Persistent Tables
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeStatus, setScrapeStatus] = useState<string>("");
  const [prospects, setProspects] = useState<ScrapedProspect[]>([]);
  const [campaignLogs, setCampaignLogs] = useState<ScrapeCampaignLog[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Table Filters
  const [tableFilter, setTableFilter] = useState<
    | "all"
    | "no_website"
    | "needs_revamp"
    | "no_apk"
    | "uncontacted"
    | "has_phone"
    | "has_email"
    | "pending_crm"
  >("all");
  const [tableSearch, setTableSearch] = useState<string>("");

  // Active Pitch Modal, Pitch Angle Tab & Follow-Up Stage (Day 1, Day 3, Day 7)
  const [pitchProspect, setPitchProspect] = useState<ScrapedProspect | null>(null);
  const [pitchAngle, setPitchAngle] = useState<
    "no_website" | "revamp" | "mobile_apk" | "platform_crm"
  >("platform_crm");
  const [followUpStage, setFollowUpStage] = useState<"day1" | "day3" | "day7">("day1");
  const [copiedPitch, setCopiedPitch] = useState(false);

  // Load persisted tables from Supabase PostgreSQL on mount (and auto-deduplicate)
  useEffect(() => {
    const local = getSavedScrapedProspects();
    const { merged: cleanLocal } = deduplicateAndMergeProspects([], local);
    setProspects(cleanLocal);
    setCampaignLogs(getScrapeCampaignLogs());

    fetchScrapedProspectsFromDB().then((remoteProspects) => {
      const { merged: cleanRemote, removedIds } = deduplicateAndMergeProspects(
        [],
        remoteProspects
      );
      setProspects(cleanRemote);
      if (removedIds.length > 0) {
        removedIds.forEach((id) => deleteScrapedProspectFromDB(id));
        saveScrapedProspects(cleanRemote);
      }
    });
    fetchScrapeCampaignsFromDB().then((remoteCampaigns) => {
      setCampaignLogs(remoteCampaigns);
    });
  }, []);

  // Helper to update prospects state + persist to `scraped_prospects` table
  const updateAndPersistProspects = (updater: (prev: ScrapedProspect[]) => ScrapedProspect[]) => {
    setProspects((prev) => {
      const next = updater(prev);
      saveScrapedProspects(next);
      return next;
    });
  };

  // Smart Merge Helper: Prevents duplicate contacts & enriches existing rows
  const mergeIncomingProspects = (incoming: ScrapedProspect[]) => {
    let stats = { addedCount: 0, duplicateCount: 0, enrichedCount: 0 };
    setProspects((prev) => {
      const res = deduplicateAndMergeProspects(incoming, prev);
      stats = {
        addedCount: res.addedCount,
        duplicateCount: res.duplicateCount,
        enrichedCount: res.enrichedCount,
      };
      if (res.removedIds.length > 0) {
        res.removedIds.forEach((id) => deleteScrapedProspectFromDB(id));
      }
      saveScrapedProspects(res.merged);
      return res.merged;
    });
    return stats;
  };

  // 1-Click Manual Deduplicate & Clean Table Handler
  const handleManualDeduplicate = () => {
    const { merged, duplicateCount, removedIds } = deduplicateAndMergeProspects([], prospects);
    if (removedIds.length > 0) {
      removedIds.forEach((id) => deleteScrapedProspectFromDB(id));
    }
    setProspects(merged);
    saveScrapedProspects(merged);
    setScrapeStatus(
      duplicateCount > 0
        ? `🧹 Cleaned & merged ${duplicateCount} duplicate contact(s)! All ${merged.length} rows are now 100% unique.`
        : `✨ Verified! All ${merged.length} contacts in your table are already 100% unique (0 duplicates found).`
    );
  };

  // 1-Click Purge Contactless Map Pins (Removes rows with no phone AND no email)
  const handlePurgeEmptyPins = () => {
    const emptyList = prospects.filter((p) => !p.phone && !p.email);
    if (emptyList.length === 0) {
      setScrapeStatus(
        `✨ Verified! Every single lead in your table has a verified phone number or email address.`
      );
      return;
    }
    const kept = prospects.filter((p) => Boolean(p.phone || p.email));
    emptyList.forEach((p) => deleteScrapedProspectFromDB(p.id));
    updateAndPersistProspects(() => kept);
    setScrapeStatus(
      `🧹 Purged ${emptyList.length} bare map pin(s) that lacked contact details! All remaining ${kept.length} leads have phone numbers or emails.`
    );
  };

  // Helper to check if a prospect has no standalone website
  const isWithoutWebsite = (p: ScrapedProspect) => {
    const status = p.websiteStatus || classifyWebsiteStatus(p.website);
    return status === "no_website" || status === "social_only";
  };

  // Filtered prospects for Table 1
  const filteredProspects = useMemo(() => {
    return prospects.filter((p) => {
      const matchesSearch =
        !tableSearch.trim() ||
        p.businessName.toLowerCase().includes(tableSearch.toLowerCase()) ||
        p.location.toLowerCase().includes(tableSearch.toLowerCase()) ||
        p.phone.toLowerCase().includes(tableSearch.toLowerCase()) ||
        p.email.toLowerCase().includes(tableSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(tableSearch.toLowerCase()) ||
        (p.sourcePage || "").toLowerCase().includes(tableSearch.toLowerCase());

      if (!matchesSearch) return false;
      if (tableFilter === "no_website") return isWithoutWebsite(p);
      if (tableFilter === "needs_revamp") return !isWithoutWebsite(p);
      if (tableFilter === "no_apk") return !p.hasMobileApp;
      if (tableFilter === "uncontacted") return !p.outreachSent;
      if (tableFilter === "has_phone") return Boolean(p.phone);
      if (tableFilter === "has_email") return Boolean(p.email);
      if (tableFilter === "pending_crm") return !p.injected;
      return true;
    });
  }, [prospects, tableFilter, tableSearch]);

  // Bulk Paste / URL inputs
  const [rawPasteText, setRawPasteText] = useState("");
  const [urlListText, setUrlListText] = useState("");

  const activePreset =
    INDUSTRY_PRESETS.find((p) => p.id === selectedPresetId) || INDUSTRY_PRESETS[0];

  const activePlatform =
    PLATFORM_CHANNELS.find((c) => c.id === targetPlatformId) || PLATFORM_CHANNELS[0];

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

  // Build dynamic diagnosis string based on website & APK status
  function buildDiagnosedGap(
    webStatus: "no_website" | "social_only" | "needs_revamp",
    hasApk: boolean,
    platformLabel?: string
  ): string {
    if (webStatus === "no_website") {
      return "🚫 NO WEBSITE + 📱 NO MOBILE APK — High-priority lead for first Website Build, Mobile APK & CRM";
    }
    if (webStatus === "social_only") {
      return `📲 ${
        platformLabel ? platformLabel.toUpperCase() : "SOCIAL"
      } ONLY (No Official Website / No APK) — Pitch Website + Custom Mobile APK`;
    }
    if (!hasApk) {
      return `🔧 Website Revamp + 📱 No Mobile APK — ${activePreset.defaultGap}`;
    }
    return `🔧 Website Revamp & AI Integration — ${activePreset.defaultGap}`;
  }

  // Deep crawl a single website via AllOrigins to pull email, phone, and check for Mobile APK / App Store links
  async function enrichWebsiteContacts(
    url: string
  ): Promise<{ email: string; phone: string; hasMobileApp: boolean }> {
    if (!url || !url.startsWith("http")) return { email: "", phone: "", hasMobileApp: false };
    // Skip deep crawling social media walls since bio snippet already has the contact info
    if (SOCIAL_OR_DIRECTORY_DOMAINS.some((d) => url.toLowerCase().includes(d))) {
      return { email: "", phone: "", hasMobileApp: false };
    }
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) return { email: "", phone: "", hasMobileApp: false };
      const data = await res.json();
      const html = data.contents || "";
      const { emails, phones, hasMobileApp } = extractContactsFromText(html);
      return {
        email: emails[0] || "",
        phone: phones[0] || "",
        hasMobileApp,
      };
    } catch {
      return { email: "", phone: "", hasMobileApp: false };
    }
  }

  // ─── ENGINE 1: LIVE DEEP SEARCH, SOCIAL MEDIA & DIRECTORY SPIDER (PAGES 1 TO 10) ───
  const handleRunLiveScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScraping(true);
    setScrapeStatus(
      `Initializing ${activePlatform.shortBadge} discovery for ${activePreset.label} in ${location}...`
    );
    const found: ScrapedProspect[] = [];
    const seenNames = new Set<string>();

    const isSocialChannel = targetPlatformId !== "all_web";

    try {
      // 1A. If Serper.dev API Key is provided -> Crawl Google Places & Social/Web Search Pages 1..maxPages!
      if (serperKey.trim()) {
        for (let page = 1; page <= maxPages; page++) {
          setScrapeStatus(
            `Scanning ${activePlatform.shortBadge} Page ${page} of ${maxPages} for "${effectiveQuery}" in ${location}...`
          );

          // Query Serper Places API when on All Web mode
          if (!isSocialChannel) {
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

                const webStatus = classifyWebsiteStatus(p.website || "");
                found.push({
                  id: `SCR-${Date.now()}-${found.length}`,
                  businessName: name,
                  category: p.category || activePreset.label.replace(/^[^\s]+\s/, ""),
                  location: p.address || location,
                  phone: p.phoneNumber || "",
                  email: "",
                  website: p.website || "",
                  websiteStatus: webStatus,
                  hasMobileApp: false,
                  techGap: buildDiagnosedGap(webStatus, false),
                  recommendedService:
                    webStatus !== "needs_revamp"
                      ? "Web Design, Mobile APK & Custom Portal"
                      : activePreset.service,
                  recommendedProduct: activePreset.productName,
                  demoUrl: activePreset.demoUrl,
                  sourcePage: `Google Maps Page ${page}`,
                });
              }
            }
          }

          // Query Serper Organic Search (with Social/Platform operator if selected)
          const platformPrefix = activePlatform.siteOperator
            ? `${activePlatform.siteOperator} `
            : targetGapMode === "no_website"
            ? `(site:instagram.com OR site:facebook.com OR site:jiji.ng OR site:businesslist.com.ng) `
            : "";

          const organicQuery = `${platformPrefix}${effectiveQuery} "${location}" ("080" OR "081" OR "090" OR "070" OR "+234" OR "phone" OR "whatsapp" OR "@gmail.com")`;

          const searchRes = await fetch("https://google.serper.dev/search", {
            method: "POST",
            headers: {
              "X-API-KEY": serperKey.trim(),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              q: organicQuery,
              page,
            }),
          });

          if (searchRes.ok) {
            const searchData = await searchRes.json();
            const organic = searchData.organic || [];
            for (const item of organic) {
              const title = (item.title || "")
                .replace(/• Instagram photos and videos/i, "")
                .split(" - ")[0]
                .split(" | ")[0]
                .trim();
              if (!title || seenNames.has(title.toLowerCase())) continue;
              seenNames.add(title.toLowerCase());

              const { emails, phones, hasMobileApp } = extractContactsFromText(
                `${item.title} ${item.snippet || ""}`
              );
              const webStatus = classifyWebsiteStatus(item.link || "");

              found.push({
                id: `SCR-${Date.now()}-${found.length}`,
                businessName: title,
                category: activePreset.label.replace(/^[^\s]+\s/, ""),
                location,
                phone: phones[0] || "",
                email: emails[0] || "",
                website: item.link || "",
                websiteStatus: webStatus,
                hasMobileApp,
                techGap: buildDiagnosedGap(
                  webStatus,
                  hasMobileApp,
                  isSocialChannel ? activePlatform.shortBadge : undefined
                ),
                recommendedService:
                  webStatus !== "needs_revamp"
                    ? "Web Design, Mobile APK & Custom Portal"
                    : activePreset.service,
                recommendedProduct: activePreset.productName,
                demoUrl: activePreset.demoUrl,
                sourcePage: `${activePlatform.shortBadge} Page ${page}`,
              });
            }
          }
        }
      }

      // 1B. Built-in Zero-Key OpenStreetMap Registry (when on All Web mode)
      if (!isSocialChannel) {
        setScrapeStatus(`Querying global business registries & directories in ${location}...`);

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

                // If requireContact is active, discard bare pins that lack phone, email AND website
                if (requireContact && !rawPhone && !rawEmail && !rawWeb) {
                  return;
                }

                seenNames.add(name.toLowerCase());
                const pageNum = Math.floor(idx / 10) + 1;
                const webStatus = classifyWebsiteStatus(rawWeb);
                const cleanedPhone = cleanPhoneNumber(rawPhone);

                found.push({
                  id: `OSM-${Date.now()}-${found.length}`,
                  businessName: name,
                  category: activePreset.label.replace(/^[^\s]+\s/, ""),
                  location: street || location,
                  phone: cleanedPhone,
                  email: rawEmail,
                  website: rawWeb,
                  websiteStatus: webStatus,
                  hasMobileApp: false,
                  techGap: buildDiagnosedGap(webStatus, false),
                  recommendedService:
                    webStatus !== "needs_revamp"
                      ? "Web Design, Mobile APK & Custom Portal"
                      : activePreset.service,
                  recommendedProduct: activePreset.productName,
                  demoUrl: activePreset.demoUrl,
                  sourcePage: `Directory Page ${pageNum}`,
                });
              });
            }
          }
        }
      }

      // 1C. Live Web & Social Search via CORS Proxy (DuckDuckGo HTML multi-page scrape)
      for (let page = 1; page <= Math.min(maxPages, 4); page++) {
        setScrapeStatus(
          `Crawling live ${activePlatform.shortBadge} results (Page ${page}) for contacts...`
        );
        const platformQuery = activePlatform.siteOperator
          ? `${activePlatform.siteOperator} ${effectiveQuery} ${location} phone OR whatsapp OR 080 OR 081 OR 090`
          : targetGapMode === "no_website"
          ? `${effectiveQuery} ${location} (instagram OR facebook OR jiji OR directory) phone`
          : `${effectiveQuery} ${location} phone OR email OR contact`;

        const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(
          platformQuery
        )}&s=${(page - 1) * 30}`;

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
                const cleanTitle = rawTitle
                  .replace(/• Instagram photos and videos/i, "")
                  .split(" - ")[0]
                  .split(" | ")[0]
                  .trim();
                if (!cleanTitle || cleanTitle.length < 3 || seenNames.has(cleanTitle.toLowerCase()))
                  return;

                const snippet = (snippetEl?.textContent || "").trim();
                const linkUrl = (urlEl?.textContent || "").trim();
                const fullUrl = linkUrl.startsWith("http")
                  ? linkUrl
                  : linkUrl
                  ? `https://${linkUrl}`
                  : "";

                const { emails, phones, hasMobileApp } = extractContactsFromText(
                  `${rawTitle} ${snippet}`
                );
                seenNames.add(cleanTitle.toLowerCase());
                const webStatus = classifyWebsiteStatus(fullUrl);

                found.push({
                  id: `WEB-${Date.now()}-${found.length}`,
                  businessName: cleanTitle,
                  category: activePreset.label.replace(/^[^\s]+\s/, ""),
                  location,
                  phone: phones[0] || "",
                  email: emails[0] || "",
                  website: fullUrl,
                  websiteStatus: webStatus,
                  hasMobileApp,
                  techGap: buildDiagnosedGap(
                    webStatus,
                    hasMobileApp,
                    isSocialChannel ? activePlatform.shortBadge : undefined
                  ),
                  recommendedService:
                    webStatus !== "needs_revamp"
                      ? "Web Design, Mobile APK & Custom Portal"
                      : activePreset.service,
                  recommendedProduct: activePreset.productName,
                  demoUrl: activePreset.demoUrl,
                  sourcePage: `${activePlatform.shortBadge} Page ${page}`,
                });
              });
            }
          }
        } catch {
          // continue gracefully
        }
      }

      // 1D. Enrich top standalone websites that are missing phone/email AND check if they have an Android APK / Mobile App
      const toEnrich = found
        .filter((p) => p.website && p.websiteStatus === "needs_revamp" && (!p.phone || !p.email))
        .slice(0, 6);
      if (toEnrich.length > 0) {
        setScrapeStatus(
          `Deep-crawling ${toEnrich.length} discovered websites for emails, phones & Mobile APK status...`
        );
        await Promise.all(
          toEnrich.map(async (item) => {
            const enriched = await enrichWebsiteContacts(item.website);
            if (!item.email && enriched.email) item.email = enriched.email;
            if (!item.phone && enriched.phone) item.phone = enriched.phone;
            if (enriched.hasMobileApp) {
              item.hasMobileApp = true;
              item.techGap = buildDiagnosedGap(
                item.websiteStatus || "needs_revamp",
                true
              );
            }
          })
        );
      }

      // Sort by Lead Score & user's chosen Target Digital Gap (`targetGapMode`)
      found.sort((a, b) => {
        const aNoWeb = isWithoutWebsite(a) ? 1 : 0;
        const bNoWeb = isWithoutWebsite(b) ? 1 : 0;
        if (targetGapMode === "no_website" && aNoWeb !== bNoWeb) {
          return bNoWeb - aNoWeb;
        }
        if (targetGapMode === "needs_revamp" && aNoWeb !== bNoWeb) {
          return aNoWeb - bNoWeb;
        }
        return calculateLeadScore(b) - calculateLeadScore(a);
      });

      // Automatically sync table filter with the user's chosen Target Gap Mode
      if (targetGapMode === "no_website") setTableFilter("no_website");
      else if (targetGapMode === "needs_revamp") setTableFilter("needs_revamp");
      else if (targetGapMode === "no_apk") setTableFilter("no_apk");
      else setTableFilter("all");

      // Filter out contactless pins if requireContact is enabled
      const finalProspects = requireContact
        ? found.filter((p) => Boolean(p.phone || p.email))
        : found;
      const candidatesToMerge = finalProspects.length > 0 ? finalProspects : found;

      const stamped = candidatesToMerge.map((f) => ({ ...f, scrapedAt: new Date().toISOString() }));
      const { addedCount, duplicateCount, enrichedCount } = mergeIncomingProspects(stamped);

      // Log campaign in `scrape_campaigns` table
      const campaignEntry = await addScrapeCampaignLog({
        industry: `${activePreset.label.replace(/^[^\s]+\s/, "")} (${activePlatform.shortBadge})`,
        location,
        mode: serperKey.trim()
          ? `Google SERP (${activePlatform.shortBadge})`
          : `Auto-Scraper (${activePlatform.shortBadge})`,
        pagesScanned: maxPages,
        leadsFound: addedCount,
        phonesFound: stamped.filter((s) => Boolean(s.phone)).length,
        emailsFound: stamped.filter((s) => Boolean(s.email)).length,
      });
      setCampaignLogs((prev) => [campaignEntry, ...prev]);

      // Auto-select newly found prospects
      setSelectedIds(new Set(stamped.map((f) => f.id)));
      setScrapeStatus(
        stamped.length > 0
          ? `✅ Added ${addedCount} new unique prospects in ${location}${
              duplicateCount > 0
                ? ` (Skipped ${duplicateCount} duplicates${
                    enrichedCount > 0 ? ` & enriched ${enrichedCount} existing contacts` : ""
                  })`
                : ""
            }!`
          : `No direct public listings returned automatically for ${activePlatform.shortBadge}. Click the "🔍 Social & Google X-Ray Ripper" tab to extract Pages 1–10 directly!`
      );
    } catch (err) {
      console.error("Scrape error:", err);
      setScrapeStatus("Completed scan. Check results below or use Social & Google X-Ray mode.");
    } finally {
      setIsScraping(false);
    }
  };

  // ─── ENGINE 2: SOCIAL & GOOGLE X-RAY DORK + RAW PAGE CONTACT RIPPER ───
  const handleExtractFromRawText = async () => {
    if (!rawPasteText.trim()) return;
    setIsScraping(true);
    setScrapeStatus("Parsing raw results & deduplicating contacts...");

    const lines = rawPasteText
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean);

    const extracted: ScrapedProspect[] = [];
    const {
      emails: allEmails,
      phones: allPhones,
      hasMobileApp: globalHasApp,
    } = extractContactsFromText(rawPasteText);

    let usedEmails = new Set<string>();
    let usedPhones = new Set<string>();

    for (let i = 0; i < lines.length; i++) {
      const chunk = [lines[i - 1] || "", lines[i], lines[i + 1] || ""].join(" ");
      const { emails, phones, hasMobileApp } = extractContactsFromText(chunk);
      const newEmail = emails.find((e) => !usedEmails.has(e));
      const newPhone = phones.find((p) => !usedPhones.has(p));

      if (newEmail || newPhone) {
        if (newEmail) usedEmails.add(newEmail);
        if (newPhone) usedPhones.add(newPhone);

        let titleCandidate = lines[i]
          .replace(newEmail || "", "")
          .replace(newPhone || "", "")
          .replace(/https?:\/\/[^\s]+/g, "")
          .replace(/• Instagram photos and videos/i, "")
          .split(" - ")[0]
          .split(" | ")[0]
          .trim();

        if (titleCandidate.length < 4 && lines[i - 1]) {
          titleCandidate = lines[i - 1]
            .replace(/• Instagram photos and videos/i, "")
            .split(" - ")[0]
            .split(" | ")[0]
            .trim();
        }
        if (!titleCandidate || titleCandidate.length < 3 || titleCandidate.length > 75) {
          titleCandidate = newEmail
            ? `${newEmail.split("@")[1].split(".")[0].toUpperCase()} (${
                activePreset.label.replace(/^[^\s]+\s/, "").split(" ")[0]
              })`
            : `${activePreset.label.replace(/^[^\s]+\s/, "")} Prospect #${extracted.length + 1}`;
        }

        const urlMatch = chunk.match(/https?:\/\/[^\s"<>]+/);
        const matchedUrl = urlMatch ? urlMatch[0] : "";
        const webStatus = classifyWebsiteStatus(matchedUrl);

        extracted.push({
          id: `XRAY-${Date.now()}-${extracted.length}`,
          businessName: titleCandidate,
          category: activePreset.label.replace(/^[^\s]+\s/, ""),
          location,
          phone: newPhone || "",
          email: newEmail || "",
          website: matchedUrl,
          hasMobileApp,
          websiteStatus: webStatus,
          techGap: buildDiagnosedGap(webStatus, hasMobileApp, activePlatform.shortBadge),
          recommendedService:
            webStatus !== "needs_revamp"
              ? "Web Design, Mobile APK & Custom Software"
              : activePreset.service,
          recommendedProduct: activePreset.productName,
          demoUrl: activePreset.demoUrl,
          sourcePage: `${activePlatform.shortBadge} X-Ray`,
          scrapedAt: new Date().toISOString(),
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
          hasMobileApp: globalHasApp,
          websiteStatus: "no_website",
          techGap: buildDiagnosedGap("no_website", globalHasApp, activePlatform.shortBadge),
          recommendedService: "Web Design, Mobile APK & Custom Software",
          recommendedProduct: activePreset.productName,
          demoUrl: activePreset.demoUrl,
          sourcePage: `${activePlatform.shortBadge} X-Ray`,
          scrapedAt: new Date().toISOString(),
        });
      }
    }

    const { addedCount, duplicateCount, enrichedCount } = mergeIncomingProspects(extracted);

    const campaignEntry = await addScrapeCampaignLog({
      industry: `${activePreset.label.replace(/^[^\s]+\s/, "")} (${activePlatform.shortBadge})`,
      location,
      mode: `${activePlatform.shortBadge} X-Ray Ripper`,
      pagesScanned: maxPages,
      leadsFound: addedCount,
      phonesFound: extracted.filter((s) => Boolean(s.phone)).length,
      emailsFound: extracted.filter((s) => Boolean(s.email)).length,
    });
    setCampaignLogs((prev) => [campaignEntry, ...prev]);

    setSelectedIds(new Set(extracted.map((e) => e.id)));
    setIsScraping(false);
    setScrapeStatus(
      `✅ Added ${addedCount} unique business contacts (${allPhones.length} phones, ${
        allEmails.length
      } emails)${
        duplicateCount > 0
          ? ` · Skipped ${duplicateCount} duplicates${
              enrichedCount > 0 ? ` & enriched ${enrichedCount} existing rows` : ""
            }`
          : ""
      }!`
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
      const { email, phone, hasMobileApp } = await enrichWebsiteContacts(targetUrl);
      const webStatus = classifyWebsiteStatus(targetUrl);

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
        hasMobileApp,
        websiteStatus: webStatus,
        techGap:
          webStatus === "social_only"
            ? `Social/directory link only — Pitch Official Website + ${activePreset.productName}`
            : `Existing website needs modern UI/UX revamp, AI WhatsApp integration${
                hasMobileApp ? "" : " & custom Android APK"
              }`,
        recommendedService: activePreset.service,
        recommendedProduct: activePreset.productName,
        demoUrl: activePreset.demoUrl,
        sourcePage: "Direct Website Spider",
        scrapedAt: new Date().toISOString(),
      });
    }

    const { addedCount, duplicateCount, enrichedCount } = mergeIncomingProspects(crawled);

    const campaignEntry = await addScrapeCampaignLog({
      industry: activePreset.label.replace(/^[^\s]+\s/, ""),
      location,
      mode: "Website URL Spider",
      pagesScanned: crawled.length,
      leadsFound: addedCount,
      phonesFound: crawled.filter((s) => Boolean(s.phone)).length,
      emailsFound: crawled.filter((s) => Boolean(s.email)).length,
    });
    setCampaignLogs((prev) => [campaignEntry, ...prev]);

    setSelectedIds(new Set(crawled.map((c) => c.id)));
    setIsScraping(false);
    setScrapeStatus(
      `✅ Crawled ${crawled.length} URLs: Added ${addedCount} unique contacts${
        duplicateCount > 0
          ? ` (Skipped ${duplicateCount} duplicates${
              enrichedCount > 0 ? ` & enriched ${enrichedCount} rows` : ""
            })`
          : ""
      }!`
    );
    setUrlListText("");
  };

  // Inline edit phone or email on a scraped prospect row
  const handleInlineProspectEdit = (
    id: string,
    field: "phone" | "email" | "businessName",
    value: string
  ) => {
    updateAndPersistProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Toggle whether a prospect has a mobile app/APK
  const handleToggleMobileApp = (id: string) => {
    updateAndPersistProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, hasMobileApp: !p.hasMobileApp } : p))
    );
  };

  // Mark or toggle Outreach Sent status (so you never message the same client twice)
  const handleMarkOutreachSent = (id: string, explicitValue?: boolean) => {
    updateAndPersistProspects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, outreachSent: explicitValue !== undefined ? explicitValue : !p.outreachSent }
          : p
      )
    );
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
        prospect.website || "NO WEBSITE (Needs New Website Build)"
      }\n📱 Mobile App/APK: ${
        prospect.hasMobileApp ? "Has App" : "NO MOBILE APK (Pitch Android/iOS App)"
      }\n🔥 Lead Score: ${calculateLeadScore(prospect)}/100\n💡 Opportunity: ${
        prospect.techGap
      }\n🎯 Pitch Product: ${prospect.recommendedProduct} (${prospect.demoUrl})`,
      priority: prospect.phone || prospect.email ? "urgent" : "high",
      status: "new",
      assignedTo: "Olamide (Lead Partner)",
      source: `Outbound Scraper (${prospect.sourcePage})`,
    });

    updateAndPersistProspects((prev) =>
      prev.map((p) => (p.id === prospect.id ? { ...p, injected: true } : p))
    );
    onLeadsInjected([created]);
  };

  const handleInjectSelected = async () => {
    const toInject = prospects.filter((p) => selectedIds.has(p.id) && !p.injected);
    if (toInject.length === 0) return;

    setIsScraping(true);
    setScrapeStatus(`Injecting ${toInject.length} unique prospects into your CRM pipeline...`);
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
          prospect.website || "NO WEBSITE (Needs New Website Build)"
        }\n📱 Mobile App/APK: ${
          prospect.hasMobileApp ? "Has App" : "NO MOBILE APK (Pitch Android/iOS App)"
        }\n🔥 Lead Score: ${calculateLeadScore(prospect)}/100\n💡 Opportunity: ${
          prospect.techGap
        }\n🎯 Pitch Product: ${prospect.recommendedProduct} (${prospect.demoUrl})`,
        priority: prospect.phone || prospect.email ? "urgent" : "high",
        status: "new",
        assignedTo: "Olamide (Lead Partner)",
        source: `Outbound Scraper (${prospect.sourcePage})`,
      });
      createdList.push(created);
    }

    updateAndPersistProspects((prev) =>
      prev.map((p) => (selectedIds.has(p.id) ? { ...p, injected: true } : p))
    );
    onLeadsInjected(createdList);
    setIsScraping(false);
    setScrapeStatus(
      `🚀 Injected ${createdList.length} unique leads into your CRM Pipeline (Zero duplicates)!`
    );
  };

  // Generate personalized founder outreach message across 4 strategic angles AND 3 follow-up touches
  const buildPersonalizedPitch = (
    p: ScrapedProspect,
    angleOverride?: "no_website" | "revamp" | "mobile_apk" | "platform_crm",
    stageOverride?: "day1" | "day3" | "day7"
  ) => {
    const activeAngle =
      angleOverride ||
      (isWithoutWebsite(p)
        ? "no_website"
        : targetGapMode === "no_apk"
        ? "mobile_apk"
        : "revamp");

    const activeStage = stageOverride || "day1";

    // TOUCH 2: DAY 3 VALUE AUDIT & PROTOTYPE FOLLOW-UP
    if (activeStage === "day3") {
      const offerLabel =
        activeAngle === "no_website"
          ? "an official high-converting website + WhatsApp client funnel"
          : activeAngle === "mobile_apk"
          ? "a custom branded Android APK & iOS Mobile App"
          : activeAngle === "revamp"
          ? "a modern website revamp + 24/7 AI WhatsApp assistant"
          : `${p.recommendedProduct}`;

      return `Hi ${p.businessName} team,\n\nQuick follow-up on my note earlier this week — I actually put together a quick interactive concept showing how ${offerLabel} would work for ${p.businessName} in ${p.location}.\n\nYou can also inspect one of our live production systems here: ${p.demoUrl}\n\nShould I send the 60-second walkthrough video right here on WhatsApp?\n\nBest,\nOlamide\nLead Partner, Thoram Group\nhttps://thoramgroup.com`;
    }

    // TOUCH 3: DAY 7 PRIORITY SLOT / BREAKUP MESSAGE
    if (activeStage === "day7") {
      return `Hello ${p.businessName} team,\n\nI know things get busy running operations in ${p.location}, so I won't flood your inbox.\n\nWe have one onboarding slot open this month for a ${p.category.toLowerCase()} partner in ${p.location} looking to launch ${
        activeAngle === "no_website"
          ? "their official web platform & client portal"
          : activeAngle === "mobile_apk"
          ? "their own custom Android APK & iOS mobile app"
          : `a revamped digital platform (${p.recommendedProduct})`
      }.\n\nIf upgrading your digital infrastructure is a priority this quarter, reply "DEMO" and I'll share a tailored rollout plan for ${p.businessName}.\n\nWarm regards,\nOlamide\nLead Partner, Thoram Group\nhttps://thoramgroup.com`;
    }

    // TOUCH 1: DAY 1 INITIAL VALUE HOOK
    if (activeAngle === "no_website") {
      return `Hello ${p.businessName} team,\n\nI came across ${p.businessName} in ${p.location} today and noticed that while you have a strong local reputation${
        p.websiteStatus === "social_only" ? " on social media" : ""
      }, you don't currently have a dedicated official website or automated client portal.\n\nRight now, prospective clients searching Google for ${p.category.toLowerCase()} in ${p.location} are landing on competitors who have an instant web booking & WhatsApp conversion funnel.\n\nAt Thoram Group, we can launch a high-converting official website + automated WhatsApp inquiry system + ${p.recommendedProduct} for ${p.businessName} in under 7 days (see our live work at ${p.demoUrl}).\n\nAre you open to a quick 5-minute WhatsApp chat this week so I can show you a live preview for ${p.businessName}?\n\nBest regards,\nOlamide\nLead Partner, Thoram Group\nhttps://thoramgroup.com`;
    }

    if (activeAngle === "revamp") {
      return `Hello ${p.businessName} team,\n\nI just reviewed ${p.businessName}'s current website (${
        p.website || "online presence"
      }) in ${p.location} and spotted a few quick upgrades that could immediately double your inbound client inquiries.\n\nMost websites act like static brochures — visitors browse and leave without booking. At Thoram Group, we revamp existing websites into modern, ultra-fast conversion engines integrated with a 24/7 AI WhatsApp Assistant and ${p.recommendedProduct} (${p.demoUrl}).\n\nWould you be open to a 5-minute WhatsApp walkthrough showing how a revamped platform + AI integration would look for ${p.businessName}?\n\nBest regards,\nOlamide\nLead Partner, Thoram Group\nhttps://thoramgroup.com`;
    }

    if (activeAngle === "mobile_apk") {
      return `Hello ${p.businessName} team,\n\nI noticed ${p.businessName} in ${p.location} doesn't yet have a dedicated Android APK / iOS Mobile App for your clients.\n\nAt Thoram Group, we engineer custom branded Mobile Apps (Android APK + Google Play + Apple App Store) and management portals — like our live platforms at ${p.demoUrl} and https://thoramgroup.com/case-studies.\n\nHaving your own downloadable mobile APK puts ${p.businessName} directly on your customers' phones with push notifications, instant Paystack payments, and self-service booking.\n\nCan I share a quick 2-minute interactive mobile app demo tailored to ${p.businessName} on WhatsApp?\n\nBest regards,\nOlamide\nLead Partner, Thoram Group\nhttps://thoramgroup.com`;
    }

    return `Hello ${p.businessName} team,\n\nI came across ${p.businessName} in ${p.location} while reviewing leading ${p.category.toLowerCase()} operations.\n\nAt Thoram Group, ${activePreset.pitchHook}\n\nWe already have the core architecture built and live (${p.demoUrl}), which means we can deploy a tailored version for ${p.businessName} in days rather than months.\n\nAre you open to a quick 5-minute WhatsApp walkthrough this week?\n\nBest regards,\nOlamide\nLead Partner, Thoram Group\nhttps://thoramgroup.com`;
  };

  // Build Google & Social Media X-Ray Dork URL for deep pages
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

    // If a specific Social Media / Marketplace Platform is selected, use its site: operator
    let siteFilter = "";
    if (activePlatform.siteOperator) {
      siteFilter = `${activePlatform.siteOperator} `;
    } else if (targetGapMode === "no_website") {
      siteFilter = `(site:instagram.com OR site:facebook.com OR site:jiji.ng OR site:businesslist.com.ng OR "whatsapp") `;
    } else if (targetGapMode === "needs_revamp") {
      siteFilter = `-site:instagram.com -site:facebook.com -site:jiji.ng `;
    }

    const dork = `${siteFilter}${effectiveQuery} "${location}" ${phonePattern} ("@gmail.com" OR "info@" OR "contact" OR "whatsapp" OR "call")`;
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
              <span>God-Level Outbound B2B & Social Media Acquisition Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Scrape Web, Instagram, LinkedIn & Jiji. Zero Duplicates.
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Target businesses with <strong>no website</strong>, businesses needing a{" "}
              <strong>website revamp + AI</strong>, or companies needing a{" "}
              <strong>custom Mobile App / Android APK</strong> across Google, Instagram, Facebook,
              LinkedIn & Jiji — with automatic duplicate protection and 3-stage follow-up scripts.
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
                    placeholder="Paste Serper API key to auto-scrape Google, Instagram & LinkedIn Pages 1–10..."
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1.5 flex flex-col justify-end">
                  <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
                    💡 <strong>Zero-Cost Built-In Mode:</strong> Even without an API key, our engine scrapes OpenStreetMap registries, live web/social search pages, and includes the <strong>Social & Google Page 1–10 X-Ray Ripper</strong> for unlimited free lead extraction!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DATABASE TABLES STATUS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-zinc-900/[0.08] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase text-zinc-500 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-orange-600" />
              <span>Unique Prospects</span>
            </div>
            <div className="text-xl font-bold text-zinc-900 mt-1">
              {prospects.length} <span className="text-xs font-normal text-zinc-500">deduped</span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-semibold">
            0 Duplicates
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-900/[0.08] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase text-zinc-500 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>No Website / Social Only</span>
            </div>
            <div className="text-xl font-bold text-zinc-900 mt-1">
              {prospects.filter((p) => isWithoutWebsite(p)).length}{" "}
              <span className="text-xs font-normal text-zinc-500">need new website</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTableFilter("no_website")}
            className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-700 hover:bg-rose-500/20 font-semibold"
          >
            Filter 🚫
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-900/[0.08] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase text-zinc-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>No Mobile App / APK</span>
            </div>
            <div className="text-xl font-bold text-zinc-900 mt-1">
              {prospects.filter((p) => !p.hasMobileApp).length}{" "}
              <span className="text-xs font-normal text-zinc-500">need APK / App</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTableFilter("no_apk")}
            className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 font-semibold"
          >
            Filter 📱
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-900/[0.08] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase text-zinc-500 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Uncontacted Ready</span>
            </div>
            <div className="text-xl font-bold text-zinc-900 mt-1">
              {prospects.filter((p) => !p.outreachSent).length}{" "}
              <span className="text-xs font-normal text-zinc-500">to message</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setTableFilter("uncontacted")}
            className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 font-semibold"
          >
            Filter 🆕
          </button>
        </div>
      </div>

      {/* STEP 1: SELECT TARGET INDUSTRY, DIGITAL GAP FOCUS, SOCIAL PLATFORM & LOCATION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-900/[0.08] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-900/[0.06]">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-orange-600 font-semibold">
              Step 1 · Target Parameters & Social Channels
            </span>
            <h3 className="text-lg font-bold text-zinc-900">
              Choose Industry, Digital Gap, Social Platform & Location
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
              🔍 Social & Google X-Ray Ripper
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

        {/* 1. Industry Presets Grid */}
        <div>
          <label className="block text-xs font-mono uppercase text-zinc-500 mb-2.5">
            1. Select High-Value Industry (Auto-matches your live case study pitch)
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

        {/* 2. Target Digital Gap / Opportunity Selector */}
        <div>
          <label className="block text-xs font-mono uppercase text-zinc-500 mb-2.5">
            2. Target Digital Gap / Opportunity Focus (No Website, Website Revamp, or No Mobile APK)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              {
                id: "all",
                title: "🎯 All Prospects",
                subtitle: "Find all businesses (No Website, Revamp & APK)",
                badge: "Recommended",
              },
              {
                id: "no_website",
                title: "🚫 No Website (Build New Site)",
                subtitle: "Prioritize businesses with NO website or Instagram/FB only",
                badge: "High Demand",
              },
              {
                id: "needs_revamp",
                title: "🔧 Website Revamp + AI",
                subtitle: "Target businesses with outdated websites needing AI & UX",
                badge: "Web Revamp",
              },
              {
                id: "no_apk",
                title: "📱 No Mobile App / APK",
                subtitle: "Target businesses without an Android APK or iOS App",
                badge: "Pitch APK",
              },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  setTargetGapMode(mode.id as any);
                  if (mode.id === "no_website") setTableFilter("no_website");
                  else if (mode.id === "needs_revamp") setTableFilter("needs_revamp");
                  else if (mode.id === "no_apk") setTableFilter("no_apk");
                  else setTableFilter("all");
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  targetGapMode === mode.id
                    ? "bg-zinc-900 border-zinc-900 text-white shadow-sm"
                    : "bg-zinc-50/80 border-zinc-900/[0.08] text-zinc-700 hover:border-zinc-400"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold">{mode.title}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      targetGapMode === mode.id
                        ? "bg-orange-500 text-white"
                        : "bg-zinc-200/80 text-zinc-600"
                    }`}
                  >
                    {mode.badge}
                  </span>
                </div>
                <div
                  className={`text-[11px] mt-1 leading-snug ${
                    targetGapMode === mode.id ? "text-zinc-300" : "text-zinc-500"
                  }`}
                >
                  {mode.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Target Platform / Social Media Source Selector */}
        <div>
          <label className="block text-xs font-mono uppercase text-zinc-500 mb-2.5">
            3. Target Source Platform — Scrape Web, Instagram, Facebook, LinkedIn, Jiji, TikTok or Directories
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PLATFORM_CHANNELS.map((channel) => (
              <button
                key={channel.id}
                type="button"
                onClick={() => {
                  setTargetPlatformId(channel.id);
                  if (
                    channel.id === "instagram" ||
                    channel.id === "facebook" ||
                    channel.id === "tiktok" ||
                    channel.id === "jiji_property"
                  ) {
                    setTargetGapMode("no_website");
                    setTableFilter("no_website");
                  }
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  targetPlatformId === channel.id
                    ? "bg-orange-600 text-white border-orange-600 shadow-sm"
                    : "bg-zinc-50/80 border-zinc-900/[0.08] text-zinc-700 hover:border-zinc-400"
                }`}
              >
                <div className="text-xs font-bold">{channel.label}</div>
                <div
                  className={`text-[11px] mt-1 leading-snug ${
                    targetPlatformId === channel.id ? "text-orange-100" : "text-zinc-500"
                  }`}
                >
                  {channel.description}
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

        {/* Contact Guard & Key Helper Callout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-orange-50/70 border border-orange-500/20">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={requireContact}
              onChange={(e) => setRequireContact(e.target.checked)}
              className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
            />
            <span className="text-xs font-bold text-zinc-900">
              📞 Require Contact Details: Only save leads that have a verified Phone, WhatsApp or Email
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
              ✓ Skips Bare Map Pins
            </span>
          </label>

          <button
            type="button"
            onClick={() => setShowApiKeys(!showApiKeys)}
            className="text-xs font-semibold text-orange-700 hover:text-orange-900 underline inline-flex items-center gap-1.5"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{showApiKeys ? "Hide Key Settings" : "🔑 Connect Free Google Key (100% Verified Contacts)"}</span>
          </button>
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
                    Scrape {activePreset.label.replace(/^[^\s]+\s/, "")} on{" "}
                    {activePlatform.shortBadge} in {location} (
                    {targetGapMode === "no_website"
                      ? "Prioritize NO WEBSITE"
                      : targetGapMode === "needs_revamp"
                      ? "Prioritize WEBSITE REVAMP"
                      : targetGapMode === "no_apk"
                      ? "Prioritize NO MOBILE APK"
                      : `Pages 1–${maxPages}`}{" "}
                    · Auto-Deduplicated)
                  </span>
                </>
              )}
            </button>
          </form>
        )}

        {/* MODE 2: SOCIAL & GOOGLE X-RAY DEEP DORK + RAW CONTACT RIPPER */}
        {scrapeMode === "xray_dork" && (
          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-900/[0.08] space-y-5">
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase text-orange-600">
                Step A · Open Deep {activePlatform.shortBadge} X-Ray Search (Pages 1 to 10)
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Click any Page button below to X-Ray <strong>{activePlatform.label}</strong> in{" "}
                <strong>{location}</strong>. It forces Google to surface profiles and pages that
                publicly list their{" "}
                <strong>WhatsApp numbers (080/081/090/070/+234)</strong> and{" "}
                <strong>email addresses</strong> right in the search results!
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
                    <span>
                      {activePlatform.shortBadge} Page {pageIdx + 1}
                    </span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-zinc-200">
              <div className="text-xs font-mono font-bold uppercase text-emerald-700">
                Step B · Paste Copied Page Text (Ctrl+A, Ctrl+C) to Rip & Deduplicate All Contacts
              </div>
              <textarea
                rows={4}
                value={rawPasteText}
                onChange={(e) => setRawPasteText(e.target.value)}
                placeholder="On the Instagram/LinkedIn/Facebook/Jiji/Google results page, press Ctrl+A then Ctrl+C, and paste everything here. Our parser will automatically extract every Business Name, Phone/WhatsApp number, Email, and skip any duplicate contacts..."
                className="w-full bg-white border border-zinc-300 rounded-xl p-3.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-orange-600"
              />
              <button
                type="button"
                onClick={handleExtractFromRawText}
                disabled={!rawPasteText.trim() || isScraping}
                className="btn-solid py-3 px-6 rounded-xl text-xs font-bold inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Extract & Deduplicate All Phones, Emails & Businesses</span>
              </button>
            </div>
          </div>
        )}

        {/* MODE 3: WEBSITE URL SPIDER */}
        {scrapeMode === "url_spider" && (
          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-900/[0.08] space-y-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-orange-600">
                Deep Website Contact & APK Spider
              </div>
              <p className="text-xs text-zinc-600 mt-0.5">
                Paste 1 to 30 business website URLs (one per line). Our spider will crawl their homepage, extract their phone numbers, WhatsApp links, and emails, check for Mobile APK links, and skip duplicates.
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
                  <span>Crawl Websites & Extract Unique Contacts</span>
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

      {/* STEP 2: SCRAPED PROSPECTS STAGING TABLE (`scraped_prospects`) — ALWAYS VISIBLE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-900/[0.08] shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-900/[0.06]">
          <div>
            <div className="text-xs font-mono uppercase text-emerald-600 font-bold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>Table 1 · Scraped Prospects Staging Table (`scraped_prospects`)</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mt-0.5">
              {filteredProspects.length} Showing of {prospects.length} Unique Businesses (
              {selectedIds.size} Selected)
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handlePurgeEmptyPins}
              disabled={prospects.length === 0}
              className="btn-ghost text-xs py-2 px-3 inline-flex items-center gap-1.5 text-amber-700 hover:bg-amber-50"
              title="Remove any scraped map pins that have neither a phone number nor an email"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>🧹 Purge Contactless Pins</span>
            </button>

            <button
              type="button"
              onClick={handleManualDeduplicate}
              disabled={prospects.length === 0}
              className="btn-ghost text-xs py-2 px-3 inline-flex items-center gap-1.5 text-emerald-700 hover:bg-emerald-50"
              title="Merge and remove any duplicate phone numbers, emails or business names"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>🧹 Deduplicate Table</span>
            </button>

            <button
              type="button"
              onClick={() => exportProspectsToCSV(filteredProspects)}
              disabled={filteredProspects.length === 0}
              className="btn-ghost text-xs py-2 px-3 inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (selectedIds.size === filteredProspects.length && filteredProspects.length > 0) {
                  setSelectedIds(new Set());
                } else {
                  setSelectedIds(new Set(filteredProspects.map((p) => p.id)));
                }
              }}
              disabled={filteredProspects.length === 0}
              className="btn-ghost text-xs py-2 px-3"
            >
              {selectedIds.size === filteredProspects.length && filteredProspects.length > 0
                ? "Deselect All"
                : "Select All Shown"}
            </button>

            <button
              type="button"
              onClick={() => {
                if (confirm("Clear all scraped prospects from the staging table?")) {
                  updateAndPersistProspects(() => []);
                  setSelectedIds(new Set());
                }
              }}
              disabled={prospects.length === 0}
              className="btn-ghost text-xs py-2 px-3 text-rose-600 hover:bg-rose-50 inline-flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Table</span>
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

        {/* Table Filter Pills (Including No Website, Website Revamp, No Mobile APK, Uncontacted) & Search */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "all", label: `All Rows (${prospects.length})` },
              {
                id: "no_website",
                label: `🚫 No Website (${prospects.filter((p) => isWithoutWebsite(p)).length})`,
              },
              {
                id: "needs_revamp",
                label: `🔧 Website Revamp (${
                  prospects.filter((p) => !isWithoutWebsite(p)).length
                })`,
              },
              {
                id: "no_apk",
                label: `📱 No Mobile APK (${prospects.filter((p) => !p.hasMobileApp).length})`,
              },
              {
                id: "uncontacted",
                label: `🆕 Uncontacted (${prospects.filter((p) => !p.outreachSent).length})`,
              },
              {
                id: "has_phone",
                label: `📞 Has Phone (${prospects.filter((p) => p.phone).length})`,
              },
              {
                id: "has_email",
                label: `✉️ Has Email (${prospects.filter((p) => p.email).length})`,
              },
              {
                id: "pending_crm",
                label: `⏳ Not In CRM (${prospects.filter((p) => !p.injected).length})`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTableFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  tableFilter === tab.id
                    ? "bg-zinc-900 text-white shadow-2xs"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full xl:w-72">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              placeholder="Filter table by name, phone, platform..."
              className="w-full bg-zinc-50 border border-zinc-900/[0.08] rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-900 focus:outline-none focus:border-orange-600"
            />
          </div>
        </div>

        {/* Prospects Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-900/[0.08]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-900/[0.06] text-[11px] font-mono uppercase text-zinc-500">
              <tr>
                <th className="py-3 px-3 w-8">✓</th>
                <th className="py-3 px-3">Business, Score & Recon</th>
                <th className="py-3 px-3">Phone / WhatsApp & Email (Editable)</th>
                <th className="py-3 px-3">Website & Mobile APK Status</th>
                <th className="py-3 px-3">Diagnosed Opportunity & Product Pitch</th>
                <th className="py-3 px-3 text-right">Outreach & CRM Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/[0.06]">
              {filteredProspects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-zinc-400 font-mono text-xs">
                    {prospects.length === 0
                      ? "No scraped businesses in table yet. Choose an industry or social platform above and click 'Scrape' to populate this table."
                      : "No rows match your current filter. Click 'All Rows' above to view all prospects."}
                  </td>
                </tr>
              ) : (
                filteredProspects.map((p) => {
                  const isSelected = selectedIds.has(p.id);
                  const waNumber = formatPhoneForWhatsApp(p.phone);
                  const pitchText = encodeURIComponent(buildPersonalizedPitch(p));
                  const withoutSite = isWithoutWebsite(p);
                  const leadScore = calculateLeadScore(p);

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

                      <td className="py-3.5 px-3 max-w-[250px] space-y-1">
                        <div className="font-bold text-zinc-900 truncate">{p.businessName}</div>
                        <div className="text-xs text-zinc-500 truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                          <span>{p.location}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1 pt-0.5">
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                              leadScore >= 80
                                ? "bg-orange-500/15 text-orange-700 border border-orange-500/30"
                                : leadScore >= 60
                                ? "bg-emerald-500/10 text-emerald-700"
                                : "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            🔥 {leadScore}/100
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600">
                            {p.sourcePage}
                          </span>
                        </div>
                        {/* 1-Click Live Social & Google Recon Links */}
                        <div className="flex items-center gap-2 pt-0.5 text-[10px] font-mono">
                          <a
                            href={`https://www.google.com/search?q=${encodeURIComponent(
                              `${p.businessName} ${p.location}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-orange-600 hover:underline"
                            title="Inspect business on Google"
                          >
                            🔍 Google
                          </a>
                          <a
                            href={`https://www.google.com/search?q=${encodeURIComponent(
                              `site:instagram.com "${p.businessName}"`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-pink-600 hover:underline"
                            title="Find their Instagram profile"
                          >
                            📸 IG
                          </a>
                          <a
                            href={`https://www.google.com/search?q=${encodeURIComponent(
                              `site:linkedin.com "${p.businessName}" ${p.location}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-blue-600 hover:underline"
                            title="Find Founder/CEO on LinkedIn"
                          >
                            💼 LinkedIn
                          </a>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 space-y-1.5 font-mono text-xs min-w-[210px]">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                            <input
                              type="text"
                              value={p.phone}
                              onChange={(e) =>
                                handleInlineProspectEdit(p.id, "phone", e.target.value)
                              }
                              placeholder="+Add Phone / WhatsApp"
                              className="w-full bg-zinc-50/80 hover:bg-white focus:bg-white border border-transparent hover:border-zinc-200 focus:border-orange-500 rounded px-1.5 py-0.5 text-xs text-emerald-700 font-semibold placeholder-zinc-400 focus:outline-none"
                            />
                          </div>
                          {!p.phone && (
                            <a
                              href={`https://www.google.com/search?q=${encodeURIComponent(
                                `${p.businessName} ${p.location} phone number whatsapp`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-orange-600 hover:underline flex items-center gap-1 pl-4 pt-0.5"
                            >
                              <span>🔍 Find Phone on Google</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-orange-600 shrink-0" />
                            <input
                              type="text"
                              value={p.email}
                              onChange={(e) =>
                                handleInlineProspectEdit(p.id, "email", e.target.value)
                              }
                              placeholder="+Add Email address"
                              className="w-full bg-zinc-50/80 hover:bg-white focus:bg-white border border-transparent hover:border-zinc-200 focus:border-orange-500 rounded px-1.5 py-0.5 text-xs text-zinc-700 placeholder-zinc-400 focus:outline-none"
                            />
                          </div>
                          {!p.email && (
                            <a
                              href={`https://www.google.com/search?q=${encodeURIComponent(
                                `${p.businessName} ${p.location} email contact address`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-blue-600 hover:underline flex items-center gap-1 pl-4 pt-0.5"
                            >
                              <span>🔍 Find Email on Google</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-3 font-mono text-xs space-y-1.5 min-w-[190px]">
                        {/* Website Status Badge */}
                        <div>
                          {!p.website ? (
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 font-semibold border border-rose-500/20">
                              🚫 No Website · Pitch New Site
                            </span>
                          ) : withoutSite ? (
                            <div className="space-y-0.5">
                              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 font-semibold border border-rose-500/20">
                                📲 Social Only · Pitch Website
                              </span>
                              <a
                                href={p.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-[10px] text-blue-600 hover:underline truncate max-w-[170px]"
                              >
                                {p.website.replace(/^https?:\/\/(www\.)?/, "")}
                              </a>
                            </div>
                          ) : (
                            <div className="space-y-0.5">
                              <a
                                href={p.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline inline-flex items-center gap-1 text-[11px] truncate max-w-[170px] font-semibold"
                              >
                                <Globe className="w-3 h-3 shrink-0" />
                                <span className="truncate">
                                  {p.website.replace(/^https?:\/\/(www\.)?/, "")}
                                </span>
                              </a>
                              <div>
                                <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-700 font-semibold">
                                  🔧 Pitch Website Revamp + AI
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Mobile APK Status Badge (Clickable Toggle) */}
                        <div>
                          <button
                            type="button"
                            onClick={() => handleToggleMobileApp(p.id)}
                            title="Click to toggle Mobile APK status"
                            className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-semibold transition-colors ${
                              p.hasMobileApp
                                ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                                : "bg-amber-500/15 text-amber-800 border border-amber-500/30 hover:bg-amber-500/25"
                            }`}
                          >
                            {p.hasMobileApp
                              ? "✅ Has Mobile APK"
                              : "📱 No Mobile APK · Pitch App"}
                          </button>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 max-w-[260px]">
                        <div className="text-xs font-semibold text-orange-600">
                          Pitch: {p.recommendedProduct}
                        </div>
                        <div className="text-xs text-zinc-600 mt-0.5 leading-snug">
                          {p.techGap}
                        </div>
                        {/* Outreach Contacted Status Toggle */}
                        <button
                          type="button"
                          onClick={() => handleMarkOutreachSent(p.id)}
                          className={`mt-1.5 inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded font-semibold transition-colors ${
                            p.outreachSent
                              ? "bg-emerald-500/15 text-emerald-800 border border-emerald-500/30"
                              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                          }`}
                          title="Click to toggle whether you have messaged this prospect"
                        >
                          {p.outreachSent ? "✅ Outreach Sent" : "🆕 Uncontacted"}
                        </button>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Open AI Pitch Generator Modal */}
                          <button
                            type="button"
                            onClick={() => {
                              setPitchAngle(
                                withoutSite
                                  ? "no_website"
                                  : targetGapMode === "no_apk"
                                  ? "mobile_apk"
                                  : "revamp"
                              );
                              setFollowUpStage("day1");
                              setPitchProspect(p);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                            title="View & Switch Pitch Angles + Day 1 / Day 3 / Day 7 Follow-Ups"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                            <span>Pitch Script</span>
                          </button>

                          {/* 1-Click Direct WhatsApp Pitch (Auto-marks Outreach Sent!) */}
                          {waNumber && (
                            <a
                              href={`https://wa.me/${waNumber}?text=${pitchText}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => handleMarkOutreachSent(p.id, true)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                              title="Send Pitch on WhatsApp (Auto-marks as Contacted)"
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
                              <span>+ CRM</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              deleteScrapedProspectFromDB(p.id);
                              updateAndPersistProspects((prev) =>
                                prev.filter((item) => item.id !== p.id)
                              );
                            }}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Remove row from Supabase"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* STEP 3: SCRAPE CAMPAIGNS & NICHE HISTORY TABLE (`scrape_campaigns`) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-900/[0.08] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-900/[0.06]">
          <div>
            <div className="text-xs font-mono uppercase text-purple-600 font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Table 2 · Scrape Campaigns History Table (`scrape_campaigns`)</span>
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mt-0.5">
              Recent Outbound Niche Runs ({campaignLogs.length})
            </h3>
          </div>

          {campaignLogs.length > 0 && (
            <button
              type="button"
              onClick={() => {
                clearScrapeCampaignLogs();
                setCampaignLogs([]);
              }}
              className="btn-ghost text-xs py-1.5 px-3 text-zinc-500 hover:text-rose-600"
            >
              Clear History
            </button>
          )}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-900/[0.08]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-900/[0.06] text-[11px] font-mono uppercase text-zinc-500">
              <tr>
                <th className="py-3 px-4">Campaign ID</th>
                <th className="py-3 px-4">Target Industry / Niche</th>
                <th className="py-3 px-4">City / Location</th>
                <th className="py-3 px-4">Engine Mode</th>
                <th className="py-3 px-4">Depth</th>
                <th className="py-3 px-4">Unique Businesses & Contacts Added</th>
                <th className="py-3 px-4 text-right">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/[0.06]">
              {campaignLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-zinc-400 font-mono text-xs">
                    No scrape campaigns logged yet. Every scrape run is automatically recorded here.
                  </td>
                </tr>
              ) : (
                campaignLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-zinc-50/80">
                    <td className="py-3 px-4 font-mono text-xs text-orange-600 font-semibold">
                      {log.id}
                    </td>
                    <td className="py-3 px-4 font-bold text-zinc-900">{log.industry}</td>
                    <td className="py-3 px-4 text-zinc-600">{log.location}</td>
                    <td className="py-3 px-4 font-mono text-xs text-zinc-600">{log.mode}</td>
                    <td className="py-3 px-4 font-mono text-xs text-zinc-600">
                      {log.pagesScanned} pages
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">
                      <span className="font-bold text-zinc-900">{log.leadsFound} unique leads</span>{" "}
                      <span className="text-emerald-700">({log.phonesFound} phones</span>,{" "}
                      <span className="text-orange-600">{log.emailsFound} emails)</span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-xs text-zinc-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI OUTBOUND PITCH MODAL WITH 4-ANGLE SWITCHER + 3-STAGE FOLLOW-UP SEQUENCE */}
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
              className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-900/[0.08] space-y-5 max-h-[92vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-900/[0.08]">
                <div>
                  <span className="text-xs font-mono uppercase text-orange-600 font-semibold">
                    Tailored Founder Outreach & Follow-Up Sequence
                  </span>
                  <h3 className="text-xl font-bold text-zinc-900 mt-0.5">
                    Pitching {pitchProspect.businessName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className="text-xs text-zinc-500">
                      Product Match: <strong>{pitchProspect.recommendedProduct}</strong>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/15 text-orange-700 font-semibold">
                      🔥 Score: {calculateLeadScore(pitchProspect)}/100
                    </span>
                    {isWithoutWebsite(pitchProspect) ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 font-semibold">
                        🚫 No Standalone Website
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 font-semibold">
                        🔧 Has Website (Revamp Candidate)
                      </span>
                    )}
                    {!pitchProspect.hasMobileApp && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 font-semibold">
                        📱 No Mobile APK
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setPitchProspect(null)}
                  className="text-zinc-400 hover:text-zinc-900 text-lg"
                >
                  ✕
                </button>
              </div>

              {/* 1. 4-Angle Pitch Switcher */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-zinc-500">
                  1. Select What You Are Pitching:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "no_website", label: "🚫 New Website Build" },
                    { id: "revamp", label: "🔧 Website Revamp + AI" },
                    { id: "mobile_apk", label: "📱 Mobile App / APK" },
                    { id: "platform_crm", label: "🚀 Industry CRM / Portal" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPitchAngle(tab.id as any)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                        pitchAngle === tab.id
                          ? "bg-zinc-900 text-white border-zinc-900 shadow-2xs"
                          : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. 3-Stage Follow-Up Sequence Switcher (Day 1, Day 3, Day 7) */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-zinc-500">
                  2. Select Follow-Up Cadence Touch (60% of deals close on Touch #2 & #3):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: "day1", label: "1️⃣ Day 1 · Initial Hook & Live Demo" },
                    { id: "day3", label: "2️⃣ Day 3 · Concept / Audit Follow-Up" },
                    { id: "day7", label: "3️⃣ Day 7 · Priority Slot / Breakup" },
                  ].map((stage) => (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setFollowUpStage(stage.id as any)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                        followUpStage === stage.id
                          ? "bg-orange-600 text-white border-orange-600 shadow-2xs"
                          : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      {stage.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-zinc-500">
                    High-Converting WhatsApp / Email Script
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        buildPersonalizedPitch(pitchProspect, pitchAngle, followUpStage)
                      );
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
                  {buildPersonalizedPitch(pitchProspect, pitchAngle, followUpStage)}
                </pre>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  {pitchProspect.phone && (
                    <a
                      href={`https://wa.me/${formatPhoneForWhatsApp(
                        pitchProspect.phone
                      )}?text=${encodeURIComponent(
                        buildPersonalizedPitch(pitchProspect, pitchAngle, followUpStage)
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleMarkOutreachSent(pitchProspect.id, true)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send on WhatsApp Now</span>
                    </a>
                  )}

                  {pitchProspect.email && (
                    <a
                      href={`mailto:${pitchProspect.email}?subject=${encodeURIComponent(
                        `Software, Web & Mobile App Partnership — ${pitchProspect.businessName}`
                      )}&body=${encodeURIComponent(
                        buildPersonalizedPitch(pitchProspect, pitchAngle, followUpStage)
                      )}`}
                      onClick={() => handleMarkOutreachSent(pitchProspect.id, true)}
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
