'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Room } from '@/lib/types'
import { formatKes } from '@/lib/site'

/** Room card: aspect-[4/3] image, title, area, weekly KES, monthly KES, badges. */
export default function RoomCard({ room, index = 0 }: { room: Room; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: (index % 4) * 0.08 }}
      className="group flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-icon"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        <Image
          src={room.images[0]}
          alt={room.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-light px-3 py-1 text-xs text-gray-600">{room.type}</span>
          {room.genderPolicy !== 'Any' ? (
            <span className="rounded-full bg-light px-3 py-1 text-xs text-gray-600">
              {room.genderPolicy}
            </span>
          ) : null}
          {room.status === 'taken' ? (
            <span className="rounded-full bg-light px-3 py-1 text-xs text-gray-600">Taken</span>
          ) : null}
        </div>
        <h3 className="mt-3 text-lg leading-snug text-black/80">
          <Link href={`/rooms/${room.slug}`} className="hover:text-primary">
            {room.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-600">{room.area}, {room.county}</p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-lg font-medium text-primary">{formatKes(room.weeklyKes)}</span>
          <span className="text-xs uppercase tracking-[2px] text-gray-600">per week</span>
          {room.monthlyKes ? (
            <span className="text-sm text-gray-600">or {formatKes(room.monthlyKes)} monthly</span>
          ) : null}
        </div>
        <div className="mt-4 flex-1" />
        <Link href={`/rooms/${room.slug}`} className="btn btn-outline-primary mt-2 w-full">
          View
        </Link>
      </div>
    </motion.article>
  )
}
