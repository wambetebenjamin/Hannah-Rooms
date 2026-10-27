'use client'

export function getCaptchaSiteKey(): string {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
}

function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.id = id
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(script)
  })
}

/**
 * Executes reCAPTCHA v3 and returns a token. Returns an empty token when no
 * site key is configured (preview/demo mode).
 */
export async function executeCaptcha(action: string): Promise<string> {
  const siteKey = getCaptchaSiteKey()
  if (!siteKey || typeof window === 'undefined') return ''
  try {
    await loadScript(
      `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`,
      'hannah-recaptcha-v3',
    )
    const grecaptcha = (window as unknown as {
      grecaptcha?: { execute: (key: string, opts: { action: string }) => Promise<string> }
    }).grecaptcha
    if (!grecaptcha?.execute) return ''
    return await grecaptcha.execute(siteKey, { action })
  } catch {
    return ''
  }
}

export function loadRecaptchaV2(): Promise<void> {
  return loadScript('https://www.google.com/recaptcha/api.js?render=explicit', 'hannah-recaptcha-v2')
}
