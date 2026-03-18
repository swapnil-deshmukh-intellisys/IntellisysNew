'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { useToast } from '@/components/ToastProvider';

const bucketOptions = ['contact-inquiries', 'recruitment-attachments', 'contact-attachments'];

export default function MediaPage() {
  const { pushToast } = useToast();
  const [rows, setRows] = useState<any[]>([]);
  const [bucket, setBucket] = useState(bucketOptions[0]);
  const [folder, setFolder] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const load = async () => {
    const res = await fetch(`/api/media/list?bucket=${encodeURIComponent(bucket)}&folder=${encodeURIComponent(folder)}`);
    const data = await res.json();
    setRows(data.rows || []);
  };

  useEffect(() => { load(); }, []);

  const upload = async () => {
    if (!file) {
      pushToast('info', 'Please select a file first.');
      return;
    }
    const fd = new FormData();
    fd.append('file', file);
    fd.append('bucket', bucket);
    fd.append('folder', folder || 'uploads');
    const res = await fetch('/api/media/upload', { method: 'POST', body: fd });
    if (res.ok) {
      setFile(null);
      await load();
      pushToast('success', 'File uploaded successfully.');
    } else {
      const data = await res.json().catch(() => ({}));
      pushToast('error', data.error || 'Upload failed.');
    }
  };

  return (
    <div>
      <PageHeader title="Media Library" subtitle="Manage sales, recruitment, and legacy storage buckets" actions={<button className="btn-secondary" onClick={load}>Refresh</button>} />

      <div className="card p-4 mb-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <select className="input" value={bucket} onChange={(e) => setBucket(e.target.value)}>
          {bucketOptions.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <input className="input" value={folder} onChange={(e) => setFolder(e.target.value)} placeholder="Folder" />
        <input className="input" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button className="btn-primary min-h-11" onClick={upload}>Upload</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {rows.map((row) => (
          <div key={row.name} className="card p-3">
            <p className="text-xs font-semibold break-all">{row.name}</p>
            <p className="text-[11px] text-slate-500 mt-1">{row.metadata?.mimetype || 'file'}</p>
            <p className="text-[11px] text-slate-500">{row.metadata?.size || 0} bytes</p>
            <button className="btn-secondary mt-3 w-full" onClick={() => navigator.clipboard.writeText(`${folder}/${row.name}`)}>Copy Path</button>
          </div>
        ))}
      </div>
    </div>
  );
}
