import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { MobileNav } from '@/components/MobileNav';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session) redirect('/login');

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1 min-w-0 pb-20 lg:pb-0">
        <Topbar />
        <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
