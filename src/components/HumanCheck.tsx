'use client'

import { useEffect, useRef, useState } from 'react'
import { getCaptchaSiteKey, loadRecaptchaV2 } from '@/lib/captchaClient'

/**
 * Visible v2 challenge shown when the reCAPTCHA v3 score is below 0.5.
 * With a site key it renders the real reCAPTCHA v2 checkbox. Without keys it
 * shows a plain human confirmation so the flow stays testable.
 */
export default function HumanCheck({
  onVerify,
}: {
  onVerify: (token: string) => void
}) {
  const siteKey = getCaptchaSiteKey()
  const containerRef = useRef<HTMLDivElement>(null)
  const [manualChecked, setManualChecked] = useState(false)

  useEffect(() => {
    if (!siteKey) return
    let cancelled = false
    loadRecaptchaV2()
      .then(() => {
        const grecaptcha = (window as unknown as {
          grecaptcha?: {
            ready: (cb: () => void) => void
            render: (el: HTMLElement, opts: { sitekey: string; callback: (token: string) => void }) => number
          }
        }).grecaptcha
        if (cancelled || !grecaptcha || !containerRef.current) return
        grecaptcha.ready(() => {
          if (cancelled || !containerRef.current) return
          grecaptcha.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => onVerify(token),
          })
        })
      })
      .catch(() => {
        /* fall back to the manual confirmation below */
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey])

  return (
    <div className="mt-3 rounded-card border-2 border-primary bg-light p-4">
      <p className="font-medium text-black">Please confirm you are human.</p>
      <p className="mt-1 text-sm text-gray-600">
        Our automated check was not sure about the last request. Complete this quick check and send
        again.
      </p>
      {siteKey ? (
        <div ref={containerRef} className="mt-3" />
      ) : (
        <label className="mt-3 flex min-h-[44px] cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={manualChecked}
            onChange={(e) => {
              setManualChecked(e.target.checked)
              onVerify(e.target.checked ? 'human-confirmed' : '')
            }}
            className="h-5 w-5 accent-primary"
          />
          <span className="text-sm text-black/80">I am not a robot</span>
        </label>
      )}
    </div>
  )
}
