'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Enquiry } from '@/lib/types'
import { formatDate } from '@/lib/site'

/** Enquiry inbox (host) or sent list (seeker) with a detail drawer and thread. */
export default function EnquiryInbox({
  enquiries,
  viewerRole,
}: {
  enquiries: Enquiry[]
  viewerRole: 'seeker' | 'host'
}) {
  const [selected, setSelected] = useState<Enquiry | null>(null)
  const [reply, setReply] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [items, setItems] = useState<Enquiry[]>(enquiries)

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selected) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/enquiries/reply', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ enquiryId: selected.id, message: reply, status: 'Replied' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Could not send the reply.')
      const updated: Enquiry = data.enquiry
      setItems((list) => list.map((e) => (e.id === updated.id ? updated : e)))
      setSelected(updated)
      setReply('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the reply.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <p className="text-sm text-gray-600 sm:hidden">Scroll the table sideways to see every column.</p>
      <div className="mt-4 overflow-x-auto rounded-card border border-black/10 bg-white shadow-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="bg-light">
              <th className="p-4 font-medium text-black/80">{viewerRole === 'host' ? 'From' : 'Host'}</th>
              <th className="p-4 font-medium text-black/80">Room</th>
              <th className="p-4 font-medium text-black/80">Move-in</th>
              <th className="p-4 font-medium text-black/80">Received</th>
              <th className="p-4 font-medium text-black/80">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((enq) => (
              <tr
                key={enq.id}
                className="cursor-pointer border-t border-black/10 hover:bg-light"
                onClick={() => setSelected(enq)}
              >
                <td className="p-4 text-black/80">{viewerRole === 'host' ? enq.name : enq.hostName}</td>
                <td className="p-4 text-gray-600">{enq.roomTitle}</td>
                <td className="p-4 text-gray-600">{enq.moveInDate}</td>
                <td className="p-4 text-gray-600">{formatDate(enq.createdAt)}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      enq.status === 'New'
                        ? 'bg-primary/15 text-primary'
                        : 'bg-light text-gray-600'
                    }`}
                  >
                    {enq.status}
                  </span>
                </td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-gray-600">
                  {viewerRole === 'host'
                    ? 'No enquiries yet. They appear here as soon as a seeker writes to you.'
                    : 'You have not sent any enquiries yet.'}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[9995] flex items-end justify-end sm:items-stretch" role="dialog" aria-label="Enquiry detail">
          <button
            type="button"
            aria-label="Close enquiry"
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelected(null)}
          />
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative flex h-[85vh] w-full flex-col rounded-t-2xl bg-white shadow-form sm:h-full sm:w-[440px] sm:rounded-none"
          >
            <div className="flex items-start justify-between border-b border-black/10 p-5">
              <div>
                <h2 className="text-xl text-black/80">{selected.name}</h2>
                <p className="text-sm text-gray-600">{selected.roomTitle}</p>
                <p className="text-xs text-gray-600">
                  {selected.phone} · {selected.email} · move-in {selected.moveInDate}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close enquiry"
                onClick={() => setSelected(null)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-black/60"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {selected.thread.map((msg, i) => (
                <div
                  key={i}
                  className={`rounded-card p-3 text-sm ${
                    msg.from === (viewerRole === 'host' ? 'seeker' : 'host')
                      ? 'bg-light text-gray-600'
                      : 'bg-primary/10 text-black/80'
                  }`}
                >
                  <p className="text-xs font-medium text-black/60">
                    {msg.name} · {formatDate(msg.at)}
                  </p>
                  <p className="mt-1">{msg.text}</p>
                </div>
              ))}
            </div>

            {viewerRole === 'host' ? (
              <form onSubmit={sendReply} className="border-t border-black/10 p-5">
                <label htmlFor="reply-message" className="block text-sm font-medium text-black/80">
                  Reply
                </label>
                <textarea
                  id="reply-message"
                  rows={3}
                  required
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="form-control mt-2"
                  placeholder="Write a clear reply. Remind the seeker to view before paying."
                />
                {error ? (
                  <p className="mt-2 text-sm text-red-700" role="alert">
                    {error}
                  </p>
                ) : null}
                <button type="submit" disabled={busy} className="btn btn-primary mt-3 w-full disabled:opacity-60">
                  {busy ? 'Sending…' : 'Send reply'}
                </button>
              </form>
            ) : (
              <div className="border-t border-black/10 p-5">
                <p className="text-sm text-gray-600">
                  The host replies here and by email. Never send a deposit before you have viewed
                  the room.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
