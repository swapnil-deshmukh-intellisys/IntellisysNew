'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';

export default function RecruitmentJobsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const load = async () => {
    const res = await fetch('/api/jobs', { cache: 'no-store' });
    const data = await res.json();
    setRows(data.rows || []);
  };
  useEffect(() => { load(); }, []);

  return (
    <div>
      <PageHeader
        title="Open Roles"
        subtitle="Publish, pause, and close roles"
        actions={<>
          <Link href="/jobs/new" className="btn-primary">New Role</Link>
          <button className="btn-secondary" onClick={load}>Refresh</button>
        </>}
      />
      <DataTable
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'location', label: 'Location' },
          { key: 'type', label: 'Type' },
          { key: 'status', label: 'Status', render: (v) => <StatusBadge value={String(v)} /> },
          { key: 'updated_at', label: 'Updated', render: (v) => new Date(String(v)).toLocaleString() },
        ]}
        rows={rows}
        rowKey={(r) => r.id}
        rowHref={(r) => `/jobs/${r.id}/edit`}
        mobileCard={(r) => (
          <div>
            <p className="font-semibold">{r.title}</p>
            <div className="mt-2"><StatusBadge value={r.status} /></div>
          </div>
        )}
      />
    </div>
  );
}
