import Image from 'next/image'
import Link from 'next/link'
import AreaChips from '@/components/home/AreaChips'
import Hero from '@/components/home/Hero'
import Testimonials from '@/components/home/Testimonials'
import TrustBar from '@/components/home/TrustBar'
import Reveal from '@/components/Reveal'
import RoomCard from '@/components/RoomCard'
import SafetyTips from '@/components/SafetyTips'
import SectionHeading from '@/components/SectionHeading'
import { getRooms } from '@/lib/db'

const STEPS = [
  {
    step: 'Step 1',
    title: 'Search by area and budget',
    text: 'Filter by estate or town, weekly price, room type, and amenities. Every price is in KES.',
  },
  {
    step: 'Step 2',
    title: 'Read rules and safety tips',
    text: 'House rules, deposit terms, and safety guidance sit on the listing itself, before you contact anyone.',
  },
  {
    step: 'Step 3',
    title: 'Contact host or send enquiry',
    text: 'Call or message the host directly, or send an enquiry and track the reply from your dashboard.',
  },
]

export default function HomePage() {
  const featured = getRooms()
    .filter((room) => room.status === 'active')
    .slice(0, 8)

  return (
    <>
      <Hero />
      <TrustBar />

      <section className="w-full max-w-7xl mx-auto px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <SectionHeading
          subheading="Popular areas"
          title="Start with a neighbourhood you know"
          intro="Estates and towns with rooms listed right now."
        />
        <AreaChips />
      </section>

      <section className="w-full max-w-7xl mx-auto px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <SectionHeading
          subheading="Featured rooms"
          title="Rooms with photos, prices, and rules"
          intro="Eight rooms from across Kenya. All prices are in Kenyan shillings."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {featured.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/rooms" className="btn btn-primary">
            Browse all rooms
          </Link>
        </div>
      </section>

      <section className="mt-20 w-full bg-light py-16 lg:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subheading="How it works"
            title="Three careful steps, no surprises"
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {STEPS.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.1}>
                <div className="h-full rounded-card bg-white p-6 shadow-card">
                  <span className="subheading">{item.step}</span>
                  <h3 className="mt-3 text-xl text-black/80">{item.title}</h3>
                  <p className="mt-3 text-sm text-gray-600 sm:text-base">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <SectionHeading
          subheading="Safety"
          title="Move with more confidence"
          intro="Short rules we repeat on every listing, because they work."
        />
        <div className="mt-8">
          <SafetyTips />
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <SectionHeading
          subheading="Testimonials"
          title="People who found their room"
        />
        <div className="mt-10">
          <Testimonials />
        </div>
      </section>

      <section className="relative isolate mt-20 overflow-hidden">
        <Image
          src="/images/about-student.jpg"
          alt="A student working in a simple room"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary opacity-60" aria-hidden="true" />
        <div className="relative w-full max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Have a spare room? List it in minutes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Your first listing is free. You choose who moves in.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/list-room" className="btn btn-white w-full sm:w-auto">
              List a room
            </Link>
            <Link href="/pricing" className="btn btn-outline-white w-full sm:w-auto">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
