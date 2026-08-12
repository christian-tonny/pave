'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

/**
 * Admins land on their console rather than the marketing page. Kept as its own
 * client component so the landing page itself stays static and renders instantly.
 */
export function AdminRedirect() {
  const router = useRouter();
  const isAdmin = useQuery(api.admin.isAdmin);

  useEffect(() => {
    if (isAdmin === true) router.push('/admin');
  }, [isAdmin, router]);

  return null;
}
