import nodemailer from 'nodemailer'

interface MailInput {
  to: string
  subject: string
  text: string
  html?: string
}

/**
 * Sends mail through SMTP when SMTP_HOST is configured. Without SMTP
 * credentials (local preview) the message is logged so flows stay testable.
 */
export async function sendMail({ to, subject, text, html }: MailInput): Promise<void> {
  const host = process.env.SMTP_HOST
  if (!host) {
    console.log(`[mail:dev-fallback] to=${to} subject=${subject}\n${text}`)
    return
  }
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM || user || 'no-reply@hannahrooms.example'

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  })

  await transport.sendMail({ from, to, subject, text, html })
}

export function roomConfirmationEmail(roomTitle: string, hostName: string): MailInput {
  return {
    to: process.env.ADMIN_EMAIL || process.env.SMTP_FROM || 'admin@hannahrooms.example',
    subject: 'Hannah Rooms: new listing received',
    text: `Hello ${hostName},\n\nYour listing "${roomTitle}" was received on Hannah Rooms. Our team reviews new listings before they appear in search. If anything is unclear we will call or write to you.\n\nKeep every payment documented. Do not release a room without a written agreement.\n\nHannah Rooms`,
  }
}

export function enquiryNotifyEmail(roomTitle: string, name: string, phone: string, message: string): MailInput {
  return {
    to: process.env.ADMIN_EMAIL || process.env.SMTP_FROM || 'admin@hannahrooms.example',
    subject: `Hannah Rooms: new enquiry for ${roomTitle}`,
    text: `New enquiry from ${name} (${phone}) for "${roomTitle}":\n\n${message}\n\nReply from your dashboard so the seeker hears from you on the platform.`,
  }
}

export function enquiryReplyEmail(roomTitle: string, name: string, reply: string): MailInput {
  return {
    to: process.env.ADMIN_EMAIL || process.env.SMTP_FROM || 'admin@hannahrooms.example',
    subject: `Hannah Rooms: reply on ${roomTitle}`,
    text: `Hello ${name},\n\nThe host replied about "${roomTitle}":\n\n${reply}\n\nStay safe: view the room before any large payment and get a written receipt.\n\nHannah Rooms`,
  }
}
