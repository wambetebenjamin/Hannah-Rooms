import { z } from 'zod'

export const roomTypes = ['Private room', 'Shared room', 'Bedsitter', 'Studio', 'Hostel bed'] as const
export const genderPolicies = ['Any', 'Female only', 'Male only'] as const
export const amenityOptions = ['Water', 'Wi-Fi', 'Billeting', 'Own gate', 'Parking'] as const

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(80),
  email: z.string().trim().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password needs at least 8 characters.').max(100),
  phone: z.string().trim().min(7, 'Please enter a phone number we can reach.').max(20),
  county: z.string().trim().min(2, 'Please choose a county.').max(60),
  role: z.enum(['seeker', 'host']),
})

export const roomCreateSchema = z.object({
  title: z.string().trim().min(6, 'Give the listing a clear title.').max(120),
  county: z.string().trim().min(2).max(60),
  area: z.string().trim().min(2).max(60),
  landmark: z.string().trim().min(2, 'Add a nearby landmark so seekers can place the room.').max(160),
  type: z.enum(roomTypes),
  furnished: z.boolean(),
  amenities: z.array(z.enum(amenityOptions)).max(10),
  genderPolicy: z.enum(genderPolicies),
  weeklyKes: z.coerce.number().int().min(200, 'Weekly price looks too low.').max(200000),
  monthlyKes: z.coerce.number().int().min(0).max(1000000).nullable(),
  depositKes: z.coerce.number().int().min(0).max(1000000),
  depositCovers: z.string().trim().min(4, 'Explain what the deposit covers.').max(400),
  rules: z.string().trim().min(4, 'Add the house rules in plain language.').max(1200),
  availability: z.string().trim().min(2).max(200),
  description: z.string().trim().min(10, 'Describe the room honestly.').max(2000),
})

export const roomUpdateSchema = z.object({
  roomId: z.string().min(1),
  status: z.enum(['active', 'paused', 'taken']).optional(),
  weeklyKes: z.coerce.number().int().min(200).max(200000).optional(),
  monthlyKes: z.coerce.number().int().min(0).max(1000000).nullable().optional(),
  depositKes: z.coerce.number().int().min(0).max(1000000).optional(),
  rules: z.string().trim().min(4).max(1200).optional(),
  availability: z.string().trim().min(2).max(200).optional(),
  title: z.string().trim().min(6).max(120).optional(),
  description: z.string().trim().min(10).max(2000).optional(),
})

export const enquiryCreateSchema = z.object({
  roomId: z.string().min(1),
  name: z.string().trim().min(2, 'Please enter your name.').max(80),
  phone: z.string().trim().min(7, 'Please enter a phone number.').max(20),
  email: z.string().trim().email('Please enter a valid email.'),
  moveInDate: z.string().trim().min(4, 'Tell the host when you want to move in.').max(40),
  message: z.string().trim().min(5, 'Write a short message to the host.').max(1200),
})

export const enquiryReplySchema = z.object({
  enquiryId: z.string().min(1),
  message: z.string().trim().min(2, 'Write your reply.').max(2000),
  status: z.enum(['New', 'Replied', 'Closed']).optional(),
})

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  message: z.string().trim().min(5).max(2000),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type RoomCreateInput = z.infer<typeof roomCreateSchema>
export type RoomUpdateInput = z.infer<typeof roomUpdateSchema>
export type EnquiryCreateInput = z.infer<typeof enquiryCreateSchema>
export type EnquiryReplyInput = z.infer<typeof enquiryReplySchema>
