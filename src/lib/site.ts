export const SITE_NAME = 'Hannah Rooms'
export const SITE_TAGLINE = 'A room you can trust.'
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254112272061'
export const WHATSAPP_DISPLAY = '+254112272061'
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi Hannah Rooms, I need help finding a room',
)}`

export function formatKes(amount: number): string {
  return `KSh ${amount.toLocaleString('en-KE')}`
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-KE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
