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
        title="Recruitment Jobs"
        subtitle="Publish, pause, and close roles"
        actions={<>
          <Link href="/jobs/new" className="btn-primary">New Job</Link>
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
          { key: 'id', label: 'Actions', render: (v) => <Link href={`/jobs/${String(v)}/edit`} className="btn-secondary">Edit</Link> },
        ]}
        rows={rows}
        rowKey={(r) => r.id}
        mobileCard={(r) => (
          <div>
            <p className="font-semibold">{r.title}</p>
            <div className="mt-2"><StatusBadge value={r.status} /></div>
            <Link href={`/jobs/${r.id}/edit`} className="btn-secondary mt-3">Edit</Link>
          </div>
        )}
      />
    </div>
  );
}