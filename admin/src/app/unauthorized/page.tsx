import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="card max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p className="mt-2 text-sm text-slate-600">You do not have permission to access this page.</p>
        <Link href="/dashboard" className="btn-primary mt-4">Go to Dashboard</Link>
      </div>
    </main>
  );
}