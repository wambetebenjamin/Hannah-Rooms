export type Role = 'seeker' | 'host'

export type RoomType =
  | 'Private room'
  | 'Shared room'
  | 'Bedsitter'
  | 'Studio'
  | 'Hostel bed'

export type GenderPolicy = 'Any' | 'Female only' | 'Male only'

export type RoomStatus = 'active' | 'paused' | 'taken'

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  phone: string
  county: string
  role: Role
  createdAt: string
}

export interface Room {
  id: string
  slug: string
  title: string
  area: string
  county: string
  landmark: string
  type: RoomType
  furnished: boolean
  amenities: string[]
  genderPolicy: GenderPolicy
  weeklyKes: number
  monthlyKes: number | null
  depositKes: number
  depositCovers: string
  rules: string
  availability: string
  description: string
  images: string[]
  hostName: string
  hostSince: number
  responseNote: string
  status: RoomStatus
  createdAt: string
  hostUserId: string | null
  featured: boolean
}

export interface ThreadMessage {
  from: 'seeker' | 'host'
  name: string
  text: string
  at: string
}

export type EnquiryStatus = 'New' | 'Replied' | 'Closed'

export interface Enquiry {
  id: string
  roomId: string
  roomTitle: string
  hostUserId: string | null
  hostName: string
  name: string
  phone: string
  email: string
  moveInDate: string
  message: string
  status: EnquiryStatus
  thread: ThreadMessage[]
  createdAt: string
}

export interface DBShape {
  users: User[]
  rooms: Room[]
  enquiries: Enquiry[]
}
