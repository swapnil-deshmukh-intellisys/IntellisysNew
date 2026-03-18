-- Intellisys Admin Panel schema setup
create extension if not exists pgcrypto;

-- Enums
DO $$ BEGIN
  create type public.role_type as enum ('super_admin','admin','editor','recruiter','sales_ops','viewer');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  create type public.lead_status as enum ('new','contacted','qualified','won','lost','spam');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  create type public.application_status as enum ('new','screening','interview','shortlisted','hired','rejected','archived');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  create type public.job_status as enum ('draft','published','paused','closed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  create type public.cms_publish_status as enum ('draft','review','published','archived');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Core admin users
create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.role_type not null default 'viewer',
  display_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  location text not null,
  type text not null,
  experience text,
  tags text[] not null default '{}',
  summary text,
  salary text,
  department text,
  status public.job_status not null default 'draft',
  publish_start_at timestamptz,
  publish_end_at timestamptz,
  seo jsonb not null default '{}'::jsonb,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Backfill columns if jobs table already existed before this migration
alter table if exists public.jobs
  add column if not exists category text,
  add column if not exists location text,
  add column if not exists type text,
  add column if not exists experience text,
  add column if not exists tags text[] not null default '{}',
  add column if not exists summary text,
  add column if not exists salary text,
  add column if not exists department text,
  add column if not exists status public.job_status not null default 'draft',
  add column if not exists publish_start_at timestamptz,
  add column if not exists publish_end_at timestamptz,
  add column if not exists seo jsonb not null default '{}'::jsonb,
  add column if not exists created_by uuid,
  add column if not exists updated_by uuid,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

-- Lead sources
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  company text,
  service text,
  message text,
  attachment_bucket text,
  attachment_path text,
  status public.lead_status not null default 'new',
  assigned_to uuid,
  source text default 'website',
  priority text default 'medium',
  last_contacted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Backfill columns if contact_inquiries already existed before this migration
alter table if exists public.contact_inquiries
  add column if not exists company text,
  add column if not exists service text,
  add column if not exists message text,
  add column if not exists attachment_bucket text,
  add column if not exists attachment_path text,
  add column if not exists status public.lead_status not null default 'new',
  add column if not exists assigned_to uuid,
  add column if not exists source text default 'website',
  add column if not exists priority text default 'medium',
  add column if not exists last_contacted_at timestamptz,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  message text,
  job_id uuid references public.jobs(id) on delete set null,
  job_title text,
  attachment_bucket text,
  attachment_path text,
  status public.application_status not null default 'new',
  assigned_to uuid,
  rating int,
  stage_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Backfill columns if job_applications already existed before this migration
alter table if exists public.job_applications
  add column if not exists message text,
  add column if not exists job_id uuid references public.jobs(id) on delete set null,
  add column if not exists job_title text,
  add column if not exists attachment_bucket text,
  add column if not exists attachment_path text,
  add column if not exists status public.application_status not null default 'new',
  add column if not exists assigned_to uuid,
  add column if not exists rating int,
  add column if not exists stage_updated_at timestamptz,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.resumes
  add column if not exists status public.application_status not null default 'new',
  add column if not exists assigned_to uuid,
  add column if not exists tags text[] not null default '{}',
  add column if not exists attachment_bucket text,
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  note text not null,
  created_by uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  publish_status public.cms_publish_status not null default 'draft',
  seo jsonb not null default '{}'::jsonb,
  updated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_sections (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null,
  section_key text not null,
  section_type text not null,
  content jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  updated_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(page_slug, section_key)
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  path text not null,
  file_name text,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid,
  created_at timestamptz not null default now(),
  unique(bucket, path)
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid,
  actor_role public.role_type,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.activity_timeline (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id text not null,
  event text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid,
  created_at timestamptz not null default now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'contact_inquiries_priority_check'
  ) THEN
    ALTER TABLE public.contact_inquiries
      ADD CONSTRAINT contact_inquiries_priority_check
      CHECK (priority IN ('low', 'medium', 'high', 'urgent'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'contact_inquiries_source_check'
  ) THEN
    ALTER TABLE public.contact_inquiries
      ADD CONSTRAINT contact_inquiries_source_check
      CHECK (source IN ('website', 'email', 'phone', 'referral', 'campaign', 'manual'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'job_applications_rating_check'
  ) THEN
    ALTER TABLE public.job_applications
      ADD CONSTRAINT job_applications_rating_check
      CHECK (rating IS NULL OR rating BETWEEN 1 AND 5);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'contact_inquiries_assigned_to_fkey'
  ) THEN
    ALTER TABLE public.contact_inquiries
      ADD CONSTRAINT contact_inquiries_assigned_to_fkey
      FOREIGN KEY (assigned_to) REFERENCES public.admin_profiles(user_id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'job_applications_assigned_to_fkey'
  ) THEN
    ALTER TABLE public.job_applications
      ADD CONSTRAINT job_applications_assigned_to_fkey
      FOREIGN KEY (assigned_to) REFERENCES public.admin_profiles(user_id) ON DELETE SET NULL;
  END IF;
END $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['admin_profiles', 'jobs', 'contact_inquiries', 'job_applications', 'resumes', 'cms_pages', 'cms_sections']
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS %I_set_updated_at ON public.%I', t, t);
    EXECUTE format(
      'CREATE TRIGGER %I_set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()',
      t,
      t
    );
  END LOOP;
END $$;

-- Indexes
create index if not exists contact_inquiries_status_idx on public.contact_inquiries(status, created_at desc);
create index if not exists job_applications_status_idx on public.job_applications(status, created_at desc);
create index if not exists resumes_status_idx on public.resumes(status, created_at desc);
create index if not exists jobs_status_idx on public.jobs(status, updated_at desc);
create index if not exists cms_sections_page_idx on public.cms_sections(page_slug, sort_order);
create index if not exists audit_logs_created_idx on public.audit_logs(created_at desc);

-- RLS
alter table public.admin_profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.job_applications enable row level security;
alter table public.resumes enable row level security;
alter table public.lead_notes enable row level security;
alter table public.cms_pages enable row level security;
alter table public.cms_sections enable row level security;
alter table public.media_assets enable row level security;
alter table public.audit_logs enable row level security;
alter table public.activity_timeline enable row level security;

-- Public website access
DROP POLICY IF EXISTS "Allow public contact inserts" ON public.contact_inquiries;
create policy "Allow public contact inserts" on public.contact_inquiries
for insert to anon, authenticated with check (true);

DROP POLICY IF EXISTS "Allow public job application inserts" ON public.job_applications;
create policy "Allow public job application inserts" on public.job_applications
for insert to anon, authenticated with check (true);

-- Public jobs read (for website feature flag)
DROP POLICY IF EXISTS "Allow public published jobs read" ON public.jobs;
create policy "Allow public published jobs read" on public.jobs
for select to anon, authenticated using (status = 'published');

-- Admin read/write via authenticated users that have profile and active flag
create or replace function public.is_active_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.admin_profiles ap
    where ap.user_id = auth.uid() and ap.is_active = true
  );
$$;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['admin_profiles','jobs','contact_inquiries','job_applications','resumes','lead_notes','cms_pages','cms_sections','media_assets','audit_logs','activity_timeline']
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "%s_admin_select" ON public.%I', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "%s_admin_modify" ON public.%I', t, t);
    EXECUTE format('CREATE POLICY "%s_admin_select" ON public.%I FOR SELECT TO authenticated USING (public.is_active_admin())', t, t);
    EXECUTE format('CREATE POLICY "%s_admin_modify" ON public.%I FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin())', t, t);
  END LOOP;
END $$;

-- Seed pages
insert into public.cms_pages (slug, title, publish_status)
values
  ('homepage', 'Homepage', 'draft'),
  ('services', 'Services', 'draft'),
  ('technologies', 'Technologies', 'draft'),
  ('careers', 'Careers', 'draft'),
  ('contact', 'Contact', 'draft'),
  ('header', 'Header', 'draft'),
  ('footer', 'Footer', 'draft')
on conflict (slug) do nothing;
