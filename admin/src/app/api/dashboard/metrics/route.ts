import { NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth';
import { fail, ok } from '@/lib/http';
import { getDashboardMetrics } from '@/lib/dashboard';

export async function GET(req: NextRequest) {
  const guard = requireApiRole(req, ['super_admin', 'admin', 'recruiter', 'sales_ops', 'viewer']);
  if ('error' in guard) return fail(guard.error, guard.status);

  const metrics = await getDashboardMetrics();
  return ok(metrics);
}
