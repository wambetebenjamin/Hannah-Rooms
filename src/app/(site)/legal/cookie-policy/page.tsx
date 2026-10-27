import PageHero from '@/components/PageHero'

export const metadata = {
  title: 'Cookie policy',
}

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero title="Cookie policy" breadcrumb="Legal / Cookie policy" image="/images/room-14.jpg" />
      <section className="w-full max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="space-y-6 text-sm text-gray-600 sm:text-base">
          <p className="text-black/80">Last updated: 27 October 2026.</p>

          <p>
            This cookie policy explains how Hannah Rooms uses cookies and similar storage, in line
            with the Kenya Data Protection Act, 2019. A cookie is a small text file stored on your
            device by your browser.
          </p>

          <h2 className="text-2xl text-black/80">1. Necessary cookies</h2>
          <p>
            These keep the site working: keeping you signed in, protecting forms with reCAPTCHA,
            and remembering your cookie choice. They cannot be switched off because the platform
            cannot function safely without them.
          </p>

          <h2 className="text-2xl text-black/80">2. Functional cookies</h2>
          <p>
            With your consent, functional storage remembers settings such as filters and rooms you
            saved on this device. Your cookie preference itself is stored in your browser under the
            key hannah-rooms-cookie-consent.
          </p>

          <h2 className="text-2xl text-black/80">3. Analytics cookies</h2>
          <p>
            With your consent, analytics cookies help us understand which listings people view so
            we can improve search. They do not give us your phone number or your messages.
          </p>

          <h2 className="text-2xl text-black/80">4. Marketing cookies</h2>
          <p>
            With your consent, marketing measurement helps us understand whether our own outreach
            works. We do not run invasive advertising trackers and we do not sell data.
          </p>

          <h2 className="text-2xl text-black/80">5. Managing your choices</h2>
          <p>
            Use the Manage Preferences button in the cookie banner to change your choices at any
            time. You can also clear cookies in your browser settings, which resets the banner. If
            you block necessary cookies, sign-in and forms may stop working.
          </p>

          <h2 className="text-2xl text-black/80">6. Contact</h2>
          <p>
            Questions about cookies or data: hello@hannahrooms.example or WhatsApp +254112272061.
          </p>
        </div>
      </section>
    </>
  )
}
