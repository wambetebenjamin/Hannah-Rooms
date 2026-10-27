import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createRoom, getUserById } from '@/lib/db'
import { enquiryNotifyEmail, roomConfirmationEmail, sendMail } from '@/lib/mail'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { roomCreateSchema } from '@/lib/schemas'
import { saveRoomPhotos } from '@/lib/storage'

export async function POST(req: Request) {
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const str = (key: string) => (typeof form.get(key) === 'string' ? (form.get(key) as string) : '')

  // reCAPTCHA v3 first.
  const captcha = await verifyRecaptcha(str('captchaToken'), 'list-room', str('v2Token'))
  if (!captcha.ok) {
    return NextResponse.json(
      {
        error: 'Captcha check failed. Please confirm you are human and try again.',
        requiresV2: captcha.requiresV2,
      },
      { status: 400 },
    )
  }

  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Sign in to list a room.' }, { status: 401 })
  }
  const host = getUserById(session.user.id)
  if (!host) {
    return NextResponse.json({ error: 'Account not found.' }, { status: 401 })
  }

  let amenities: string[] = []
  try {
    amenities = JSON.parse(str('amenities') || '[]')
    if (!Array.isArray(amenities)) amenities = []
  } catch {
    amenities = []
  }

  const monthlyRaw = str('monthlyKes')
  const parsed = roomCreateSchema.safeParse({
    title: str('title'),
    county: str('county'),
    area: str('area'),
    landmark: str('landmark'),
    type: str('type'),
    furnished: str('furnished') === 'true',
    amenities,
    genderPolicy: str('genderPolicy'),
    weeklyKes: str('weeklyKes'),
    monthlyKes: monthlyRaw === '' ? null : monthlyRaw,
    depositKes: str('depositKes'),
    depositCovers: str('depositCovers'),
    rules: str('rules'),
    availability: str('availability'),
    description: str('description'),
  })
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Please check the form and try again.' },
      { status: 400 },
    )
  }

  const photos = form.getAll('photos').filter((p): p is File => p instanceof File && p.size > 0)
  if (photos.length === 0) {
    return NextResponse.json({ error: 'Please add at least one photo of the room.' }, { status: 400 })
  }
  if (photos.length > 8) {
    return NextResponse.json({ error: 'You can upload up to 8 photos.' }, { status: 400 })
  }

  const images = await saveRoomPhotos(photos)

  const slugBase = parsed.data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)

  const room = createRoom({
    ...parsed.data,
    monthlyKes: parsed.data.monthlyKes ?? null,
    slug: `${slugBase}-${Math.random().toString(36).slice(2, 6)}`,
    images,
    hostName: host.name,
    hostSince: new Date(host.createdAt).getFullYear(),
    responseNote: 'Usually replies within a day',
    status: 'active',
    hostUserId: host.id,
    featured: false,
  })

  await sendMail(roomConfirmationEmail(room.title, host.name))
  await sendMail(
    enquiryNotifyEmail(room.title, host.name, host.phone, 'New listing submitted for review.'),
  )

  return NextResponse.json({ room }, { status: 201 })
}
