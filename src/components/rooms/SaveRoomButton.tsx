'use client'

import { useEffect, useState } from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'

const STORAGE_KEY = 'hannah-rooms-saved'

function readSaved(): string[] {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

/** Save room for authenticated users (kept on this device). */
export default function SaveRoomButton({ slug }: { slug: string }) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(readSaved().includes(slug))
  }, [slug])

  const toggle = () => {
    const list = readSaved()
    const next = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* storage blocked: ignore */
    }
    setSaved(next.includes(slug))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      className={`btn ${saved ? 'btn-primary' : 'btn-outline-primary'} min-h-[44px]`}
    >
      {saved ? (
        <>
          <BookmarkCheck className="h-4 w-4" aria-hidden="true" /> Saved
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4" aria-hidden="true" /> Save room
        </>
      )}
    </button>
  )
}
