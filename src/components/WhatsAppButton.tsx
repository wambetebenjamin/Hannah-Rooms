'use client'

import { usePathname } from 'next/navigation'
import { WHATSAPP_LINK } from '@/lib/site'

/**
 * Floating WhatsApp button: 56x56, circle, z-index 9998, soft pulse on load
 * (zip pulse keyframes, no glow bloom). On dashboard pages it sits above the
 * mobile bottom tabs (bottom-20 lg:bottom-6).
 */
export default function WhatsAppButton() {
  const pathname = usePathname()
  const onDashboard = pathname.startsWith('/dashboard')

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className={`group fixed right-4 z-[9998] flex h-[56px] w-[56px] items-center justify-center rounded-full bg-primary text-white shadow-card wa-pulse-on-load ${
        onDashboard ? 'bottom-20 lg:bottom-6' : 'bottom-4'
      }`}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-current"
        aria-hidden="true"
      >
        <path d="M16.04 3C9.05 3 3.38 8.66 3.38 15.65c0 2.21.58 4.37 1.68 6.28L3.3 29l7.25-1.72a12.6 12.6 0 0 0 5.49 1.28h.01c6.99 0 12.66-5.66 12.66-12.65C28.7 8.66 23.03 3 16.04 3zm0 22.99h-.01c-1.79 0-3.54-.48-5.07-1.39l-.36-.22-4.3 1.02 1.04-4.19-.24-.4a10.2 10.2 0 0 1-1.57-5.45c0-5.66 4.61-10.27 10.28-10.27 2.75 0 5.33 1.07 7.27 3.01a10.2 10.2 0 0 1 3.01 7.27c0 5.66-4.61 10.26-10.05 10.26zm5.63-7.69c-.31-.15-1.83-.9-2.11-1-.28-.11-.49-.15-.69.15-.21.31-.81 1-.99 1.21-.18.21-.36.23-.67.08-.31-.15-1.31-.48-2.5-1.55-.92-.82-1.55-1.84-1.73-2.15-.18-.31-.02-.47.14-.62.14-.14.31-.36.47-.55.15-.18.21-.31.31-.52.11-.21.05-.39-.03-.55-.08-.15-.69-1.66-.95-2.27-.25-.6-.5-.52-.69-.52l-.59-.01c-.21 0-.55.08-.83.39-.28.31-1.09 1.07-1.09 2.6s1.11 3.01 1.27 3.22c.15.21 2.18 3.32 5.28 4.66.74.31 1.31.5 1.75.63.74.24 1.41.2 1.94.12.59-.09 1.83-.74 2.08-1.47.26-.72.26-1.34.18-1.47-.07-.13-.28-.21-.59-.36z" />
      </svg>
      <span
        className="pointer-events-none absolute right-[68px] whitespace-nowrap rounded-btn bg-black px-3 py-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        role="tooltip"
      >
        Chat with us on WhatsApp
      </span>
    </a>
  )
}
