import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { auth } from '@/lib/auth'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const user = session?.user
    ? { name: session.user.name || 'Account', role: session.user.role }
    : null

  return (
    <>
      <Header user={user} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
