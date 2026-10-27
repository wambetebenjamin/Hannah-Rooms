import Link from 'next/link'
import { redirect } from 'next/navigation'
import ListingsManager from '@/components/dashboard/ListingsManager'
import { auth } from '@/lib/auth'
import { getRooms } from '@/lib/db'

export const metadata = {
  title: 'My listings',
}

export default async function ListingsPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard/listings')
  }
  const rooms = getRooms().filter((r) => r.hostUserId === session.user.id)

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl text-black/80 sm:text-3xl">My listings</h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Edit prices and rules, pause a listing while a tenant is deciding, or mark it taken when
            the room is filled.
          </p>
        </div>
        <Link href="/list-room" className="btn btn-primary shrink-0">
          List a room
        </Link>
      </div>

      <div className="mt-6">
        {rooms.length === 0 ? (
          <div className="rounded-card border border-black/10 bg-white p-8 text-center shadow-card">
            <p className="text-black/80">You have no listings yet.</p>
            <Link href="/list-room" className="btn btn-primary mt-5">
              List your first room
            </Link>
          </div>
        ) : (
          <ListingsManager rooms={rooms} />
        )}
      </div>
    </div>
  )
}
