'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { ClipboardList, Heart, Home, List, LogOut, UserRound } from 'lucide-react'
import { cx } from '@/lib/site'

export interface DashboardUser {
  id: string
  name: string
  role: 'seeker' | 'host'
}

export default function DashboardShell({
  user,
  children,
}: {
  user: DashboardUser
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHost = user.role === 'host'

  const tabs = [
    ...(isHost ? [{ href: '/dashboard/listings', label: 'Listings', icon: List }] : []),
    { href: '/dashboard/enquiries', label: 'Enquiries', icon: ClipboardList },
    ...(isHost ? [] : [{ href: '/dashboard?tab=saved', label: 'Saved', icon: Heart }]),
    { href: '/dashboard?tab=account', label: 'Account', icon: UserRound },
  ]

  const sidebarLinks = [
    { href: '/dashboard', label: 'Overview', icon: Home },
    ...tabs.filter((t) => !t.href.includes('?')),
  ]

  return (
    <div className="flex min-h-screen bg-light">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-white shadow-nav lg:flex">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold leading-none text-black">
            Hannah<span className="text-primary"> Rooms</span>
          </Link>
          <p className="mt-2 text-xs uppercase tracking-[2px] text-gray-600">
            {isHost ? 'Host dashboard' : 'Seeker dashboard'}
          </p>
        </div>
        <nav aria-label="Dashboard" className="flex-1 px-3">
          {sidebarLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cx(
                  'mb-1 flex min-h-[44px] items-center gap-3 rounded-btn px-4 text-sm transition-colors',
                  active ? 'bg-primary text-white' : 'text-gray-600 hover:bg-light hover:text-primary',
                )}
              >
                <link.icon className="h-5 w-5" aria-hidden="true" />
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-black/10 p-4">
          <p className="truncate text-sm font-medium text-black/80">{user.name}</p>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="mt-2 flex min-h-[44px] items-center gap-2 text-sm text-gray-600 hover:text-primary"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-nav lg:hidden">
          <Link href="/" className="text-xl font-bold text-black">
            Hannah<span className="text-primary"> Rooms</span>
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="btn btn-outline-primary min-h-[44px] px-3"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        </header>

        <main className="flex-1 pb-16 lg:pb-0">
          <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>

      {/* Mobile bottom tabs */}
      <nav
        aria-label="Dashboard tabs"
        className="fixed inset-x-0 bottom-0 z-[9990] flex h-16 items-stretch border-t border-black/10 bg-white pb-safe lg:hidden"
      >
        {tabs.map((tab) => {
          const active = pathname + (typeof window !== 'undefined' ? window.location.search : '') === tab.href || pathname === tab.href
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={cx(
                'flex min-h-[44px] flex-1 flex-col items-center justify-center gap-1 text-xs',
                active ? 'text-primary' : 'text-gray-600',
              )}
            >
              <tab.icon className="h-5 w-5" aria-hidden="true" />
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
