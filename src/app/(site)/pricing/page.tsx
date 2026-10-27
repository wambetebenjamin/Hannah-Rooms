import Link from 'next/link'
import PageHero from '@/components/PageHero'
import SectionHeading from '@/components/SectionHeading'
import { cx } from '@/lib/site'

export const metadata = {
  title: 'Pricing',
}

const PLANS = [
  {
    name: 'Free',
    price: 'KSh 0',
    cadence: 'always',
    highlight: false,
    features: ['1 active listing', 'Photos up to 8', 'Enquiry inbox', 'Safety tips on the listing'],
  },
  {
    name: 'Highlight',
    price: 'KSh 299',
    cadence: 'for 14 days',
    highlight: true,
    features: [
      'Everything in Free',
      'Top of the area results for 14 days',
      'Same listing card, primary border only',
      'Cancel any time, no renewal',
    ],
  },
  {
    name: 'Host Plus',
    price: 'KSh 999',
    cadence: 'for 30 days',
    highlight: false,
    features: ['5 active listings', 'Highlight included for one listing', 'Occupancy toggles', 'Priority support on WhatsApp'],
  },
]

const ROWS = [
  { label: 'Active listings', free: '1', highlight: '1', plus: '5' },
  { label: 'Photos per listing', free: '8', highlight: '8', plus: '8' },
  { label: 'Highlight in search', free: 'No', highlight: '14 days', plus: '30 days' },
  { label: 'Enquiry inbox', free: 'Yes', highlight: 'Yes', plus: 'Yes' },
  { label: 'Occupancy toggle', free: 'No', highlight: 'Yes', plus: 'Yes' },
  { label: 'WhatsApp support', free: 'Standard', highlight: 'Standard', plus: 'Priority' },
]

export default function PricingPage() {
  return (
    <>
      <PageHero title="Simple listing plans" breadcrumb="Pricing" image="/images/room-12.jpg" />
      <section className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <SectionHeading
          subheading="Pricing"
          title="Your first listing is free"
          intro="Pay only when you want more reach. No commission on rent, no success fees, and no surprise charges."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cx(
                'rounded-card bg-white p-6 shadow-card',
                plan.highlight ? 'border-2 border-primary' : 'border border-black/10',
              )}
            >
              <h3 className="text-xl text-black/80">{plan.name}</h3>
              <p className="mt-3">
                <span className="text-3xl font-medium text-primary">{plan.price}</span>
                <span className="ml-2 text-sm text-gray-600">{plan.cadence}</span>
              </p>
              <ul className="mt-5 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-gray-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.name === 'Free' ? '/list-room' : '/list-room'}
                className={cx('btn mt-6 w-full', plan.highlight ? 'btn-primary' : 'btn-outline-primary')}
              >
                {plan.name === 'Free' ? 'Start free' : 'Choose ' + plan.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="text-2xl text-black/80 sm:text-3xl">Compare plans</h2>
          <p className="mt-2 text-sm text-gray-600 sm:hidden">Scroll the table sideways to see every plan.</p>
          <div className="mt-5 overflow-x-auto rounded-card border border-black/10">
            <table className="w-full min-w-[640px] border-collapse bg-white text-left text-sm">
              <thead>
                <tr className="bg-light">
                  <th className="p-4 font-medium text-black/80">Feature</th>
                  <th className="p-4 font-medium text-black/80">Free</th>
                  <th className="p-4 font-medium text-black/80">Highlight</th>
                  <th className="p-4 font-medium text-black/80">Host Plus</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className="border-t border-black/10">
                    <td className="p-4 text-gray-600">{row.label}</td>
                    <td className="p-4 text-gray-600">{row.free}</td>
                    <td className="p-4 text-gray-600">{row.highlight}</td>
                    <td className="p-4 text-gray-600">{row.plus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 rounded-card border-2 border-primary/40 bg-light p-6">
          <h2 className="text-xl text-black/80">Honest pricing note</h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Hannah Rooms charges for visibility only. We never take a cut of your rent or deposit,
            and we are not a party to any lease between you and a seeker.
          </p>
        </div>
      </section>
    </>
  )
}
