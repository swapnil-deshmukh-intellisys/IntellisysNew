'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { DataTable } from '@/components/DataTable';
import { FilterBar } from '@/components/FilterBar';
import { StatusBadge } from '@/components/StatusBadge';

type AppRow = {
  id: string;
  name: string;
  email: string;
  job_title: string;
  status: string;
  created_at: string;
  attachment_url?: string | null;
};

export default function JobApplicationsPage() {
  const [rows, setRows] = useState<AppRow[]>([]);
  const [status, setStatus] = useState('');

  const load = async () => {
    const qs = status ? `?status=${status}` : '';
    const res = await fetch(`/api/recruitment/applications${qs}`, { cache: 'no-store' });
    const data = await res.json();
    setRows(data.rows || []);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <PageHeader title="Job Applications" subtitle="Recruitment pipeline by stage" actions={<button className="btn-secondary" onClick={load}>Refresh</button>} />
      <FilterBar>
        <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All stages</option>
          {['new','screening','interview','shortlisted','hired','rejected','archived'].map((s)=><option key={s}>{s}</option>)}
        </select>
        <button className="btn-primary min-h-11" onClick={load}>Apply</button>
      </FilterBar>
      <DataTable
        columns={[
          { key: 'name', label: 'Candidate' },
          { key: 'email', label: 'Email' },
          { key: 'job_title', label: 'Job' },
          { key: 'status', label: 'Stage', render: (v) => <StatusBadge value={String(v)} /> },
          {
            key: 'attachment_url',
            label: 'Resume',
            render: (v) =>
              v ? (
                <a href={String(v)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  View Resume
                </a>
              ) : (
                <span className="text-xs text-slate-500">No file</span>
              ),
          },
          { key: 'created_at', label: 'Applied', render: (v) => new Date(String(v)).toLocaleString() },
          { key: 'id', label: 'Actions', render: (v) => <Link className="btn-secondary" href={`/recruitment/applications/${String(v)}`}>Open</Link> },
        ]}
        rows={rows}
        rowKey={(r) => r.id}
        mobileCard={(r) => (
          <div>
            <p className="font-semibold">{r.name}</p>
            <p className="text-xs text-slate-600 mt-1">{r.job_title}</p>
            <div className="mt-2"><StatusBadge value={r.status} /></div>
            {r.attachment_url ? (
              <a href={String(r.attachment_url)} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-3">
                View Resume
              </a>
            ) : (
              <p className="text-xs text-slate-500 mt-2">No file attached</p>
            )}
            <Link className="btn-secondary mt-3" href={`/recruitment/applications/${r.id}`}>Open</Link>
          </div>
        )}
      />
    </div>
  );
}
