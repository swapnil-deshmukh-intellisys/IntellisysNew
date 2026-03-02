-- Create table for "Send your resume" submissions from Careers page
create extension if not exists pgcrypto;

create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  preferred_role text,
  message text,
  attachment_path text,
  created_at timestamptz not null default now()
);

-- Helpful indexes for admin filtering/search
create index if not exists resumes_created_at_idx on public.resumes (created_at desc);
create index if not exists resumes_email_idx on public.resumes (email);

-- Enable Row Level Security
alter table public.resumes enable row level security;

-- Allow anonymous/public inserts from website forms
drop policy if exists "Allow public resume inserts" on public.resumes;
create policy "Allow public resume inserts"
on public.resumes
for insert
to anon, authenticated
with check (true);

-- Optional: keep reads restricted by default (no select policy for anon)
