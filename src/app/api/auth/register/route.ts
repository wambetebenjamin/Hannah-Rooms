import { NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/db'
import { hashPassword } from '@/lib/password'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { registerSchema } from '@/lib/schemas'

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
    'register',
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

  const parsed = registerSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Please check the form and try again.' },
      { status: 400 },
    )
  }

  const { name, email, password, phone, county, role } = parsed.data
  if (getUserByEmail(email)) {
    return NextResponse.json(
      { error: 'An account with that email already exists. Try signing in.' },
      { status: 409 },
    )
  }

  const user = createUser({
    name,
    email,
    passwordHash: hashPassword(password),
    phone,
    county,
    role,
  })

  return NextResponse.json(
    { user: { id: user.id, name: user.name, email: user.email, role: user.role } },
    { status: 201 },
  )
}
