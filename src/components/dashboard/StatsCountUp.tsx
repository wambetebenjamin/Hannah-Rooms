'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/** Stat tile with GSAP count-up. */
export default function StatsCountUp({
  label,
  value,
  suffix = '',
}: {
  label: string
  value: number
  suffix?: string
}) {
  const numberRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = numberRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${value}${suffix}`
      return
    }
    const counter = { val: 0 }
    const tween = gsap.to(counter, {
      val: value,
      duration: 1.1,
      ease: 'power1.out',
      onUpdate: () => {
        el.textContent = `${Math.round(counter.val)}${suffix}`
      },
    })
    return () => {
      tween.kill()
    }
  }, [value, suffix])

  return (
    <div className="rounded-card bg-white p-5 shadow-card">
      <p className="text-3xl font-medium text-primary">
        <span ref={numberRef}>0{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-gray-600">{label}</p>
    </div>
  )
}
