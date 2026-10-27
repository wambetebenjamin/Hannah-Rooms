import Image from 'next/image'
import Link from 'next/link'

/** Interior page hero band (zip hero-wrap-2 pattern). */
export default function PageHero({
  title,
  breadcrumb,
  image = '/images/room-02.jpg',
}: {
  title: string
  breadcrumb: string
  image?: string
}) {
  return (
    <section className="relative isolate flex min-h-[280px] items-end overflow-hidden sm:min-h-[320px]">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black opacity-40" aria-hidden="true" />
      <div className="relative w-full max-w-7xl mx-auto px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <p className="text-sm text-white/70">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2 text-white/40">/</span>
          <span className="text-white/80">{breadcrumb}</span>
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">{title}</h1>
      </div>
    </section>
  )
}
