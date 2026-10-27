import { NextResponse } from 'next/server'
import { createEnquiry, getRoomById, updateEnquiry } from '@/lib/db'
import { enquiryNotifyEmail, sendMail } from '@/lib/mail'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { enquiryCreateSchema } from '@/lib/schemas'

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // reCAPTCHA v3 first.
  const captcha = await verifyRecaptcha(
    typeof body.captchaToken === 'string' ? body.captchaToken : '',
    'enquiry',
    typeof body.v2Token === 'string' ? body.v2Token : '',
  )
  if (!captcha.ok) {
    return NextResponse.json(
      {
        error: 'Captcha check failed. Please confirm you are human and try again.',
        requiresV2: captcha.requiresV2,
      },
      { status: 400 },
    )
  }

  const parsed = enquiryCreateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Please check the form and try again.' },
      { status: 400 },
    )
  }

  const room = getRoomById(parsed.data.roomId)
  if (!room) {
    return NextResponse.json({ error: 'That room is no longer listed.' }, { status: 404 })
  }

  const enquiry = createEnquiry({
    roomId: room.id,
    roomTitle: room.title,
    hostUserId: room.hostUserId,
    hostName: room.hostName,
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email,
    moveInDate: parsed.data.moveInDate,
    message: parsed.data.message,
  })

  if (enquiry.hostUserId) {
    updateEnquiry(enquiry.id, { hostUserId: enquiry.hostUserId })
  }

  await sendMail(enquiryNotifyEmail(room.title, parsed.data.name, parsed.data.phone, parsed.data.message))

  return NextResponse.json({ enquiry }, { status: 201 })
}
