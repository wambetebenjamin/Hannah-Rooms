'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { signIn } from 'next-auth/react'
import PageHero from '@/components/PageHero'
import { DEMO_HOST_EMAIL, DEMO_HOST_PASSWORD, DEMO_SEEKER_EMAIL, DEMO_SEEKER_PASSWORD } from '@/lib/seed'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    setBusy(false)
    if (result?.error) {
      setError('Those details did not work. Check your email and password and try again.')
      return
    }
    router.push(callbackUrl)
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-md rounded-card border border-black/10 bg-white p-6 shadow-card sm:p-8">
      <h2 className="text-2xl text-black/80">Welcome back</h2>
      <p className="mt-2 text-sm text-gray-600">
        Sign in to reply to enquiries, save rooms, and manage listings.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-black/80">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mt-2"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-black/80">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mt-2"
          />
        </div>

        {error ? (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:opacity-60">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <div className="mt-5">
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl })}
          className="btn btn-outline-primary w-full"
        >
          Continue with Google
        </button>
        <p className="mt-2 text-xs text-gray-600">
          Google sign-in appears when GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are configured.
        </p>
      </div>

      <p className="mt-6 text-sm text-gray-600">
        New here?{' '}
        <Link href="/register" className="hover:text-primary">
          Create an account
        </Link>
      </p>

      <div className="mt-6 rounded-card border border-black/10 bg-light p-4 text-sm text-gray-600">
        <p className="font-medium text-black/80">Demo accounts</p>
        <p className="mt-2">Seeker: {DEMO_SEEKER_EMAIL} / {DEMO_SEEKER_PASSWORD}</p>
        <p>Host: {DEMO_HOST_EMAIL} / {DEMO_HOST_PASSWORD}</p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <>
      <PageHero title="Login" breadcrumb="Login" image="/images/room-09.jpg" />
      <section className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Suspense fallback={<p className="text-gray-600">Loading…</p>}>
          <LoginForm />
        </Suspense>
      </section>
    </>
  )
}
