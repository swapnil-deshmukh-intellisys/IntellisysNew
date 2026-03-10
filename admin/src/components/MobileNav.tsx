'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/nav';

export function MobileNav() {
  const pathname = usePathname();
  const quick = navItems.slice(0, 5);
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 border-t border-slate-200 bg-white z-40">
      <div className="grid grid-cols-5">
        {quick.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-1 py-3 text-center text-[11px] leading-tight ${active ? 'text-brand-700 font-semibold' : 'text-slate-600'}`}
            >
              {item.label.replace(' ', '\n')}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}