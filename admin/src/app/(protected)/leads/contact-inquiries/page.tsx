'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { FilterBar } from '@/components/FilterBar';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  status: string;
  priority: string;
  created_at: string;
  attachment_url?: string | null;
};

export default function ContactInquiriesPage() {
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  async function load(next?: { q?: string; status?: string }) {
    const params = new URLSearchParams();
    const searchQ = next?.q ?? q;
    const searchStatus = next?.status ?? status;
    if (searchQ) params.set('q', searchQ);
    if (searchStatus) params.set('status', searchStatus);
    const res = await fetch(`/api/leads/contact?${params.toString()}`, { cache: 'no-store' });
    const data = await res.json();
    setRows(data.rows || []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <PageHeader
        title="Business Leads"
        subtitle="Business and sales leads from the public contact form"
        actions={<button className="btn-secondary" onClick={() => void load()}>Refresh</button>}
      />

      <div className="mb-4 space-y-3 sm:hidden">
        <div className="card p-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400">
                <circle cx="11" cy="11" r="6" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                className="input pr-10"
                placeholder="Search leads"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
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

          {(q || status) ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {q ? (
                <button
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[12px] font-medium text-slate-700"
                  onClick={() => setQ('')}
                >
                  Search
                  <span className="max-w-[80px] truncate">{q}</span>
                  <span className="text-slate-400">x</span>
                </button>
              ) : null}
              {status ? (
                <button
                  className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-[12px] font-medium text-brand-700"
                  onClick={() => setStatus('')}
                >
                  Status
                  <span>{status}</span>
                  <span className="text-brand-400">x</span>
                </button>
              ) : null}
            </div>
          ) : (
            <p className="mt-3 text-[12px] text-slate-500">{rows.length} leads loaded</p>
          )}
        </div>

        {mobileFiltersOpen ? (
          <div className="card p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
                <p className="mt-1 text-[12px] text-slate-500">Refine the visible lead list.</p>
              </div>
              <button className="text-[12px] font-medium text-slate-500" onClick={() => setMobileFiltersOpen(false)}>
                Close
              </button>
            </div>

            <div className="mt-3 space-y-3">
              <div>
                <label className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-slate-500">Lead Status</label>
                <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">All statuses</option>
                  <option value="new">new</option>
                  <option value="contacted">contacted</option>
                  <option value="qualified">qualified</option>
                  <option value="won">won</option>
                  <option value="lost">lost</option>
                  <option value="spam">spam</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  className="btn-primary"
                  onClick={() => {
                    load();
                    setMobileFiltersOpen(false);
                  }}
                >
                  Apply
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setQ('');
                    setStatus('');
                    setMobileFiltersOpen(false);
                    void load({ q: '', status: '' });
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
          <input className="input" placeholder="Search name/email/company" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            <option value="new">new</option>
            <option value="contacted">contacted</option>
            <option value="qualified">qualified</option>
            <option value="won">won</option>
            <option value="lost">lost</option>
            <option value="spam">spam</option>
          </select>
          <button className="btn-primary min-h-11" onClick={() => void load()}>Apply Filters</button>
          <button className="btn-secondary min-h-11" onClick={() => { setQ(''); setStatus(''); }}>Clear</button>
        </FilterBar>
      </div>

      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'service', label: 'Service' },
          { key: 'status', label: 'Status', render: (v) => <StatusBadge value={String(v)} /> },
          { key: 'priority', label: 'Priority' },
          {
            key: 'attachment_url',
            label: 'Attachment',
            render: (v) =>
              v ? (
                <a href={String(v)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Open File
                </a>
              ) : (
                <span className="text-xs text-slate-500">No file</span>
              ),
          },
          { key: 'created_at', label: 'Created', render: (v) => new Date(String(v)).toLocaleString() },
        ]}
        rows={rows}
        rowKey={(r) => r.id}
        rowHref={(r) => `/leads/contact-inquiries/${r.id}`}
        mobileCard={(r) => (
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 font-semibold break-words">{r.name}</p>
              <StatusBadge value={r.status || 'new'} />
            </div>
            <p className="text-xs text-slate-600 break-all">{r.email}</p>
            <p className="text-xs text-slate-600">{r.service}</p>
            {r.attachment_url ? (
              <a href={String(r.attachment_url)} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-3">
                Open File
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
