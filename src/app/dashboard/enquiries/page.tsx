import { redirect } from 'next/navigation'
import EnquiryInbox from '@/components/dashboard/EnquiryInbox'
import { auth } from '@/lib/auth'
import { getEnquiries } from '@/lib/db'

export const metadata = {
  title: 'Enquiries',
}

export default async function EnquiriesPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard/enquiries')
  }
  const isHost = session.user.role === 'host'
  const enquiries = isHost
    ? getEnquiries().filter((e) => e.hostUserId === session.user.id)
    : getEnquiries().filter((e) => e.email === session.user.email)

  return (
    <div>
      <h1 className="text-2xl text-black/80 sm:text-3xl">
        {isHost ? 'Enquiry inbox' : 'Enquiries you sent'}
      </h1>
      <p className="mt-2 text-sm text-gray-600 sm:text-base">
        {isHost
          ? 'Reply to seekers and keep every conversation on the platform. Statuses: New, Replied, Closed.'
          : 'Track the status of your enquiries: New, Replied, or Closed.'}
      </p>
      <div className="mt-6">
        <EnquiryInbox enquiries={enquiries} viewerRole={isHost ? 'host' : 'seeker'} />
      </div>
    </div>
  )
}
