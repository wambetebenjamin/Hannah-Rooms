import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getRoomById, updateRoom } from '@/lib/db'
import { roomUpdateSchema } from '@/lib/schemas'

export async function PUT(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Sign in to manage listings.' }, { status: 401 })
  }

  const parsed = roomUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Please check the form and try again.' },
      { status: 400 },
    )
  }

  const existing = getRoomById(parsed.data.roomId)
  if (!existing) {
    return NextResponse.json({ error: 'Listing not found.' }, { status: 404 })
  }
  if (existing.hostUserId !== session.user.id) {
    return NextResponse.json({ error: 'You can only edit your own listings.' }, { status: 403 })
  }

  const { roomId, ...patch } = parsed.data
  const room = updateRoom(roomId, patch)
  return NextResponse.json({ room }, { status: 200 })
}
