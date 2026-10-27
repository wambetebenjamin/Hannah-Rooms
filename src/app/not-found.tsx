import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-light px-4">
      <div className="w-full max-w-xl rounded-card bg-white p-8 text-center shadow-card sm:p-12">
        <p className="subheading">404</p>
        <h1 className="mt-2 text-3xl text-black/80 sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-sm text-gray-600 sm:text-base">
          The page does not exist, or the listing was taken down.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="btn btn-primary w-full sm:w-auto">
            Back to home
          </Link>
          <Link href="/rooms" className="btn btn-outline-primary w-full sm:w-auto">
            Browse rooms
          </Link>
        </div>
      </div>
    </main>
  )
}
