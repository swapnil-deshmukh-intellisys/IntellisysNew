'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { DataTable } from '@/components/DataTable';

export default function ResumeBankPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [q, setQ] = useState('');

  const load = async (next?: { q?: string }) => {
    const currentQ = next?.q ?? q;
    const res = await fetch(`/api/recruitment/resumes${currentQ ? `?q=${encodeURIComponent(currentQ)}` : ''}`, { cache: 'no-store' });
    const data = await res.json();
    setRows(data.rows || []);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <PageHeader title="Talent Pool" subtitle="General candidate resumes for future or unassigned roles" actions={<button className="btn-secondary" onClick={() => void load()}>Refresh</button>} />

      <div className="mb-4 space-y-3 sm:hidden">
        <div className="card p-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400">
                <circle cx="11" cy="11" r="6" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input className="input pr-10" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search talent pool" />
            </div>
            <button className="btn-primary shrink-0 px-4" onClick={() => void load()}>
              Search
            </button>
          </div>

          {q ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[12px] font-medium text-slate-700"
                onClick={() => {
                  setQ('');
                  void load({ q: '' });
                }}
              >
                Search
                <span className="max-w-[100px] truncate">{q}</span>
                <span className="text-slate-400">x</span>
              </button>
            </div>
          ) : (
            <p className="mt-3 text-[12px] text-slate-500">{rows.length} candidates loaded</p>
          )}
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="card mb-4 flex gap-2 p-3">
          <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name/email/role" />
          <button className="btn-primary min-h-11" onClick={() => void load()}>Search</button>
        </div>
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
                  Resume
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
          <div className="space-y-3">
            <div>
              <p className="font-semibold break-words">{r.name}</p>
              <p className="text-xs text-slate-600 break-all">{r.email}</p>
            </div>
            <p className="text-xs text-slate-600">{r.preferred_role || 'N/A'}</p>
            {r.attachment_url ? (
              <a
                href={String(r.attachment_url)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Resume
              </a>
            ) : (
              <p className="text-xs text-slate-500">No file attached</p>
            )}
          </div>
        )}
      />
    </div>
  );
}
