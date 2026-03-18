import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { KpiCard } from '@/components/KpiCard';
import { getDashboardMetrics } from '@/lib/dashboard';

export default async function DashboardPage() {
  const m = await getDashboardMetrics();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Sales and recruitment overview"
        actions={<Link href="/leads/contact-inquiries" className="btn-primary">Open Leads</Link>}
      />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-4 sm:gap-4">
        <Link href="/leads/contact-inquiries" className="block">
          <KpiCard label="Business Leads" value={m.newInquiries || 0} clickable />
        </Link>
        <Link href="/recruitment/job-applications" className="block">
          <KpiCard label="Job Applications" value={m.newApplications || 0} clickable />
        </Link>
        <Link href="/recruitment/resume-bank" className="block">
          <KpiCard label="Talent Pool" value={m.unreadResumes || 0} clickable />
        </Link>
        <Link href="/recruitment/jobs" className="block">
          <KpiCard label="Open Roles" value={m.publishedJobs || 0} clickable />
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-4 sm:p-5">
          <h3 className="text-lg font-semibold text-slate-900">Needs Action</h3>
          <ul className="mt-3 space-y-3 text-[14px] leading-6 text-slate-700 sm:text-sm">
            <li>Sales: review new contact inquiries and assign an owner.</li>
            <li>Recruitment: move fresh job applications into screening.</li>
            <li>Talent Pool: review general resumes for future role matching.</li>
          </ul>
        </div>
        <div className="card p-4 sm:p-5">
          <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Link className="btn-secondary" href="/jobs/new">Create Role</Link>
            <Link className="btn-secondary" href="/recruitment/job-applications">Review Applications</Link>
            <Link className="btn-secondary" href="/recruitment/resume-bank">Open Talent Pool</Link>
            <Link className="btn-secondary" href="/recruitment/jobs">Manage Roles</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
