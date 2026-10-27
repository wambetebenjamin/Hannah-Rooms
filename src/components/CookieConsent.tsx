'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'hannah-rooms-cookie-consent'

interface Consent {
  necessary: true
  functional: boolean
  analytics: boolean
  marketing: boolean
  savedAt: string
}

const DEFAULT_CONSENT: Consent = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  savedAt: '',
}

/**
 * Cookie consent banner (KDPA 2019 aware). Necessary cookies are locked on.
 * Preference is stored in localStorage under hannah-rooms-cookie-consent.
 */
export default function CookieConsent() {
  const [loaded, setLoaded] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showManage, setShowManage] = useState(false)
  const [consent, setConsent] = useState<Consent>(DEFAULT_CONSENT)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setConsent({ ...DEFAULT_CONSENT, ...JSON.parse(raw) })
      } else {
        setShowBanner(true)
      }
    } catch {
      setShowBanner(true)
    }
    setLoaded(true)
  }, [])

  const save = (next: Consent) => {
    const withDate = { ...next, necessary: true as const, savedAt: new Date().toISOString() }
    setConsent(withDate)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(withDate))
    } catch {
      /* storage blocked: banner simply closes */
    }
    setShowBanner(false)
    setShowManage(false)
  }

  if (!loaded) return null

  return (
    <>
      {showBanner && (
        <div
          className="fixed inset-x-0 bottom-0 z-[9997] border-t border-black/10 bg-white px-4 py-4 shadow-[0px_15px_34px_-29px_rgba(0,0,0,0.54)] sm:px-6"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-3xl">
              <p className="font-medium text-black">We use cookies carefully.</p>
              <p className="mt-1 text-sm text-gray-600">
                Necessary cookies keep the site working. With your consent we also use functional,
                analytics, and marketing cookies. You can change this any time. Hannah Rooms handles
                data under the Kenya Data Protection Act, 2019.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={() => save({ ...consent, functional: true, analytics: true, marketing: true })}
                className="btn btn-primary w-full min-h-[44px] sm:w-auto"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => setShowManage(true)}
                className="btn btn-outline-primary w-full min-h-[44px] sm:w-auto"
              >
                Manage Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {showManage && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-6">
          <div
            className="w-full max-w-lg rounded-t-2xl bg-white p-6 shadow-form sm:rounded-2xl"
            role="dialog"
            aria-label="Manage cookie preferences"
          >
            <h2 className="font-serif text-2xl text-black">Cookie preferences</h2>
            <p className="mt-2 text-sm text-gray-600">
              Choose what you allow. Necessary cookies are always on because the site cannot work
              without them.
            </p>
            <ul className="mt-4 divide-y divide-black/10">
              <ToggleRow
                label="Necessary"
                hint="Sign-in, security, and saving your cookie choice."
                checked
                locked
                onChange={() => undefined}
              />
              <ToggleRow
                label="Functional"
                hint="Remembers filters and saved rooms on this device."
                checked={consent.functional}
                onChange={(v) => setConsent((c) => ({ ...c, functional: v }))}
              />
              <ToggleRow
                label="Analytics"
                hint="Helps us understand which listings people view."
                checked={consent.analytics}
                onChange={(v) => setConsent((c) => ({ ...c, analytics: v }))}
              />
              <ToggleRow
                label="Marketing"
                hint="Used only to measure our own outreach."
                checked={consent.marketing}
                onChange={(v) => setConsent((c) => ({ ...c, marketing: v }))}
              />
            </ul>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => save(consent)}
                className="btn btn-primary w-full sm:w-auto"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={() => save({ ...consent, functional: true, analytics: true, marketing: true })}
                className="btn btn-outline-primary w-full sm:w-auto"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ToggleRow({
  label,
  hint,
  checked,
  locked = false,
  onChange,
}: {
  label: string
  hint: string
  checked: boolean
  locked?: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <li className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="font-medium text-black">{label}{locked ? ' (always on)' : ''}</p>
        <p className="text-xs text-gray-600">{hint}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${label} cookies`}
        disabled={locked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 min-w-[44px] rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-black/20'
        } ${locked ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
            checked ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </li>
  )
}
