import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { appendEnquiryMessage, getEnquiryById, updateEnquiry } from '@/lib/db'
import { enquiryReplyEmail, sendMail } from '@/lib/mail'
import { enquiryReplySchema } from '@/lib/schemas'

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Sign in to reply to enquiries.' }, { status: 401 })
  }

  const parsed = enquiryReplySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Please check the reply and try again.' },
      { status: 400 },
    )
  }

  const enquiry = getEnquiryById(parsed.data.enquiryId)
  if (!enquiry) {
    return NextResponse.json({ error: 'Enquiry not found.' }, { status: 404 })
  }

  const isHostOwner = session.user.role === 'host' && enquiry.hostUserId === session.user.id
  const isSeekerSender = enquiry.email === session.user.email
  if (!isHostOwner && !isSeekerSender) {
    return NextResponse.json({ error: 'This enquiry is not yours.' }, { status: 403 })
  }

  const updated = appendEnquiryMessage(enquiry.id, {
    from: isHostOwner ? 'host' : 'seeker',
    name: session.user.name || 'User',
    text: parsed.data.message,
    at: new Date().toISOString(),
  })
  const withStatus = updateEnquiry(enquiry.id, {
    status: parsed.data.status || (isHostOwner ? 'Replied' : enquiry.status),
    hostUserId: enquiry.hostUserId ?? undefined,
  })

  if (isHostOwner) {
    await sendMail(enquiryReplyEmail(enquiry.roomTitle, enquiry.name, parsed.data.message))
  }

  return NextResponse.json({ enquiry: withStatus || updated }, { status: 200 })
}
