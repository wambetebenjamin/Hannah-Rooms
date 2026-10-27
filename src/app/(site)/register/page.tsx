'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import PageHero from '@/components/PageHero'
import HumanCheck from '@/components/HumanCheck'
import { executeCaptcha } from '@/lib/captchaClient'

const COUNTIES = ['Nairobi', 'Kajiado', 'Kiambu', 'Mombasa', 'Kisumu', 'Nakuru', 'Uasin Gishu', 'Machakos', 'Meru', 'Nyeri']

export default function RegisterPage() {
  const router = useRouter()
  const [role, setRole] = useState<'seeker' | 'host'>('seeker')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [county, setCounty] = useState('Nairobi')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [needsHuman, setNeedsHuman] = useState(false)
  const [v2Token, setV2Token] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const captchaToken = needsHuman ? v2Token : await executeCaptcha('register')
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, county, role, captchaToken, v2Token: needsHuman ? v2Token : '' }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data?.requiresV2) {
          setNeedsHuman(true)
          setBusy(false)
          setError('Please confirm you are human, then register again.')
          return
        }
        throw new Error(data?.error || 'Registration failed. Please try again.')
      }
      await signIn('credentials', { email, password, redirect: false })
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setBusy(false)
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
    }
  }

  return (
    <>
      <PageHero title="Create your account" breadcrumb="Register" image="/images/room-07.jpg" />
      <section className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-xl rounded-card border border-black/10 bg-white p-6 shadow-card sm:p-8">
          <h2 className="text-2xl text-black/80">Join Hannah Rooms</h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose how you will use the platform. You can hold both roles later by talking to us on
            WhatsApp.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-5">
            <fieldset>
              <legend className="text-sm font-medium text-black/80">Account type (required)</legend>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <label
                  className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-card border p-3 ${
                    role === 'seeker' ? 'border-primary' : 'border-black/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    checked={role === 'seeker'}
                    onChange={() => setRole('seeker')}
                    className="h-4 w-4 accent-primary"
                  />
                  <span className="text-sm text-black/80">Seeker: I am looking for a room</span>
                </label>
                <label
                  className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-card border p-3 ${
                    role === 'host' ? 'border-primary' : 'border-black/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    checked={role === 'host'}
                    onChange={() => setRole('host')}
                    className="h-4 w-4 accent-primary"
                  />
                  <span className="text-sm text-black/80">Host: I have a room to list</span>
                </label>
              </div>
            </fieldset>

            <div>
              <label htmlFor="reg-name" className="block text-sm font-medium text-black/80">
                Full name (required)
              </label>
              <input id="reg-name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control mt-2" />
            </div>
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-black/80">
                Email (required)
              </label>
              <input id="reg-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mt-2" />
            </div>
            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-black/80">
                Password (required, at least 8 characters)
              </label>
              <input id="reg-password" type="password" required autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mt-2" />
            </div>
            <div>
              <label htmlFor="reg-phone" className="block text-sm font-medium text-black/80">
                Phone (required)
              </label>
              <input id="reg-phone" type="tel" required autoComplete="tel" placeholder="07xx xxx xxx" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control mt-2" />
            </div>
            <div>
              <label htmlFor="reg-county" className="block text-sm font-medium text-black/80">
                County (required)
              </label>
              <select id="reg-county" value={county} onChange={(e) => setCounty(e.target.value)} className="form-control mt-2">
                {COUNTIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {needsHuman && <HumanCheck onVerify={(token) => setV2Token(token)} />}

            {error ? (
              <p className="text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={busy || (needsHuman && !v2Token)}
              className="btn btn-primary w-full disabled:opacity-60"
            >
              {busy ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Already registered?{' '}
            <Link href="/login" className="hover:text-primary">
              Sign in
            </Link>
          </p>
          <p className="mt-4 text-xs text-gray-600">
            By registering you accept our{' '}
            <Link href="/legal/terms" className="hover:text-primary">
              terms of use
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy-policy" className="hover:text-primary">
              privacy policy
            </Link>
            . We handle your data under the Kenya Data Protection Act, 2019.
          </p>
        </div>
      </section>
    </>
  )
}
