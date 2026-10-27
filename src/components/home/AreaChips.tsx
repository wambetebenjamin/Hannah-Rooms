'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const AREAS = [
  'South B',
  'Ngong Road',
  'Rongai',
  'Kisumu CBD',
  'Mombasa Nyali',
  'Kilimani',
  'Kasarani',
  'Juja',
  'Roysambu',
  'Nakuru CBD',
  'Eldoret CBD',
  'Bamburi',
]

/** Popular area chips with a subtle entrance. */
export default function AreaChips() {
  return (
    <motion.div
      className="mt-8 flex flex-wrap justify-center gap-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {AREAS.map((area) => (
        <motion.span
          key={area}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
          }}
        >
          <Link
            href={`/rooms?area=${encodeURIComponent(area)}`}
            className="inline-flex min-h-[44px] items-center rounded-full border border-black/10 bg-white px-5 text-sm text-black/70 shadow-card transition-colors hover:border-primary hover:text-primary"
          >
            {area}
          </Link>
        </motion.span>
      ))}
    </motion.div>
  )
}
