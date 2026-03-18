import { createServiceClient } from '@/lib/supabase';

export async function getDashboardMetrics() {
  const supabase = createServiceClient();

  const [inquiries, applications, resumes, jobs] = await Promise.all([
    supabase.from('contact_inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('job_applications').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('resumes').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('jobs').select('id', { count: 'exact', head: true }).eq('status', 'published'),
  ]);

  return {
    newInquiries: inquiries.count || 0,
    newApplications: applications.count || 0,
    unreadResumes: resumes.count || 0,
    publishedJobs: jobs.count || 0,
  };
}
