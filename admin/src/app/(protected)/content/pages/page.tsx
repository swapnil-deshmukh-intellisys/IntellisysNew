import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

const pages = ['homepage', 'services', 'technologies', 'careers', 'contact', 'header', 'footer'];

export default function ContentPagesIndex() {
  return (
    <div>
      <PageHeader title="Content" subtitle="Draft, review, publish, rollback" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((slug) => (
          <div key={slug} className="card p-4">
            <h3 className="font-semibold capitalize">{slug}</h3>
            <p className="mt-1 text-sm text-slate-600">Manage sections, links, and CMS data.</p>
            <Link href={`/content/${slug}`} className="btn-secondary mt-3">Open Editor</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
