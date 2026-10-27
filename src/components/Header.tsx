'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { cx } from '@/lib/site'

export interface HeaderUser {
  name: string
  role: 'seeker' | 'host'
}

const NAV_LINKS = [
  { href: '/rooms', label: 'Rooms' },
  { href: '/list-room', label: 'List a room' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
]

export default function Header({ user }: { user: HeaderUser | null }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-[9990] bg-white shadow-nav">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[72px] items-center justify-between">
          <Link href="/" className="navbar-brand text-2xl font-bold leading-none text-black">
            Hannah<span className="text-primary"> Rooms</span>
          </Link>

          <nav aria-label="Main" className="hidden items-stretch md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  'relative flex items-center px-5 text-[15px] text-[#4d4d4d] transition-colors hover:text-primary',
                  'after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-500 hover:after:scale-x-100',
                  pathname === link.href && 'text-primary after:scale-x-100',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <Link href="/dashboard" className="btn btn-outline-primary min-h-[44px]">
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn btn-primary min-h-[44px]"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline-primary min-h-[44px]">
                  Login
                </Link>
                <Link href="/register" className="btn btn-primary min-h-[44px]">
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-black md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/10 bg-white px-4 pb-4 pt-2 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cx(
                  'min-h-[44px] border-b border-black/5 py-3 text-[15px] text-black/70',
                  pathname === link.href && 'text-primary',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="btn btn-outline-primary w-full">
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn btn-primary w-full"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="btn btn-outline-primary w-full">
                  Login
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
