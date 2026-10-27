'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Room } from '@/lib/types'
import { formatKes } from '@/lib/site'

/** Host listings management: edit, pause, mark taken. */
export default function ListingsManager({ rooms }: { rooms: Room[] }) {
  const [items, setItems] = useState<Room[]>(rooms)
  const [editing, setEditing] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const [weeklyKes, setWeeklyKes] = useState('')
  const [monthlyKes, setMonthlyKes] = useState('')
  const [depositKes, setDepositKes] = useState('')
  const [rules, setRules] = useState('')
  const [availability, setAvailability] = useState('')

  const startEdit = (room: Room) => {
    setEditing(room.id)
    setWeeklyKes(String(room.weeklyKes))
    setMonthlyKes(String(room.monthlyKes ?? ''))
    setDepositKes(String(room.depositKes))
    setRules(room.rules)
    setAvailability(room.availability)
    setError('')
  }

  const applyUpdate = async (roomId: string, patch: Record<string, unknown>) => {
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/rooms/update', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ roomId, ...patch }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Could not update the listing.')
      setItems((list) => list.map((r) => (r.id === data.room.id ? data.room : r)))
      setEditing(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update the listing.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-4">
      {error ? (
        <p className="rounded-card border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      {items.map((room) => (
        <div key={room.id} className="rounded-card border border-black/10 bg-white p-5 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg sm:w-44">
              <Image src={room.images[0]} alt={room.title} fill sizes="176px" className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg text-black/80">{room.title}</h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    room.status === 'active'
                      ? 'bg-primary/15 text-primary'
                      : 'bg-light text-gray-600'
                  }`}
                >
                  {room.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {room.area}, {room.county} · {room.type}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {formatKes(room.weeklyKes)} per week
                {room.monthlyKes ? ` · ${formatKes(room.monthlyKes)} per month` : ''} · deposit{' '}
                {formatKes(room.depositKes)}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/rooms/${room.slug}`} className="btn btn-outline-primary min-h-[44px] px-4">
                  View
                </Link>
                <button
                  type="button"
                  onClick={() => startEdit(room)}
                  className="btn btn-outline-primary min-h-[44px] px-4"
                >
                  Edit
                </button>
                {room.status !== 'paused' ? (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => applyUpdate(room.id, { status: 'paused' })}
                    className="btn btn-outline-primary min-h-[44px] px-4 disabled:opacity-60"
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => applyUpdate(room.id, { status: 'active' })}
                    className="btn btn-primary min-h-[44px] px-4 disabled:opacity-60"
                  >
                    Reactivate
                  </button>
                )}
                {room.status !== 'taken' ? (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => applyUpdate(room.id, { status: 'taken' })}
                    className="btn btn-outline-primary min-h-[44px] px-4 disabled:opacity-60"
                  >
                    Mark taken
                  </button>
                ) : null}
              </div>

              {editing === room.id && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    applyUpdate(room.id, {
                      weeklyKes: Number(weeklyKes),
                      monthlyKes: monthlyKes ? Number(monthlyKes) : null,
                      depositKes: Number(depositKes),
                      rules,
                      availability,
                    })
                  }}
                  className="mt-4 grid grid-cols-1 gap-3 rounded-card bg-light p-4 sm:grid-cols-2"
                >
                  <div>
                    <label htmlFor={`weekly-${room.id}`} className="text-xs text-gray-600">
                      Weekly KES
                    </label>
                    <input
                      id={`weekly-${room.id}`}
                      type="number"
                      min={200}
                      value={weeklyKes}
                      onChange={(e) => setWeeklyKes(e.target.value)}
                      className="form-control mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor={`monthly-${room.id}`} className="text-xs text-gray-600">
                      Monthly KES
                    </label>
                    <input
                      id={`monthly-${room.id}`}
                      type="number"
                      min={0}
                      value={monthlyKes}
                      onChange={(e) => setMonthlyKes(e.target.value)}
                      className="form-control mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor={`deposit-${room.id}`} className="text-xs text-gray-600">
                      Deposit KES
                    </label>
                    <input
                      id={`deposit-${room.id}`}
                      type="number"
                      min={0}
                      value={depositKes}
                      onChange={(e) => setDepositKes(e.target.value)}
                      className="form-control mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor={`availability-${room.id}`} className="text-xs text-gray-600">
                      Availability note
                    </label>
                    <input
                      id={`availability-${room.id}`}
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="form-control mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={`rules-${room.id}`} className="text-xs text-gray-600">
                      House rules
                    </label>
                    <textarea
                      id={`rules-${room.id}`}
                      rows={2}
                      value={rules}
                      onChange={(e) => setRules(e.target.value)}
                      className="form-control mt-1"
                    />
                  </div>
                  <div className="flex gap-2 sm:col-span-2">
                    <button type="submit" disabled={busy} className="btn btn-primary disabled:opacity-60">
                      {busy ? 'Saving…' : 'Save changes'}
                    </button>
                    <button type="button" onClick={() => setEditing(null)} className="btn btn-outline-primary">
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
