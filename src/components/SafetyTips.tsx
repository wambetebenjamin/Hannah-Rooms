'use client'

import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

const TIPS = [
  'Meet in a public place first if you can, then view the room together.',
  'Confirm water and power before you pay anything.',
  'Never pay the full deposit before you have viewed the room.',
  'Get a written receipt for every payment, even mobile money.',
  'Never share your OTP or PIN with a host or an agent.',
  'Use a written house agreement that names the deposit and how it is refunded.',
]

/** Safety tips box: always visible, bordered, full width. */
export default function SafetyTips() {
  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full rounded-card border-2 border-primary/40 bg-light p-5 text-sm text-gray-600 sm:p-6 sm:text-base"
      aria-label="Safety tips"
    >
      <div className="flex items-center gap-2 text-black/80">
        <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl">Safety tips before you pay</h2>
      </div>
      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {TIPS.map((tip) => (
          <li key={tip} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm">
        Hannah Rooms is not a party to any lease. If a listing asks you to pay before viewing,
        report it to us on WhatsApp and walk away.
      </p>
    </motion.aside>
  )
}
