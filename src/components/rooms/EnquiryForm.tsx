'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import HumanCheck from '@/components/HumanCheck'
import { executeCaptcha } from '@/lib/captchaClient'

interface Fields {
  name: string
  phone: string
  email: string
  moveInDate: string
  message: string
}

const EMPTY: Fields = { name: '', phone: '', email: '', moveInDate: '', message: '' }

/** Enquiry form. POSTs to /api/enquiries/create with reCAPTCHA v3. */
export default function EnquiryForm({ roomId, roomTitle }: { roomId: string; roomTitle: string }) {
  const [fields, setFields] = useState<Fields>({
    ...EMPTY,
    message: `Hello, I am interested in "${roomTitle}". Is it still available?`,
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const [needsHuman, setNeedsHuman] = useState(false)
  const [v2Token, setV2Token] = useState('')

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    try {
      const token = needsHuman ? v2Token : await executeCaptcha('enquiry')
      const res = await fetch('/api/enquiries/create', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ roomId, ...fields, captchaToken: token, v2Token: needsHuman ? v2Token : '' }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data?.requiresV2) {
          setNeedsHuman(true)
          setStatus('idle')
          setError('Please confirm you are human, then send again.')
          return
        }
        throw new Error(data?.error || 'Something went wrong. Please try again.')
      }
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-card border-2 border-primary/40 bg-light p-6">
        <h3 className="text-xl text-black/80">Enquiry sent</h3>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          The host has your message and can reply from their dashboard. View the room before you
          pay a deposit.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="rounded-card border border-black/10 bg-white p-5 shadow-card sm:p-6">
      <h3 className="text-xl text-black/80">Enquire about this room</h3>
      <p className="mt-1 text-sm text-gray-600">
        The host will reply with next steps. All fields are required.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="enq-name" className="block text-sm font-medium text-black/80">
            Name (required)
          </label>
          <input id="enq-name" required value={fields.name} onChange={set('name')} className="form-control mt-2" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="enq-phone" className="block text-sm font-medium text-black/80">
            Phone (required)
          </label>
          <input id="enq-phone" required type="tel" value={fields.phone} onChange={set('phone')} className="form-control mt-2" autoComplete="tel" placeholder="07xx xxx xxx" />
        </div>
        <div>
          <label htmlFor="enq-email" className="block text-sm font-medium text-black/80">
            Email (required)
          </label>
          <input id="enq-email" required type="email" value={fields.email} onChange={set('email')} className="form-control mt-2" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="enq-move" className="block text-sm font-medium text-black/80">
            Move-in date (required)
          </label>
          <input id="enq-move" required type="date" value={fields.moveInDate} onChange={set('moveInDate')} className="form-control mt-2" />
        </div>
        <div>
          <label htmlFor="enq-message" className="block text-sm font-medium text-black/80">
            Message (required)
          </label>
          <textarea id="enq-message" required rows={4} value={fields.message} onChange={set('message')} className="form-control mt-2" />
        </div>
      </div>

      {needsHuman && <HumanCheck onVerify={(token) => setV2Token(token)} />}

      {error ? (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <motion.button
        type="submit"
        disabled={status === 'sending' || (needsHuman && !v2Token)}
        whileTap={{ scale: 0.97 }}
        className="btn btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </motion.button>
    </form>
  )
}
