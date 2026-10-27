import PageHero from '@/components/PageHero'

export const metadata = {
  title: 'Privacy policy',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy policy" breadcrumb="Legal / Privacy policy" image="/images/room-10.jpg" />
      <section className="w-full max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="prose-rooms space-y-6 text-sm text-gray-600 sm:text-base">
          <p className="text-black/80">Last updated: 27 October 2026.</p>

          <p>
            Hannah Rooms operates in Kenya and processes personal data under the Kenya Data
            Protection Act, 2019 (KDPA) and any regulations issued by the Office of the Data
            Protection Commissioner.
          </p>

          <h2 className="text-2xl text-black/80">1. What we collect</h2>
          <p>
            When you register we collect your name, email, phone number, county, and account type.
            When you list a room we collect the listing details and photos you upload. When you send
            an enquiry we collect your name, phone, email, preferred move-in date, and message.
          </p>

          <h2 className="text-2xl text-black/80">2. Why we process it</h2>
          <p>
            We process your data to operate the platform: to show listings, to connect seekers and
            hosts, to send service messages such as enquiry notifications and listing confirmations,
            to prevent fraud, and to comply with the law. Our lawful basis is the performance of our
            contract with you, our legitimate interest in running a safe platform, and your consent
            for optional cookies.
          </p>

          <h2 className="text-2xl text-black/80">3. Who receives it</h2>
          <p>
            Enquiry details are shared with the host of the room you enquire about, because they
            need them to respond. We use service providers for hosting, email delivery, spam
            protection (reCAPTCHA), and storage. We do not sell personal data.
          </p>

          <h2 className="text-2xl text-black/80">4. Retention</h2>
          <p>
            We keep account data while your account is open. Enquiries and listings are kept for up
            to 24 months after the last activity, then deleted or anonymised, unless the law requires
            us to keep them longer.
          </p>

          <h2 className="text-2xl text-black/80">5. Your rights under the KDPA</h2>
          <p>
            You have the right to be informed, to access your data, to correct it, to delete it, to
            object to processing, and to data portability where applicable. To use any of these
            rights, write to hello@hannahrooms.example or message us on WhatsApp at +254112272061.
            You may also complain to the Office of the Data Protection Commissioner.
          </p>

          <h2 className="text-2xl text-black/80">6. Security and transfers</h2>
          <p>
            We use encryption in transit, access controls, and least-privilege practices. Where data
            is processed outside Kenya by our infrastructure providers, we use providers with
            appropriate safeguards as required by the KDPA.
          </p>

          <h2 className="text-2xl text-black/80">7. Children</h2>
          <p>
            Hannah Rooms is for people aged 18 and above. We do not knowingly collect data from
            children.
          </p>

          <h2 className="text-2xl text-black/80">8. Contact</h2>
          <p>
            Data controller: Hannah Rooms, Nairobi, Kenya. Email: hello@hannahrooms.example.
            WhatsApp: +254112272061.
          </p>
        </div>
      </section>
    </>
  )
}
