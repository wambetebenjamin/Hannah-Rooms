/**
 * reCAPTCHA v3 verification (server only). The secret never leaves the server.
 * When RECAPTCHA_SECRET_KEY is not configured (local preview), verification is
 * skipped so the site remains usable without Google credentials.
 *
 * If the v3 score is below 0.5 the client is told to fall back to the visible
 * v2 challenge and resubmit with a v2 token.
 */

const SCORE_THRESHOLD = 0.5

export interface CaptchaOutcome {
  ok: boolean
  score: number
  requiresV2: boolean
  reason?: string
}

export async function verifyRecaptcha(
  token: string | undefined | null,
  action?: string,
  v2Token?: string | undefined | null,
): Promise<CaptchaOutcome> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    return { ok: true, score: 1, requiresV2: false, reason: 'captcha-not-configured' }
  }

  if (v2Token) {
    const ok = await siteVerify(secret, v2Token)
    return ok
      ? { ok: true, score: 1, requiresV2: false }
      : { ok: false, score: 0, requiresV2: true, reason: 'v2-failed' }
  }

  if (!token) {
    return { ok: false, score: 0, requiresV2: true, reason: 'missing-token' }
  }

  const body = new URLSearchParams({ secret, response: token })
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
      cache: 'no-store',
    })
    const data = (await res.json()) as {
      success: boolean
      score?: number
      action?: string
      'error-codes'?: string[]
    }
    const score = typeof data.score === 'number' ? data.score : 0
    if (!data.success) {
      return { ok: false, score, requiresV2: true, reason: 'verify-failed' }
    }
    if (action && data.action && data.action !== action) {
      return { ok: false, score, requiresV2: true, reason: 'action-mismatch' }
    }
    if (score < SCORE_THRESHOLD) {
      return { ok: false, score, requiresV2: true, reason: 'low-score' }
    }
    return { ok: true, score, requiresV2: false }
  } catch {
    // Network failures should not lock seekers out of sending enquiries.
    return { ok: true, score: 0, requiresV2: false, reason: 'verify-unreachable' }
  }
}

async function siteVerify(secret: string, token: string): Promise<boolean> {
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
      cache: 'no-store',
    })
    const data = (await res.json()) as { success?: boolean }
    return Boolean(data.success)
  } catch {
    return true
  }
}
