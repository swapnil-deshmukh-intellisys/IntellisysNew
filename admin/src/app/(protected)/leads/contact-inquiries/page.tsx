'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
};

export default function ContactInquiriesPage() {
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');

  async function load() {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (status) params.set('status', status);
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
        title="Contact Inquiries"
        subtitle="Sales ops queue with status, assignment, and quick actions"
        actions={<button className="btn-secondary" onClick={load}>Refresh</button>}
      />

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
        <button className="btn-primary min-h-11" onClick={load}>Apply Filters</button>
        <button className="btn-secondary min-h-11" onClick={() => { setQ(''); setStatus(''); }}>Clear</button>
      </FilterBar>

      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'service', label: 'Service' },
          { key: 'status', label: 'Status', render: (v) => <StatusBadge value={String(v)} /> },
          { key: 'priority', label: 'Priority' },
          { key: 'created_at', label: 'Created', render: (v) => new Date(String(v)).toLocaleString() },
          {
            key: 'id',
            label: 'Actions',
            render: (v) => <Link href={`/leads/contact-inquiries/${String(v)}`} className="btn-secondary">Open</Link>,
          },
        ]}
        rows={rows}
        rowKey={(r) => r.id}
        mobileCard={(r) => (
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold">{r.name}</p>
              <StatusBadge value={r.status || 'new'} />
            </div>
            <p className="text-xs text-slate-600 mt-1">{r.email}</p>
            <p className="text-xs text-slate-600">{r.service}</p>
            <div className="mt-3 flex gap-2">
              <Link href={`/leads/contact-inquiries/${r.id}`} className="btn-secondary">Details</Link>
            </div>
          </div>
        )}
      />
    </div>
  );
}