'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const VOICES = [
  {
    name: 'Mercy W.',
    role: 'Student, South B',
    image: '/images/person-1.jpg',
    quote:
      'The photos matched the room. The house rules were written down before I paid anything.',
  },
  {
    name: 'Brian K.',
    role: 'Intern, Kisumu',
    image: '/images/person-2.jpg',
    quote:
      'Weekly price and deposit were both clear. I viewed the room first and got a written receipt.',
  },
  {
    name: 'Faith N.',
    role: 'Health worker, Mombasa',
    image: '/images/person-3.jpg',
    quote:
      'I move towns every few months. Confirming water and power first has saved me twice.',
  },
]

export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
      {VOICES.map((voice, index) => (
        <motion.figure
          key={voice.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
          className="rounded-card bg-white p-6 shadow-card"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src={voice.image}
                alt={voice.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <figcaption>
              <p className="font-medium text-black/80">{voice.name}</p>
              <p className="text-sm text-gray-600">{voice.role}</p>
            </figcaption>
          </div>
          <blockquote className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
            {voice.quote}
          </blockquote>
        </motion.figure>
      ))}
    </div>
  )
}
