'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navSections } from '@/lib/nav';

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:block w-72 border-r border-slate-200 bg-white h-screen sticky top-0 overflow-y-auto">
      <div className="p-4 border-b border-slate-200">
        <p className="text-xs uppercase tracking-wide text-slate-500">Intellisys</p>
        <h1 className="text-lg font-bold text-brand-900">Admin Panel</h1>
      </div>
      <nav className="p-3 space-y-4">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 text-sm ${active ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
