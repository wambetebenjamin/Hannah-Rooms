'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, Camera, MapPin, Wallet } from 'lucide-react'

const ITEMS = [
  {
    icon: Camera,
    title: 'Photo-first listings',
    text: 'See the actual room before you make the trip.',
  },
  {
    icon: Wallet,
    title: 'KES weekly and monthly prices',
    text: 'Shilling prices, deposits, and what the deposit covers.',
  },
  {
    icon: MapPin,
    title: 'Area filters',
    text: 'Search by estate, town, county, and nearby landmark.',
  },
  {
    icon: BadgeCheck,
    title: 'Safety tips on every listing',
    text: 'Plain guidance so you can move with more confidence.',
  },
]

/** Trust bar cards overlapping the hero, following the zip services pattern. */
export default function TrustBar() {
  return (
    <section aria-label="Why Hannah Rooms" className="relative z-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:-mt-16 lg:grid-cols-4">
          {ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 + index * 0.08 }}
              className="rounded-card bg-white p-5 shadow-card"
            >
              <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-secondary text-white shadow-icon">
                <item.icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-medium text-black/80">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
