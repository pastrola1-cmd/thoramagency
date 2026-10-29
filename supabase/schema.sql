-- ============================================================================
-- Thoram Group Agency CRM & Outbound Lead Scraper PostgreSQL Schema
-- Supabase Project: Thoramgroup ltd (cvhopmfoklijshhlmcbi)
-- ============================================================================

-- 1. Master CRM Leads & Client Inquiries Table (`public.crm_leads`)
CREATE TABLE IF NOT EXISTS public.crm_leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  company TEXT DEFAULT '',
  service TEXT NOT NULL,
  budget TEXT DEFAULT 'Not Specified',
  timeline TEXT DEFAULT 'Flexible',
  message TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new',
  priority TEXT NOT NULL DEFAULT 'high',
  assigned_to TEXT DEFAULT 'Olamide (Lead Partner)',
  notes JSONB NOT NULL DEFAULT '[]'::jsonb,
  next_follow_up TEXT DEFAULT '',
  source TEXT DEFAULT 'Website Contact Form',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Outbound B2B Scraped Prospects Staging Table (`public.scraped_prospects`)
CREATE TABLE IF NOT EXISTS public.scraped_prospects (
  id TEXT PRIMARY KEY,
  business_name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  website TEXT DEFAULT '',
  address TEXT DEFAULT '',
  tech_gap TEXT DEFAULT '',
  recommended_service TEXT DEFAULT '',
  recommended_product TEXT DEFAULT '',
  demo_url TEXT DEFAULT '',
  source_page TEXT DEFAULT '',
  injected BOOLEAN NOT NULL DEFAULT FALSE,
  outreach_sent BOOLEAN NOT NULL DEFAULT FALSE,
  scraped_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Outbound Scrape Campaigns & Niche Runs Log Table (`public.scrape_campaigns`)
CREATE TABLE IF NOT EXISTS public.scrape_campaigns (
  id TEXT PRIMARY KEY,
  industry TEXT NOT NULL,
  location TEXT NOT NULL,
  mode TEXT NOT NULL,
  pages_scanned INTEGER NOT NULL DEFAULT 1,
  leads_found INTEGER NOT NULL DEFAULT 0,
  phones_found INTEGER NOT NULL DEFAULT 0,
  emails_found INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_crm_leads_created_at ON public.crm_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_leads_status ON public.crm_leads (status);
CREATE INDEX IF NOT EXISTS idx_scraped_prospects_scraped_at ON public.scraped_prospects (scraped_at DESC);
CREATE INDEX IF NOT EXISTS idx_scrape_campaigns_created_at ON public.scrape_campaigns (created_at DESC);

-- Row Level Security (RLS) & PostgREST Grants
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraped_prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scrape_campaigns ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow full access to crm_leads" ON public.crm_leads;
CREATE POLICY "Allow full access to crm_leads" ON public.crm_leads FOR ALL TO anon, authenticated, service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow full access to scraped_prospects" ON public.scraped_prospects;
CREATE POLICY "Allow full access to scraped_prospects" ON public.scraped_prospects FOR ALL TO anon, authenticated, service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow full access to scrape_campaigns" ON public.scrape_campaigns;
CREATE POLICY "Allow full access to scrape_campaigns" ON public.scrape_campaigns FOR ALL TO anon, authenticated, service_role USING (true) WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.crm_leads TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.scraped_prospects TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.scrape_campaigns TO anon, authenticated, service_role;

NOTIFY pgrst, 'reload schema';
