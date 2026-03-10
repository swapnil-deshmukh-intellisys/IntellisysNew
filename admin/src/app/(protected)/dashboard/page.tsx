import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { KpiCard } from '@/components/KpiCard';

async function getMetrics() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_BASE_URL || 'http://localhost:4030'}/api/dashboard/metrics`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function DashboardPage() {
  const data = await getMetrics();
  const m = data || {};

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Operational overview and pending work"
        actions={<Link href="/leads/contact-inquiries" className="btn-primary">Open Leads</Link>}
      />

      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-4 mb-6">
        <KpiCard label="New Inquiries" value={m.newInquiries || 0} />
        <KpiCard label="New Applications" value={m.newApplications || 0} />
        <KpiCard label="Unread Resumes" value={m.unreadResumes || 0} />
        <KpiCard label="Published Jobs" value={m.publishedJobs || 0} />
        <KpiCard label="Pending Approval" value={m.pendingApprovals || 0} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="font-semibold text-slate-900">Needs Action</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Review new contact inquiries and assign owner.</li>
            <li>Move fresh job applications to screening stage.</li>
            <li>Publish pending CMS drafts after review.</li>
          </ul>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold text-slate-900">Quick Actions</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link className="btn-secondary" href="/jobs/new">Create Job</Link>
            <Link className="btn-secondary" href="/content/pages">Edit Content</Link>
            <Link className="btn-secondary" href="/media">Upload Asset</Link>
            <Link className="btn-secondary" href="/settings/audit-logs">View Logs</Link>
          </div>
        </div>
      </div>
    </div>
  );
}