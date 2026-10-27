import Link from 'next/link'
import PageHero from '@/components/PageHero'

export const metadata = {
  title: 'Terms of use',
}

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of use" breadcrumb="Legal / Terms" image="/images/room-13.jpg" />
      <section className="w-full max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="space-y-6 text-sm text-gray-600 sm:text-base">
          <p className="text-black/80">Last updated: 27 October 2026.</p>

          <h2 className="text-2xl text-black/80">1. What Hannah Rooms is</h2>
          <p>
            Hannah Rooms is a discovery platform for rooms and boarding in Kenya. We help seekers
            find listings and hosts publish them.
          </p>
          <p className="rounded-card border-2 border-primary/40 bg-light p-4 text-black/80">
            Hannah Rooms is not a landlord. We are not a broker and we give no broker guarantee. We
            are not a party to any lease or house agreement between a seeker and a host. Users must
            verify every listing in person before paying any money.
          </p>

          <h2 className="text-2xl text-black/80">2. Scam warning, in plain language</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Never pay a deposit before you have viewed the room.</li>
            <li>Never send money to a person who refuses to meet or to show the room on video.</li>
            <li>Never share your OTP, PIN, or account passwords with a host, an agent, or anyone claiming to be from Hannah Rooms.</li>
            <li>Be careful with prices that are far below the area average. That is a common trick.</li>
            <li>Get a written receipt for every payment, including mobile money.</li>
          </ul>
          <p>
            If something feels wrong, stop the process and message us on WhatsApp at +254112272061.
            We would rather you lose a viewing than lose your deposit.
          </p>

          <h2 className="text-2xl text-black/80">3. Accounts</h2>
          <p>
            You must give accurate information and keep your password private. Hosts must be legally
            able to offer the room they list. Seekers must be 18 or older.
          </p>

          <h2 className="text-2xl text-black/80">4. Listings</h2>
          <p>
            Hosts are responsible for the accuracy of their listings, including photos, prices,
            deposits, house rules, and availability. Listings that mislead seekers may be removed.
            Prices are shown in Kenyan shillings.
          </p>

          <h2 className="text-2xl text-black/80">5. Payments and plans</h2>
          <p>
            Listing plans such as Highlight are optional payments for visibility only. Hannah Rooms
            never collects rent or deposits on behalf of hosts. Plan fees are stated on the pricing
            page and are not commission on rent.
          </p>

          <h2 className="text-2xl text-black/80">6. Enquiries and messages</h2>
          <p>
            Enquiries sent through the platform may be delivered to hosts by email. Do not include
            sensitive information such as ID numbers or bank details in messages.
          </p>

          <h2 className="text-2xl text-black/80">7. Liability</h2>
          <p>
            To the extent allowed by law, Hannah Rooms is not liable for agreements, payments,
            injuries, losses, or disputes between seekers and hosts. We provide the platform, you
            provide the judgement.
          </p>

          <h2 className="text-2xl text-black/80">8. Changes and contact</h2>
          <p>
            We may update these terms and will post the new date above. Questions? Email
            hello@hannahrooms.example or WhatsApp +254112272061. See our{' '}
            <Link href="/legal/privacy-policy" className="hover:text-primary">
              privacy policy
            </Link>{' '}
            for how we handle data.
          </p>
        </div>
      </section>
    </>
  )
}
