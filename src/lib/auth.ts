import NextAuth, { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { getUserByEmail, getUserById } from './db'
import { verifyPassword } from './password'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'seeker' | 'host'
    } & DefaultSession['user']
  }
  interface User {
    role?: 'seeker' | 'host'
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id?: string
    role?: 'seeker' | 'host'
  }
}

const providers = []

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  )
}

providers.push(
  Credentials({
    name: 'Email and password',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const email = typeof credentials?.email === 'string' ? credentials.email : ''
      const password = typeof credentials?.password === 'string' ? credentials.password : ''
      if (!email || !password) return null
      const user = getUserByEmail(email)
      if (!user) return null
      if (!verifyPassword(password, user.passwordHash)) return null
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    },
  }),
)

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  // Required behind proxies and preview hosts (Vercel, sandbox previews).
  // Vercel deployments are trusted automatically as well.
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  // Vercel deployments must set NEXTAUTH_SECRET. The fallback keeps the
  // preview environment sign-in flow working.
  secret: process.env.NEXTAUTH_SECRET || 'hannah-rooms-preview-secret-change-me',
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user.role as 'seeker' | 'host') || 'seeker'
      } else if (token.id) {
        const existing = getUserById(String(token.id))
        if (existing) token.role = existing.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id || '')
        session.user.role = token.role || 'seeker'
      }
      return session
    },
  },
})
