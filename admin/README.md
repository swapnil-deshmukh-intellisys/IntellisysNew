# Intellisys Admin Panel

Separate Next.js 15 admin application for operations + CMS management with Supabase RBAC.

## 1) Purpose and Scope
This admin app manages:
- Contact inquiries pipeline (`contact_inquiries`)
- Recruitment pipeline (`job_applications`, `resumes`)
- Jobs lifecycle (`jobs` table)
- Content CMS (`cms_pages`, `cms_sections`)
- Media management (`media_assets` + Supabase Storage)
- Admin user roles (`admin_profiles`)
- Audit logs (`audit_logs`)

Public website forms continue writing through anon keys; admin reads/writes through server-side service-role APIs.

## 2) Architecture

```text
[Public client app] --anon--> [Supabase Postgres + Storage]
        |                            ^
        |                            |
        +---- feature-flag jobs -----+

[Admin app (separate)]
  - UI routes (/dashboard, /leads, /recruitment, /content, /media, /users, /settings)
  - API routes (server-only privileged access)
  - Signed HTTP-only session cookie
  - RBAC checks + audit logging
        |
        +--service role key--> [Supabase Postgres + Storage]
```

## 3) Local Setup

1. Install deps:
```bash
cd admin
npm install
```

2. Create `admin/.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_SESSION_SECRET=replace_with_long_random_secret
NEXT_PUBLIC_ADMIN_BASE_URL=http://localhost:4030
```

3. Apply SQL migration in Supabase SQL editor:
- `admin/supabase/admin_panel_setup.sql`

4. Seed at least one admin profile (super admin):
```sql
insert into public.admin_profiles (user_id, role, display_name, is_active)
values ('<auth_user_uuid>', 'super_admin', 'Primary Admin', true)
on conflict (user_id) do update set role = excluded.role, is_active = true;
```

5. Run admin app:
```bash
npm run dev
```

Admin URL: `http://localhost:4030`

## 4) RBAC Matrix
- `super_admin`: full access (including user role changes)
- `admin`: full operational + content access
- `editor`: CMS + media editing
- `recruiter`: recruitment + jobs workflow
- `sales_ops`: leads management
- `viewer`: read-only dashboards and lists

## 5) Database Schema + Migration Order
Apply in this order:
1. Enums
2. `admin_profiles`
3. Lead/recruitment tables normalization
4. `jobs`
5. CMS tables (`cms_pages`, `cms_sections`)
6. Media + audit tables
7. Indexes
8. RLS + policies
9. CMS page seed rows

Migration file: `admin/supabase/admin_panel_setup.sql`

## 6) API Contracts
Implemented routes:
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/dashboard/metrics`
- `GET /api/leads/contact`
- `PATCH /api/leads/contact/:id`
- `GET /api/recruitment/applications`
- `PATCH /api/recruitment/applications/:id`
- `GET /api/recruitment/resumes`
- `GET /api/jobs`
- `POST /api/jobs`
- `PATCH /api/jobs/:id`
- `DELETE /api/jobs/:id`
- `GET /api/cms/pages/:slug`
- `PATCH /api/cms/pages/:slug`
- `POST /api/media/upload`
- `GET /api/media/list`
- `GET /api/users`
- `PATCH /api/users/:id/role`
- `GET /api/audit-logs`

## 7) Page Map
- `/login`
- `/dashboard`
- `/leads/contact-inquiries`
- `/leads/contact-inquiries/:id`
- `/recruitment/job-applications`
- `/recruitment/applications/:id`
- `/recruitment/resume-bank`
- `/recruitment/jobs`
- `/jobs/new`
- `/jobs/:id/edit`
- `/content/pages`
- `/content/:slug`
- `/media`
- `/users`
- `/settings/general`
- `/settings/integrations`
- `/settings/audit-logs`

## 8) Responsive Rules
- Mobile-first layout
- Tables become stacked cards on small screens
- Bottom mobile navigation for quick modules
- Minimum action button height 44px (`min-h-11`)
- Sticky action bars on create/edit forms for mobile workflow

## 9) Deployment and Rollback
Deployment:
1. Deploy `admin/` as separate app service.
2. Configure env vars.
3. Apply SQL migration.
4. Seed admin profile.

Rollback:
1. Revert deployment to previous image.
2. Disable admin traffic.
3. Revert SQL changes only after data export review.

## 10) Test Strategy
- Auth: login/logout/session expiry
- RBAC: route and API permission checks by role
- Leads/recruitment: status transitions + persistence
- Jobs: draft -> publish -> close cycle
- CMS: draft/review/publish and section updates
- Media: upload + list + path copy
- Audit: mutation entries created for all write APIs
- Responsive: 360px, 640px, 768px, 1024px, 1280px

## 11) Known Risks / Mitigations
- Risk: service role leakage
  - Mitigation: only used in server routes; never sent to client.
- Risk: missing admin profile blocks valid users
  - Mitigation: explicit seed step + clear error message.
- Risk: schema drift with existing Supabase tables
  - Mitigation: migration uses `if not exists` and additive alters.

## Public App Integration
Careers page now supports DB jobs with feature flag:
- `NEXT_PUBLIC_ENABLE_SUPABASE_JOBS=true`
- Falls back to static jobs when flag is off or query fails.