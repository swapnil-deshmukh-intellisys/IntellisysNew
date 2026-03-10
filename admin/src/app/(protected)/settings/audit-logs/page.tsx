'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';

export default function AuditLogsPage() {
  const [rows, setRows] = useState<any[]>([]);

  const load = async () => {
    const res = await fetch('/api/audit-logs');
    const data = await res.json();
    setRows(data.rows || []);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <PageHeader title="Audit Logs" subtitle="Immutable trail of admin mutations" actions={<button className="btn-secondary" onClick={load}>Refresh</button>} />
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Actor</th>
              <th className="px-4 py-3 text-left">Action</th>
              <th className="px-4 py-3 text-left">Entity</th>
              <th className="px-4 py-3 text-left">Metadata</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-100">
                <td className="px-4 py-3">{new Date(r.created_at).toLocaleString()}</td>
                <td className="px-4 py-3 text-xs">{r.actor_user_id}</td>
                <td className="px-4 py-3">{r.action}</td>
                <td className="px-4 py-3">{r.entity_type}:{r.entity_id}</td>
                <td className="px-4 py-3 text-xs whitespace-pre-wrap">{JSON.stringify(r.metadata)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}