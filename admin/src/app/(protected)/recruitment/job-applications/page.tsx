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
  linked_job_title?: string | null;
  status: string;
  created_at: string;
  attachment_url?: string | null;
};

export default function JobApplicationsPage() {
  const [rows, setRows] = useState<AppRow[]>([]);
  const [status, setStatus] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const load = async (next?: { status?: string }) => {
    const currentStatus = next?.status ?? status;
    const qs = currentStatus ? `?status=${currentStatus}` : '';
    const res = await fetch(`/api/recruitment/applications${qs}`, { cache: 'no-store' });
    const data = await res.json();
    setRows(data.rows || []);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <PageHeader title="Job Applications" subtitle="Candidates who applied to specific published roles" actions={<button className="btn-secondary" onClick={() => void load()}>Refresh</button>} />

      <div className="mb-4 space-y-3 sm:hidden">
        <div className="card p-3">
          <div className="flex items-center gap-2">
            <div className="flex min-h-11 flex-1 items-center rounded-lg bg-slate-50 px-3 text-[12px] font-medium text-slate-500">
              {rows.length} applications loaded
            </div>
            <button
              className={`btn-secondary shrink-0 px-3 ${mobileFiltersOpen ? 'border-brand-300 bg-brand-50 text-brand-700' : ''}`}
              onClick={() => setMobileFiltersOpen((prev) => !prev)}
              aria-expanded={mobileFiltersOpen}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M4 7h16" />
                <path d="M7 12h10" />
                <path d="M10 17h4" />
              </svg>
              <span className="ml-2">Filters</span>
            </button>
          </div>

          {status ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-[12px] font-medium text-brand-700"
                onClick={() => {
                  setStatus('');
                  void load({ status: '' });
                }}
              >
                Stage
                <span>{status}</span>
                <span className="text-brand-400">x</span>
              </button>
            </div>
          ) : null}
        </div>

        {mobileFiltersOpen ? (
          <div className="card p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
                <p className="mt-1 text-[12px] text-slate-500">Refine the visible application list.</p>
              </div>
              <button className="text-[12px] font-medium text-slate-500" onClick={() => setMobileFiltersOpen(false)}>
                Close
              </button>
            </div>

            <div className="mt-3 space-y-3">
              <div>
                <label className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-slate-500">Application Stage</label>
                <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">All stages</option>
                  {['new', 'screening', 'interview', 'shortlisted', 'hired', 'rejected', 'archived'].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  className="btn-primary"
                  onClick={() => {
                    void load();
                    setMobileFiltersOpen(false);
                  }}
                >
                  Apply
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setStatus('');
                    setMobileFiltersOpen(false);
                    void load({ status: '' });
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="hidden sm:block">
        <FilterBar>
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All stages</option>
            {['new','screening','interview','shortlisted','hired','rejected','archived'].map((s)=><option key={s}>{s}</option>)}
          </select>
          <button className="btn-primary min-h-11" onClick={() => void load()}>Apply</button>
        </FilterBar>
      </div>
      <DataTable
        columns={[
          { key: 'name', label: 'Candidate' },
          { key: 'email', label: 'Email' },
          { key: 'job_title', label: 'Job', render: (_v, r) => r.linked_job_title || r.job_title || '-' },
          { key: 'status', label: 'Stage', render: (v) => <StatusBadge value={String(v)} /> },
          {
            key: 'attachment_url',
            label: 'Resume',
            render: (v) =>
              v ? (
                <a href={String(v)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Resume
                </a>
              ) : (
                <span className="text-xs text-slate-500">No file</span>
              ),
          },
          { key: 'created_at', label: 'Applied', render: (v) => new Date(String(v)).toLocaleString() },
        ]}
        rows={rows}
        rowKey={(r) => r.id}
        rowHref={(r) => `/recruitment/applications/${r.id}`}
        mobileCard={(r) => (
          <div className="space-y-3">
            <p className="font-semibold break-words">{r.name}</p>
            <p className="text-xs text-slate-600 break-words">{r.linked_job_title || r.job_title || '-'}</p>
            <div><StatusBadge value={r.status} /></div>
            {r.attachment_url ? (
              <a href={String(r.attachment_url)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
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
