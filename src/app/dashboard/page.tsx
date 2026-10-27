import Link from 'next/link'
import { redirect } from 'next/navigation'
import StatsCountUp from '@/components/dashboard/StatsCountUp'
import SavedRoomsList from '@/components/dashboard/SavedRoomsList'
import { auth } from '@/lib/auth'
import { getEnquiries, getRooms } from '@/lib/db'
import { formatDate, formatKes } from '@/lib/site'

export const metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const session = await auth()
  if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard')
  }
  const { tab } = await searchParams
  const isHost = session.user.role === 'host'

  const rooms = getRooms()
  const allEnquiries = getEnquiries()
  const enquiries = isHost
    ? allEnquiries.filter((e) => e.hostUserId === session.user.id)
    : allEnquiries.filter((e) => e.email === session.user.email)

  if (tab === 'account') {
    return (
      <div>
        <h1 className="text-2xl text-black/80 sm:text-3xl">Account</h1>
        <div className="mt-6 max-w-xl rounded-card border border-black/10 bg-white p-6 shadow-card">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-gray-600">Name</dt>
              <dd className="font-medium text-black/80">{session.user.name}</dd>
            </div>
            <div>
              <dt className="text-gray-600">Account type</dt>
              <dd className="font-medium text-black/80">{isHost ? 'Host' : 'Seeker'}</dd>
            </div>
            <div>
              <dt className="text-gray-600">Data and privacy</dt>
              <dd>
                <Link href="/legal/privacy-policy" className="hover:text-primary">
                  Privacy policy (KDPA 2019)
                </Link>
                {' · '}
                <Link href="/legal/cookie-policy" className="hover:text-primary">
                  Cookie policy
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-gray-600">Need help?</dt>
              <dd>
                <a
                  href="https://wa.me/254112272061?text=Hi%20Hannah%20Rooms%2C%20I%20need%20help%20finding%20a%20room"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Chat with us on WhatsApp
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    )
  }

  if (tab === 'saved') {
    return (
      <div>
        <h1 className="text-2xl text-black/80 sm:text-3xl">Saved rooms</h1>
        <div className="mt-6">
          <SavedRoomsList rooms={rooms} />
        </div>
      </div>
    )
  }

  if (isHost) {
    const myRooms = rooms.filter((r) => r.hostUserId === session.user.id)
    const active = myRooms.filter((r) => r.status === 'active').length
    const newCount = enquiries.filter((e) => e.status === 'New').length
    const occupancy = myRooms.length
      ? Math.round(((myRooms.length - active) / myRooms.length) * 100)
      : 0

    return (
      <div>
        <h1 className="text-2xl text-black/80 sm:text-3xl">Host overview</h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Welcome back, {session.user.name}. Here is how your rooms are doing.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCountUp label="Active listings" value={active} />
          <StatsCountUp label="Total enquiries" value={enquiries.length} />
          <StatsCountUp label="New enquiries" value={newCount} />
          <StatsCountUp label="Rooms paused or taken" value={occupancy} suffix="%" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-black/80">Your listings</h2>
              <Link href="/dashboard/listings" className="text-sm hover:text-primary">
                Manage all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {myRooms.slice(0, 4).map((room) => (
                <div key={room.id} className="flex items-center justify-between rounded-card border border-black/10 bg-white p-4 shadow-card">
                  <div>
                    <p className="font-medium text-black/80">{room.title}</p>
                    <p className="text-sm text-gray-600">
                      {formatKes(room.weeklyKes)} per week · {room.status}
                    </p>
                  </div>
                  <Link href={`/rooms/${room.slug}`} className="btn btn-outline-primary min-h-[44px] px-3">
                    View
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-black/80">Enquiry inbox</h2>
              <Link href="/dashboard/enquiries" className="text-sm hover:text-primary">
                Open inbox
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {enquiries.slice(0, 4).map((enq) => (
                <div key={enq.id} className="rounded-card border border-black/10 bg-white p-4 shadow-card">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-black/80">{enq.name}</p>
                    <span className="rounded-full bg-light px-3 py-1 text-xs text-gray-600">{enq.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{enq.roomTitle}</p>
                  <p className="mt-1 text-xs text-gray-600">{formatDate(enq.createdAt)}</p>
                </div>
              ))}
              {enquiries.length === 0 ? (
                <p className="rounded-card border border-black/10 bg-white p-4 text-sm text-gray-600 shadow-card">
                  No enquiries yet. They will appear here when seekers write to you.
                </p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl text-black/80 sm:text-3xl">Seeker overview</h1>
      <p className="mt-2 text-sm text-gray-600 sm:text-base">
        Welcome back, {session.user.name}. Track your enquiries and saved rooms here.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCountUp label="Enquiries sent" value={enquiries.length} />
        <StatsCountUp label="Host replies" value={enquiries.filter((e) => e.status === 'Replied').length} />
        <StatsCountUp label="Rooms to browse" value={rooms.filter((r) => r.status === 'active').length} />
      </div>

      <section className="mt-10">
        <h2 className="text-xl text-black/80">Your enquiries</h2>
        <p className="mt-1 text-sm text-gray-600 sm:hidden">Scroll the table sideways to see every column.</p>
        <div className="mt-4 overflow-x-auto rounded-card border border-black/10 bg-white shadow-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="bg-light">
                <th className="p-4 font-medium text-black/80">Room</th>
                <th className="p-4 font-medium text-black/80">Sent</th>
                <th className="p-4 font-medium text-black/80">Move-in</th>
                <th className="p-4 font-medium text-black/80">Status</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enq) => (
                <tr key={enq.id} className="border-t border-black/10">
                  <td className="p-4 text-gray-600">{enq.roomTitle}</td>
                  <td className="p-4 text-gray-600">{formatDate(enq.createdAt)}</td>
                  <td className="p-4 text-gray-600">{enq.moveInDate}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-light px-3 py-1 text-xs text-gray-600">{enq.status}</span>
                  </td>
                </tr>
              ))}
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-gray-600">
                    You have not sent an enquiry yet.{' '}
                    <Link href="/rooms" className="hover:text-primary">
                      Browse rooms
                    </Link>{' '}
                    and write to a host.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl text-black/80">Saved rooms</h2>
        <div className="mt-4">
          <SavedRoomsList rooms={rooms} />
        </div>
      </section>
    </div>
  )
}
