import { redirect } from 'next/navigation'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { auth } from '@/lib/auth'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard')
  }

  return (
    <DashboardShell
      user={{
        id: session.user.id,
        name: session.user.name || 'Account',
        role: session.user.role,
      }}
    >
      {children}
    </DashboardShell>
  )
}
