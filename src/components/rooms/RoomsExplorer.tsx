'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import RoomCard from '@/components/RoomCard'
import type { Room } from '@/lib/types'
import { cx, formatKes } from '@/lib/site'
import { amenityOptions, genderPolicies, roomTypes } from '@/lib/schemas'

const PAGE_SIZE = 6

type SortKey = 'newest' | 'price-asc' | 'price-desc'

export default function RoomsExplorer({
  rooms,
  counties,
  areas,
}: {
  rooms: Room[]
  counties: string[]
  areas: string[]
}) {
  const searchParams = useSearchParams()
  const [keyword, setKeyword] = useState(searchParams.get('q') || '')
  const [county, setCounty] = useState('')
  const [area, setArea] = useState(searchParams.get('area') || '')
  const [maxWeekly, setMaxWeekly] = useState('')
  const [types, setTypes] = useState<string[]>([])
  const [amenities, setAmenities] = useState<string[]>([])
  const [gender, setGender] = useState('Any')
  const [sort, setSort] = useState<SortKey>('newest')
  const [page, setPage] = useState(1)
  const [sheetOpen, setSheetOpen] = useState(false)

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase()
    const max = Number(maxWeekly) || Infinity
    const list = rooms.filter((room) => {
      if (room.status === 'taken') return false
      if (kw) {
        const haystack = `${room.title} ${room.area} ${room.county} ${room.type} ${room.description}`.toLowerCase()
        if (!haystack.includes(kw)) return false
      }
      if (county && room.county !== county) return false
      if (area && room.area !== area) return false
      if (room.weeklyKes > max) return false
      if (types.length > 0 && !types.includes(room.type)) return false
      if (amenities.length > 0 && !amenities.every((a) => room.amenities.includes(a))) return false
      if (gender !== 'Any' && room.genderPolicy !== gender) return false
      return true
    })

    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.weeklyKes - b.weeklyKes)
    else if (sort === 'price-desc') sorted.sort((a, b) => b.weeklyKes - a.weeklyKes)
    else sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    return sorted
  }, [rooms, keyword, county, area, maxWeekly, types, amenities, gender, sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pageCount)
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  const toggle = (list: string[], value: string, set: (v: string[]) => void) => {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
    setPage(1)
  }

  const resetAll = () => {
    setKeyword('')
    setCounty('')
    setArea('')
    setMaxWeekly('')
    setTypes([])
    setAmenities([])
    setGender('Any')
    setPage(1)
  }

  const filters = (
    <div className="space-y-6">
      <div>
        <label htmlFor="filter-county" className="block text-sm font-medium text-black/80">
          County
        </label>
        <select
          id="filter-county"
          value={county}
          onChange={(e) => {
            setCounty(e.target.value)
            setPage(1)
          }}
          className="form-control mt-2"
        >
          <option value="">All counties</option>
          {counties.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-area" className="block text-sm font-medium text-black/80">
          Area
        </label>
        <select
          id="filter-area"
          value={area}
          onChange={(e) => {
            setArea(e.target.value)
            setPage(1)
          }}
          className="form-control mt-2"
        >
          <option value="">All areas</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-price" className="block text-sm font-medium text-black/80">
          Price weekly max (KES)
        </label>
        <input
          id="filter-price"
          type="number"
          inputMode="numeric"
          min={0}
          placeholder="e.g. 3500"
          value={maxWeekly}
          onChange={(e) => {
            setMaxWeekly(e.target.value)
            setPage(1)
          }}
          className="form-control mt-2"
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-black/80">Room type</legend>
        <div className="mt-2 space-y-2">
          {roomTypes.map((t) => (
            <label key={t} className="flex min-h-[44px] cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={types.includes(t)}
                onChange={() => toggle(types, t, setTypes)}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm text-gray-600">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-black/80">Amenities</legend>
        <div className="mt-2 space-y-2">
          {amenityOptions.map((a) => (
            <label key={a} className="flex min-h-[44px] cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={amenities.includes(a)}
                onChange={() => toggle(amenities, a, setAmenities)}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm text-gray-600">{a}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-black/80">Gender policy</legend>
        <div className="mt-2 space-y-2">
          {genderPolicies.map((g) => (
            <label key={g} className="flex min-h-[44px] cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="gender-policy"
                checked={gender === g}
                onChange={() => {
                  setGender(g)
                  setPage(1)
                }}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm text-gray-600">{g}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button type="button" onClick={resetAll} className="btn btn-outline-primary w-full">
        Clear filters
      </button>
    </div>
  )

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block lg:w-64">
        <div className="rounded-card border border-black/10 bg-white p-5 shadow-card">
          <h2 className="text-xl text-black/80">Filters</h2>
          <div className="mt-4">{filters}</div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setPage(1)
            }}
            className="flex w-full gap-2 sm:max-w-md"
          >
            <label htmlFor="room-search" className="sr-only">
              Search rooms
            </label>
            <input
              id="room-search"
              type="search"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value)
                setPage(1)
              }}
              placeholder="Search by title, area, or town"
              className="form-control"
            />
            <button type="submit" className="btn btn-primary shrink-0">
              Search
            </button>
          </form>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="btn btn-outline-primary lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filters
            </button>
            <label htmlFor="room-sort" className="sr-only">
              Sort rooms
            </label>
            <select
              id="room-sort"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as SortKey)
                setPage(1)
              }}
              className="form-control w-auto"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          {filtered.length} room{filtered.length === 1 ? '' : 's'} found
          {area ? ` in ${area}` : ''}
          {maxWeekly ? ` under ${formatKes(Number(maxWeekly))} per week` : ''}.
        </p>

        {visible.length === 0 ? (
          <div className="mt-8 rounded-card border border-black/10 bg-light p-8 text-center">
            <p className="text-black/80">No rooms match those filters yet.</p>
            <p className="mt-2 text-sm text-gray-600">
              Try a higher weekly budget, a nearby area, or clear the filters and start again.
            </p>
            <button type="button" onClick={resetAll} className="btn btn-primary mt-5">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {visible.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} />
            ))}
          </div>
        )}

        {pageCount > 1 && (
          <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={current <= 1}
              onClick={() => setPage(current - 1)}
              className="btn btn-outline-primary min-h-[44px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={p === current ? 'page' : undefined}
                className={cx(
                  'flex min-h-[44px] min-w-[44px] items-center justify-center rounded-btn border px-3 text-sm transition-colors',
                  p === current
                    ? 'border-primary bg-primary text-white'
                    : 'border-black/10 text-gray-600 hover:border-primary hover:text-primary',
                )}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              disabled={current >= pageCount}
              onClick={() => setPage(current + 1)}
              className="btn btn-outline-primary min-h-[44px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        )}
      </div>

      {/* Mobile bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-[9996] flex items-end lg:hidden" role="dialog" aria-label="Filters">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/40"
            onClick={() => setSheetOpen(false)}
          />
          <div className="relative max-h-[80vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 pb-safe shadow-form">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-black/80">Filters</h2>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setSheetOpen(false)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-black/60"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4">{filters}</div>
            <button type="button" onClick={() => setSheetOpen(false)} className="btn btn-primary mt-6 w-full">
              Show {filtered.length} room{filtered.length === 1 ? '' : 's'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
