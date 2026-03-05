'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { DataTable } from '@/components/DataTable';

export default function ResumeBankPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [q, setQ] = useState('');

  const load = async () => {
    const res = await fetch(`/api/recruitment/resumes${q ? `?q=${encodeURIComponent(q)}` : ''}`, { cache: 'no-store' });
    const data = await res.json();
    setRows(data.rows || []);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <PageHeader title="Resume Bank" subtitle="Search and triage direct resume submissions" actions={<button className="btn-secondary" onClick={load}>Refresh</button>} />
      <div className="card p-3 mb-4 flex gap-2">
        <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name/email/role" />
        <button className="btn-primary min-h-11" onClick={load}>Search</button>
      </div>
      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'preferred_role', label: 'Preferred Role' },
          { key: 'status', label: 'Status' },
          {
            key: 'attachment_url',
            label: 'Resume',
            render: (v) =>
              v ? (
                <a
                  href={String(v)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  View Resume
                </a>
              ) : (
                <span className="text-xs text-slate-500">No file</span>
              ),
          },
          { key: 'created_at', label: 'Received', render: (v) => new Date(String(v)).toLocaleString() },
        ]}
        rows={rows}
        rowKey={(r) => r.id}
        mobileCard={(r) => (
          <div>
            <p className="font-semibold">{r.name}</p>
            <p className="text-xs text-slate-600">{r.email}</p>
            <p className="text-xs text-slate-600">{r.preferred_role || 'N/A'}</p>
            {r.attachment_url ? (
              <a
                href={String(r.attachment_url)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary mt-3"
              >
                View Resume
              </a>
            ) : (
              <p className="text-xs text-slate-500 mt-2">No file attached</p>
            )}
          </div>
        )}
      />
    </div>
  );
}
