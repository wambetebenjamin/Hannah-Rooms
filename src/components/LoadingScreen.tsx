'use client'

import { useEffect, useState } from 'react'

/**
 * Loading screen. Structure and motion copied from the zip loader
 * (vacation-rental-master: #ftco-loader circular SVG), with the Hannah Rooms
 * wordmark and a plain percent. Skips after 3 seconds. prefers-reduced-motion
 * shows text only. No gold key, no orb, no particles.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const started = Date.now()
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - started
      setPercent(Math.min(99, Math.round((elapsed / 3000) * 100)))
      if (elapsed >= 3000) {
        setPercent(100)
        setVisible(false)
        window.clearInterval(tick)
      }
    }, 60)

    const skip = () => {
      setPercent(100)
      setVisible(false)
      window.clearInterval(tick)
    }
    window.addEventListener('pointerdown', skip, { once: true })

    return () => {
      window.clearInterval(tick)
      window.removeEventListener('pointerdown', skip)
    }
  }, [])

  return (
    <div
      id="ftco-loader"
      className={`fullscreen${visible ? ' show' : ''}`}
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
    >
      <svg className="circular" width="48px" height="48px" aria-hidden="true">
        <circle
          className="path-bg"
          cx="24"
          cy="24"
          r="22"
          fill="none"
          strokeWidth="4"
          stroke="#eeeeee"
        />
        <circle
          className="path"
          cx="24"
          cy="24"
          r="22"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10"
          stroke="#fd7792"
        />
      </svg>
      <p
        className="mt-5 text-center text-xs uppercase tracking-[3px] text-black"
        style={{ fontFamily: '"Poppins", Arial, sans-serif' }}
      >
        Hannah Rooms
      </p>
      <p className="mt-1 text-center text-xs text-gray-600">{percent}%</p>
      <p className="sr-only">Loading Hannah Rooms</p>
    </div>
  )
}
