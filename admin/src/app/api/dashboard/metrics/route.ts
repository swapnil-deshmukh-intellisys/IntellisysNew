import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { createServiceClient } from '@/lib/supabase';
import { fail, ok } from '@/lib/http';

export async function GET(req: NextRequest) {
  const guard = requireApiRole(req, ['super_admin', 'admin', 'recruiter', 'sales_ops', 'viewer']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const supabase = createServiceClient();

  const [inquiries, applications, resumes, jobs, pending] = await Promise.all([
    supabase.from('contact_inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('job_applications').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('resumes').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('jobs').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('cms_pages').select('id', { count: 'exact', head: true }).in('publish_status', ['draft', 'review']),
  ]);

  return ok({
    newInquiries: inquiries.count || 0,
    newApplications: applications.count || 0,
    unreadResumes: resumes.count || 0,
    publishedJobs: jobs.count || 0,
    pendingApprovals: pending.count || 0,
  });
}