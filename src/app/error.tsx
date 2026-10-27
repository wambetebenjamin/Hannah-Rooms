'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center bg-light px-4">
      <div className="w-full max-w-xl rounded-card bg-white p-8 text-center shadow-card sm:p-12">
        <p className="subheading">500</p>
        <h1 className="mt-2 text-3xl font-bold text-black/80 sm:text-4xl">
          Something broke on our side
        </h1>
        <p className="mt-4 text-sm text-gray-600 sm:text-base">
          We are sorry. Nothing you did caused this. Try again, or reach us on WhatsApp and we will
          help you finish what you were doing.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={reset} className="btn btn-primary w-full sm:w-auto">
            Try again
          </button>
          <Link
            href="https://wa.me/254112272061?text=Hi%20Hannah%20Rooms%2C%20I%20need%20help%20finding%20a%20room"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary w-full sm:w-auto"
          >
            WhatsApp +254112272061
          </Link>
        </div>
        <p className="mt-8 text-sm text-gray-600">Hannah Rooms. A room you can trust.</p>
      </div>
    </main>
  )
}
