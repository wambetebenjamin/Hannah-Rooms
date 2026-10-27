import { redirect } from 'next/navigation'
import ListRoomForm from '@/components/list-room/ListRoomForm'
import PageHero from '@/components/PageHero'
import { auth } from '@/lib/auth'

export const metadata = {
  title: 'List a room',
}

export default async function ListRoomPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/login?callbackUrl=/list-room')
  }

  return (
    <>
      <PageHero title="List a room" breadcrumb="List a room" image="/images/room-05.jpg" />
      <section className="w-full max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-sm text-gray-600 sm:text-base">
          Four short steps: location, room details, pricing, then photos and rules. Listings are
          reviewed before they appear in search. Your first active listing is free.
        </p>
        <div className="mt-8">
          <ListRoomForm />
        </div>
      </section>
    </>
  )
}
