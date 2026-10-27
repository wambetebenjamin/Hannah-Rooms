import Link from 'next/link'
import { SITE_NAME, SITE_TAGLINE, WHATSAPP_DISPLAY, WHATSAPP_LINK } from '@/lib/site'

const EXPLORE = [
  { href: '/rooms', label: 'Browse rooms' },
  { href: '/list-room', label: 'List a room' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About us' },
]

const LEGAL = [
  { href: '/legal/privacy-policy', label: 'Privacy policy' },
  { href: '/legal/terms', label: 'Terms of use' },
  { href: '/legal/cookie-policy', label: 'Cookie policy' },
]

export default function Footer() {
  return (
    <footer className="bg-dark pt-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="footer-heading font-sans text-xl font-medium text-white">
              {SITE_NAME}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {SITE_TAGLINE} Boarding and short-stay rooms for students, interns, and travelling
              workers across Kenya, with honest photos, clear KES prices, and safety tips on every
              listing.
            </p>
          </div>

          <div>
            <p className="footer-heading font-sans text-xl font-medium text-white">Explore</p>
            <ul className="mt-2 space-y-2">
              {EXPLORE.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-heading font-sans text-xl font-medium text-white">Legal</p>
            <ul className="mt-2 space-y-2">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-white/70">
              Not a party to any lease. Always verify a room before you pay.
            </p>
          </div>

          <div>
            <p className="footer-heading font-sans text-xl font-medium text-white">Contact</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-primary">
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a href="mailto:hello@hannahrooms.example" className="text-sm text-primary">
                  hello@hannahrooms.example
                </a>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:text-primary"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6V13h2.7v8h3.2z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:text-primary"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M12 4.3c2.5 0 2.8 0 3.8.1 2.5.1 3.7 1.3 3.8 3.8 0 1 .1 1.3.1 3.8s0 2.8-.1 3.8c-.1 2.5-1.3 3.7-3.8 3.8-1 0-1.3.1-3.8.1s-2.8 0-3.8-.1c-2.5-.1-3.7-1.3-3.8-3.8 0-1-.1-1.3-.1-3.8s0-2.8.1-3.8c.1-2.5 1.3-3.7 3.8-3.8 1-.1 1.3-.1 3.8-.1zM12 2.7c-2.5 0-2.9 0-3.9.1-3.4.2-5.2 2-5.4 5.4-.1 1-.1 1.3-.1 3.9s0 2.9.1 3.9c.2 3.4 2 5.2 5.4 5.4 1 .1 1.3.1 3.9.1s2.9 0 3.9-.1c3.4-.2 5.2-2 5.4-5.4.1-1 .1-1.3.1-3.9s0-2.9-.1-3.9c-.2-3.4-2-5.2-5.4-5.4-1-.1-1.4-.1-3.9-.1zm0 4.5a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zm5-9.2a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:text-primary"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M16.6 3c.3 1.9 1.4 3.1 3.4 3.3v2.6c-1.2.1-2.3-.2-3.5-.9v5.9c0 5-4.4 6.6-7.5 4.7-2.1-1.3-2.8-3.9-1.8-6.1.9-1.9 3-3 5.3-2.7v2.7c-.4-.1-.8-.2-1.2-.1-1.3.1-2.1 1.3-1.8 2.5.2 1.1 1.4 1.8 2.5 1.4 1-.3 1.5-1.2 1.5-2.4V3h3.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-darker bg-darker">
        <div className="w-full max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-white/80">
            {new Date().getFullYear()} {SITE_NAME}. A room you can trust. Not a landlord, not a
            broker, and not a party to any lease.
          </p>
        </div>
      </div>
    </footer>
  )
}
