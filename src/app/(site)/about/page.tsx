import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import SectionHeading from '@/components/SectionHeading'

export const metadata = {
  title: 'About us',
}

const TEAM = [
  {
    name: 'Daniel Mwangi',
    role: 'Co-founder, host relations',
    image: '/images/team-1.jpg',
    text: 'Daniel talks to hosts every week, checks listings, and keeps prices honest.',
  },
  {
    name: 'Hannah Achieng',
    role: 'Co-founder, seeker care',
    image: '/images/team-2.jpg',
    text: 'Hannah answers seeker questions and writes the safety guidance on every listing.',
  },
  {
    name: 'Samuel Kiptoo',
    role: 'Operations, Rift Valley and Western',
    image: '/images/team-3.jpg',
    text: 'Samuel verifies new areas and helps hosts photograph their rooms properly.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Hannah Rooms" breadcrumb="About" image="/images/nairobi-skyline.jpg" />
      <section className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              subheading="Our mission"
              title="Safer discovery of rooms across Kenya"
              align="left"
              intro="Hannah Rooms exists for the student moving to Nairobi for the first time, the intern on a three month placement, and the worker on a short contract who needs a clean room at a clear weekly price."
            />
            <div className="mt-6 space-y-4 text-sm text-gray-600 sm:text-base">
              <p>
                We believe honest rooms beat staged luxury. Every listing shows real photos, KES
                weekly and monthly prices, the deposit, what the deposit covers, and the house rules
                before you contact anyone.
              </p>
              <p>
                We add safety tips to every listing because the moment money moves is the moment
                people are most at risk. View before you pay, keep a written agreement, and never
                share your OTP.
              </p>
            </div>
            <div className="mt-8 rounded-card border-2 border-primary/40 bg-light p-5">
              <p className="text-sm text-gray-600 sm:text-base">
                <span className="font-medium text-black/80">Please note:</span> Hannah Rooms is not
                a party to any lease. We are not a landlord and we do not guarantee any listing.
                Users must verify every room in person before paying.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card shadow-card">
            <Image
              src="/images/about-student.jpg"
              alt="A student working at a desk in a simple room"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-light py-16 lg:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subheading="Our team"
            title="Three people, one careful mission"
            intro="A small East African team that still reads every report we receive."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="rounded-card bg-white p-6 shadow-card">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl text-black/80">{member.name}</h3>
                <p className="mt-1 text-sm text-primary">{member.role}</p>
                <p className="mt-3 text-sm text-gray-600">{member.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/rooms" className="btn btn-primary">
              Browse rooms
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
