import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/mail'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { contactSchema } from '@/lib/schemas'

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
    'contact',
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

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Please check the form and try again.' },
      { status: 400 },
    )
  }

  await sendMail({
    to: process.env.ADMIN_EMAIL || process.env.SMTP_FROM || 'admin@hannahrooms.example',
    subject: `Hannah Rooms contact: ${parsed.data.name}`,
    text: `Message from ${parsed.data.name} (${parsed.data.email}):\n\n${parsed.data.message}`,
  })

  return NextResponse.json({ ok: true }, { status: 200 })
}
