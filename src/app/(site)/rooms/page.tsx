import { Suspense } from 'react'
import PageHero from '@/components/PageHero'
import RoomsExplorer from '@/components/rooms/RoomsExplorer'
import { getRooms } from '@/lib/db'

export const metadata = {
  title: 'Browse rooms',
}

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string; q?: string }>
}) {
  await searchParams
  const rooms = getRooms()
  const counties = Array.from(new Set(rooms.map((r) => r.county))).sort()
  const areas = Array.from(new Set(rooms.map((r) => r.area))).sort()

  return (
    <>
      <PageHero title="Browse rooms" breadcrumb="Rooms" image="/images/room-11.jpg" />
      <section className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Suspense fallback={<p className="text-gray-600">Loading rooms…</p>}>
          <RoomsExplorer rooms={rooms} counties={counties} areas={areas} />
        </Suspense>
      </section>
    </>
  )
}
