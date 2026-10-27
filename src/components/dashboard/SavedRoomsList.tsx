'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Room } from '@/lib/types'
import { formatKes } from '@/lib/site'

const STORAGE_KEY = 'hannah-rooms-saved'

/** Seeker saved rooms (stored on this device). */
export default function SavedRoomsList({ rooms }: { rooms: Room[] }) {
  const [saved, setSaved] = useState<Room[]>([])

  useEffect(() => {
    try {
      const slugs: string[] = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
      setSaved(rooms.filter((r) => slugs.includes(r.slug)))
    } catch {
      setSaved([])
    }
  }, [rooms])

  if (saved.length === 0) {
    return (
      <div className="rounded-card border border-black/10 bg-white p-6 shadow-card">
        <p className="text-black/80">No saved rooms yet.</p>
        <p className="mt-2 text-sm text-gray-600">
          Open any listing and tap Save room to keep it here for later.
        </p>
        <Link href="/rooms" className="btn btn-primary mt-5">
          Browse rooms
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {saved.map((room) => (
        <div key={room.id} className="rounded-card border border-black/10 bg-white p-5 shadow-card">
          <h3 className="text-lg text-black/80">{room.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{room.area}, {room.county}</p>
          <p className="mt-2 text-primary">{formatKes(room.weeklyKes)} per week</p>
          <Link href={`/rooms/${room.slug}`} className="btn btn-outline-primary mt-4 w-full">
            View
          </Link>
        </div>
      ))}
    </div>
  )
}
