'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { useToast } from '@/components/ToastProvider';

export default function ContactInquiryDetailPage() {
  const { pushToast } = useToast();
  const params = useParams<{ id: string }>();
  const [row, setRow] = useState<any>(null);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/leads/contact');
      const data = await res.json();
      const current = (data.rows || []).find((x: any) => x.id === params.id);
      setRow(current);
      setStatus(current?.status || 'new');
      setPriority(current?.priority || 'medium');
    })();
  }, [params.id]);

  const save = async () => {
    const res = await fetch(`/api/leads/contact/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, priority, last_contacted_at: new Date().toISOString() }),
    });
    if (res.ok) {
      pushToast('success', 'Inquiry saved successfully.');
    } else {
      const data = await res.json().catch(() => ({}));
      pushToast('error', data.error || 'Failed to save inquiry.');
    }
  };

  if (!row) return <div className="card p-4">Loading...</div>;

  return (
    <div>
      <PageHeader title="Inquiry Detail" subtitle={row.email} actions={<button className="btn-primary" onClick={save}>Save</button>} />
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <section className="card p-4">
          <h3 className="font-semibold">Lead Profile</h3>
          <dl className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
            <div><dt className="text-slate-500">Name</dt><dd>{row.name}</dd></div>
            <div><dt className="text-slate-500">Phone</dt><dd>{row.phone}</dd></div>
            <div><dt className="text-slate-500">Company</dt><dd>{row.company || '-'}</dd></div>
            <div><dt className="text-slate-500">Service</dt><dd>{row.service || '-'}</dd></div>
          </dl>
          <div className="mt-4">
            <p className="text-sm text-slate-500">Message</p>
            <p className="mt-1 text-sm whitespace-pre-wrap">{row.message || '-'}</p>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="card p-4">
            <p className="text-sm font-semibold">Status & Priority</p>
            <div className="mt-3 space-y-3">
              <div>
                <label className="text-xs text-slate-500">Status</label>
                <select className="input mt-1" value={status} onChange={(e) => setStatus(e.target.value)}>
                  {['new','contacted','qualified','won','lost','spam'].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500">Priority</label>
                <select className="input mt-1" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  {['low','medium','high','urgent'].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="pt-1"><StatusBadge value={status} /></div>
            </div>
          </div>

          <div className="card p-4">
            <p className="text-sm font-semibold">Activity Timeline</p>
            <ul className="mt-3 text-xs text-slate-600 space-y-2">
              <li>Created: {new Date(row.created_at).toLocaleString()}</li>
              <li>Last contact: {row.last_contacted_at ? new Date(row.last_contacted_at).toLocaleString() : 'Not contacted yet'}</li>
              <li>Attachment: {row.attachment_path || 'None'}</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
