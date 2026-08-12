'use client';

import Link from 'next/link';
import {
  Menu,
  X,
  Compass,
  BookOpen,
  Users,
  LayoutDashboard,
  Calendar,
  Clock,
  DollarSign,
  Bell,
  Newspaper,
  Route,
} from 'lucide-react';
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { getDashboardPath } from '@/lib/hooks/useRoleGuard';
import { PaveWordmark } from '@/components/pave/logo';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user: clerkUser } = useUser();
  const convexUser = useQuery(api.users.current);
  const unreadCount = useQuery(api.notifications.getUnreadCount);

  // Get user's role from Convex (source of truth)
  const userRole = convexUser?.role || (clerkUser?.publicMetadata?.role as string) || 'student';

  // Define navigation links based on role
  const getNavLinks = () => {
    const commonLinks = [];

    // Admins see admin dashboard
    if (userRole === 'admin') {
      commonLinks.push(
        { href: '/admin', label: 'Admin', icon: LayoutDashboard }
      );
      return commonLinks;
    }

    // Students start at their path, then everything else
    if (userRole === 'student') {
      commonLinks.push(
        { href: '/interview/results', label: 'My path', icon: Route },
        { href: '/careers', label: 'Careers', icon: Compass },
        { href: '/blog', label: 'Resources', icon: Newspaper },
        { href: '/assessments', label: 'Assessments', icon: BookOpen },
        { href: '/mentors', label: 'Mentors', icon: Users },
        { href: '/dashboard/student', label: 'Dashboard', icon: LayoutDashboard }
      );
    }

    // Mentors see mentor-specific navigation
    if (userRole === 'mentor') {
      commonLinks.push(
        { href: '/dashboard/mentor', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/dashboard/mentor/bookings', label: 'Bookings', icon: Calendar },
        { href: '/dashboard/mentor/articles', label: 'Articles', icon: Newspaper },
        { href: '/dashboard/mentor/availability', label: 'Availability', icon: Clock },
        { href: '/dashboard/mentor/earnings', label: 'Earnings', icon: DollarSign }
      );
    }

    // Educators and other roles see Dashboard only
    if (userRole === 'educator' || (userRole !== 'student' && userRole !== 'mentor')) {
      const dashboardPath = getDashboardPath(userRole as any);
      commonLinks.push({ href: dashboardPath, label: 'Dashboard', icon: LayoutDashboard });
    }

    return commonLinks;
  };

  const navLinks = getNavLinks();

  const linkClass =
    'flex items-center gap-2 px-2.5 py-2 text-sm text-pave-soft hover:text-pave-ink transition-colors pave-focus rounded-md';

  return (
    <nav className="sticky top-0 z-50 bg-pave-paper/90 backdrop-blur border-b border-pave-line">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <PaveWordmark />

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            <SignedIn>
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href} className={linkClass}>
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}

              <div className="ml-3 flex items-center gap-3">
                <Link
                  href={userRole === 'admin' ? '/admin/notifications' : `/dashboard/${userRole}/notifications`}
                  className="relative p-2 text-pave-soft hover:text-pave-ink transition-colors pave-focus rounded-md"
                  aria-label={`Notifications${unreadCount ? ` (${unreadCount} unread)` : ''}`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount && unreadCount > 0 ? (
                    <span className="absolute -top-0.5 -right-0.5 bg-pave-clay text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  ) : null}
                </Link>
                <UserButton
                  appearance={{ elements: { avatarBox: 'w-8 h-8' } }}
                  afterSignOutUrl="/"
                />
              </div>
            </SignedIn>

            {/* Signed out: brand first, one way in. */}
            <SignedOut>
              <Link href="/sign-in" className={linkClass}>
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="ml-2 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-pave-ink hover:bg-pave-clay transition-colors rounded-full pave-focus"
              >
                Start the interview
              </Link>
            </SignedOut>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-pave-ink pave-focus rounded-md"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-pave-line bg-pave-paper">
          <div className="container mx-auto px-4 py-4 space-y-1">
            <SignedIn>
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-2 py-3 min-h-[48px] text-pave-ink border-b border-pave-line/70 last:border-0"
                  >
                    <Icon className="w-5 h-5 text-pave-soft flex-shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <div className="flex items-center justify-between pt-4">
                <Link
                  href={userRole === 'admin' ? '/admin/notifications' : `/dashboard/${userRole}/notifications`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-pave-ink"
                >
                  <Bell className="w-5 h-5 text-pave-soft" />
                  <span>
                    Notifications
                    {unreadCount && unreadCount > 0 ? ` (${unreadCount > 9 ? '9+' : unreadCount})` : ''}
                  </span>
                </Link>
                <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} afterSignOutUrl="/" />
              </div>
            </SignedIn>

            <SignedOut>
              <Link
                href="/sign-up"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-3 min-h-[48px] bg-pave-ink text-white rounded-full"
              >
                Start the interview
              </Link>
              <Link
                href="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-3 min-h-[48px] text-pave-soft"
              >
                Sign in
              </Link>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
}
