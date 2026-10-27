import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import EnquiryForm from '@/components/rooms/EnquiryForm'
import Gallery from '@/components/rooms/Gallery'
import SaveRoomButton from '@/components/rooms/SaveRoomButton'
import RoomCard from '@/components/RoomCard'
import SafetyTips from '@/components/SafetyTips'
import SectionHeading from '@/components/SectionHeading'
import { auth } from '@/lib/auth'
import { getRoomBySlug, getRooms } from '@/lib/db'
import { formatKes } from '@/lib/site'

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const room = getRoomBySlug(slug)
  if (!room) notFound()

  const session = await auth()
  const similar = getRooms()
    .filter((r) => r.id !== room.id && r.status === 'active')
    .sort((a, b) => {
      const aScore = (a.county === room.county ? 2 : 0) + (a.type === room.type ? 1 : 0)
      const bScore = (b.county === room.county ? 2 : 0) + (b.type === room.type ? 1 : 0)
      return bScore - aScore
    })
    .slice(0, 4)

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <p className="text-sm text-gray-600">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2 text-black/20">/</span>
          <Link href="/rooms" className="hover:text-primary">
            Rooms
          </Link>
          <span className="mx-2 text-black/20">/</span>
          <span className="text-black/70">{room.title}</span>
        </p>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[7fr_5fr]">
          <Gallery images={room.images} alt={room.title} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-light px-3 py-1 text-xs text-gray-600">{room.type}</span>
              <span className="rounded-full bg-light px-3 py-1 text-xs text-gray-600">
                {room.furnished ? 'Furnished' : 'Unfurnished'}
              </span>
              {room.genderPolicy !== 'Any' ? (
                <span className="rounded-full bg-light px-3 py-1 text-xs text-gray-600">
                  {room.genderPolicy}
                </span>
              ) : null}
            </div>
            <h1 className="mt-3 text-2xl text-black/80 sm:text-3xl lg:text-4xl">{room.title}</h1>
            <p className="mt-2 text-gray-600">
              {room.area}, {room.county} county. {room.landmark}.
            </p>

            <div className="mt-5 rounded-card border border-black/10 bg-light p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-2xl font-medium text-primary">{formatKes(room.weeklyKes)}</span>
                <span className="text-xs uppercase tracking-[2px] text-gray-600">per week</span>
              </div>
              {room.monthlyKes ? (
                <p className="mt-1 text-gray-600">{formatKes(room.monthlyKes)} per month</p>
              ) : (
                <p className="mt-1 text-gray-600">Monthly price: ask the host</p>
              )}
              <p className="mt-1 text-gray-600">
                Deposit: <span className="text-black/80">{formatKes(room.depositKes)}</span>
              </p>
              <p className="mt-2 text-sm text-gray-600">{room.depositCovers}</p>
            </div>

            {session?.user ? (
              <div className="mt-4">
                <SaveRoomButton slug={room.slug} />
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-600">
                <Link href="/login" className="hover:text-primary">
                  Sign in
                </Link>{' '}
                to save this room to your dashboard.
              </p>
            )}

            <div className="mt-6">
              <h2 className="text-xl text-black/80">About this room</h2>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">{room.description}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl text-black/80">Amenities</h2>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-xl text-black/80">House rules</h2>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">{room.rules}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl text-black/80">Availability</h2>
              <p className="mt-2 text-sm text-gray-600 sm:text-base">{room.availability}</p>
            </div>

            <div className="mt-6 rounded-card border border-black/10 bg-white p-5 shadow-card">
              <h2 className="text-xl text-black/80">Host</h2>
              <div className="mt-3 flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full bg-light">
                  <Image
                    src={room.images[0]}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-black/80">{room.hostName}</p>
                  <p className="text-sm text-gray-600">{room.responseNote}</p>
                  <p className="text-xs text-gray-600">Member since {room.hostSince}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <SafetyTips />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[7fr_5fr]">
          <div>
            <SectionHeading
              subheading="Before you pay"
              title="View first, pay after"
              align="left"
              intro="Meet in a public place if you can, confirm water and power in person, and get a written receipt for every shilling you pay."
            />
            <ul className="mt-5 space-y-3">
              {[
                'Ask the host for the exact house number and the name on the title.',
                'View the room with someone else present when possible.',
                'Agree in writing how the deposit is refunded and when.',
                'Report any listing that pressures you to pay before viewing.',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-gray-600 sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <EnquiryForm roomId={room.id} roomTitle={room.title} />
        </div>
      </div>

      <section className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading subheading="Similar rooms" title="You may also like" />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {similar.map((item, index) => (
            <RoomCard key={item.id} room={item} index={index} />
          ))}
        </div>
      </section>
    </>
  )
}
