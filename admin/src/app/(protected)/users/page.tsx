'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { useToast } from '@/components/ToastProvider';

export default function UsersPage() {
  const { pushToast } = useToast();
  const [rows, setRows] = useState<any[]>([]);
  const [roleUpdates, setRoleUpdates] = useState<Record<string, string>>({});

  const load = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setRows(data.rows || []);
  };

  useEffect(() => { load(); }, []);

  const save = async (userId: string) => {
    const res = await fetch(`/api/users/${userId}/role`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: roleUpdates[userId], is_active: true }),
    });
    if (res.ok) {
      await load();
      pushToast('success', 'User role updated.');
    } else {
      const data = await res.json().catch(() => ({}));
      pushToast('error', data.error || 'Failed to update user role.');
    }
  };

  return (
    <div>
      <PageHeader title="Users & Roles" subtitle="RBAC access control" actions={<button className="btn-secondary" onClick={load}>Refresh</button>} />
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left">User ID</th>
              <th className="px-4 py-3 text-left">Display Name</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.user_id} className="border-b border-slate-100">
                <td className="px-4 py-3 text-xs break-all">{r.user_id}</td>
                <td className="px-4 py-3">{r.display_name || '-'}</td>
                <td className="px-4 py-3">
                  <select className="input" value={roleUpdates[r.user_id] || r.role} onChange={(e) => setRoleUpdates((p) => ({ ...p, [r.user_id]: e.target.value }))}>
                    {['super_admin','admin','editor','recruiter','sales_ops','viewer'].map((role) => <option key={role}>{role}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3">{r.is_active ? 'active' : 'inactive'}</td>
                <td className="px-4 py-3"><button className="btn-primary" onClick={() => save(r.user_id)}>Save</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
