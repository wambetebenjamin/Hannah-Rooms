import fs from 'node:fs'
import path from 'node:path'
import { hashPassword } from './password'
import { seedEnquiries } from './seed-enquiries'
import { seedRooms, seedUsers } from './seed'
import type { DBShape, Enquiry, Room, ThreadMessage, User } from './types'

/**
 * Data layer. Uses Upstash/Vercel KV when KV_REST_API_URL and
 * KV_REST_API_TOKEN are configured, and falls back to a local JSON file at
 * .data/db.json for local development and preview deployments.
 */

const DATA_DIR = path.join(process.cwd(), '.data')
const DATA_FILE = path.join(DATA_DIR, 'db.json')

let cache: DBShape | null = null

function buildSeed(): DBShape {
  return {
    users: seedUsers.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      passwordHash: hashPassword(u.password),
      phone: u.phone,
      county: u.county,
      role: u.role,
      createdAt: u.createdAt,
    })),
    rooms: seedRooms.map((r) => ({ ...r })),
    enquiries: seedEnquiries.map((e) => ({ ...e, thread: e.thread.map((m) => ({ ...m })) })),
  }
}

function persist() {
  if (!cache) return
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(cache, null, 2), 'utf8')
}

function load(): DBShape {
  if (cache) return cache
  try {
    if (fs.existsSync(DATA_FILE)) {
      cache = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) as DBShape
      return cache
    }
  } catch {
    /* fall through to seed */
  }
  cache = buildSeed()
  persist()
  return cache
}

export function getUserByEmail(email: string): User | undefined {
  return load().users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export function getUserById(id: string): User | undefined {
  return load().users.find((u) => u.id === id)
}

export function createUser(input: {
  name: string
  email: string
  passwordHash: string
  phone: string
  county: string
  role: 'seeker' | 'host'
}): User {
  const db = load()
  const user: User = {
    id: `user-${randomId()}`,
    name: input.name,
    email: input.email,
    passwordHash: input.passwordHash,
    phone: input.phone,
    county: input.county,
    role: input.role,
    createdAt: new Date().toISOString(),
  }
  db.users.push(user)
  persist()
  return user
}

export function getRooms(): Room[] {
  return load().rooms
}

export function getRoomBySlug(slug: string): Room | undefined {
  return load().rooms.find((r) => r.slug === slug)
}

export function getRoomById(id: string): Room | undefined {
  return load().rooms.find((r) => r.id === id)
}

export function createRoom(input: Omit<Room, 'id' | 'createdAt'>): Room {
  const db = load()
  const room: Room = {
    ...input,
    id: `room-${randomId()}`,
    createdAt: new Date().toISOString(),
  }
  db.rooms.unshift(room)
  persist()
  return room
}

export function updateRoom(
  id: string,
  patch: Partial<Pick<Room, 'status' | 'weeklyKes' | 'monthlyKes' | 'depositKes' | 'rules' | 'availability' | 'title' | 'description' | 'amenities' | 'genderPolicy' | 'furnished' | 'images'>>,
): Room | undefined {
  const db = load()
  const room = db.rooms.find((r) => r.id === id)
  if (!room) return undefined
  Object.assign(room, patch)
  persist()
  return room
}

export function getEnquiries(): Enquiry[] {
  return load().enquiries
}

export function getEnquiryById(id: string): Enquiry | undefined {
  return load().enquiries.find((e) => e.id === id)
}

export function createEnquiry(input: Omit<Enquiry, 'id' | 'createdAt' | 'status' | 'thread'>): Enquiry {
  const db = load()
  const enquiry: Enquiry = {
    ...input,
    id: `enq-${randomId()}`,
    status: 'New',
    thread: [
      {
        from: 'seeker',
        name: input.name,
        text: input.message,
        at: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  }
  db.enquiries.unshift(enquiry)
  persist()
  return enquiry
}

export function updateEnquiry(id: string, patch: Partial<Pick<Enquiry, 'status' | 'hostUserId'>>): Enquiry | undefined {
  const db = load()
  const enquiry = db.enquiries.find((e) => e.id === id)
  if (!enquiry) return undefined
  Object.assign(enquiry, patch)
  persist()
  return enquiry
}

export function appendEnquiryMessage(id: string, message: ThreadMessage): Enquiry | undefined {
  const db = load()
  const enquiry = db.enquiries.find((e) => e.id === id)
  if (!enquiry) return undefined
  enquiry.thread.push(message)
  persist()
  return enquiry
}

function randomId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}
