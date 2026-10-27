'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const TOUR_SCRIPT =
  'Welcome to Hannah Rooms. Find boarding and short-stay rooms across Kenya with clear weekly prices in shillings, real photos, and direct host contact. Every listing includes safety tips so you can move with more confidence. If you have a spare room, you can list it in minutes. Scroll down to browse rooms in your budget.'

/**
 * Voice tour, fixed bottom-left 56x56, z-index 9998. Starts once on the first
 * scroll or click. rate 0.95, pitch 1.1, lang en-KE.
 */
export default function VoiceTour() {
  const [muted, setMuted] = useState(false)
  const [ended, setEnded] = useState(false)
  const [started, setStarted] = useState(false)
  const mutedRef = useRef(false)
  const startedRef = useRef(false)

  const speak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(TOUR_SCRIPT)
    utterance.rate = 0.95
    utterance.pitch = 1.1
    utterance.lang = 'en-KE'
    utterance.onend = () => setEnded(true)
    utterance.onerror = () => setEnded(true)
    window.speechSynthesis.speak(utterance)
    startedRef.current = true
    setStarted(true)
    setEnded(false)
  }

  const startOnce = () => {
    if (startedRef.current || mutedRef.current) return
    speak()
  }

  useEffect(() => {
    const onScroll = () => startOnce()
    const onClick = () => startOnce()
    window.addEventListener('scroll', onScroll, { passive: true, once: true })
    window.addEventListener('pointerdown', onClick, { once: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointerdown', onClick)
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onClick = () => {
    if (ended || !started) {
      mutedRef.current = false
      setMuted(false)
      speak()
      return
    }
    if (muted) {
      mutedRef.current = false
      setMuted(false)
      speak()
      return
    }
    mutedRef.current = true
    setMuted(true)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }

  const label = ended ? 'Replay tour' : 'Site voice tour, click to mute'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="fixed bottom-4 left-4 z-[9998] flex h-[56px] w-[56px] items-center justify-center rounded-full bg-primary text-white shadow-card transition-transform active:scale-95"
    >
      {muted ? <VolumeX className="h-6 w-6" aria-hidden="true" /> : <Volume2 className="h-6 w-6" aria-hidden="true" />}
    </button>
  )
}
