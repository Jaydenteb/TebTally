export const metadata = {
  title: 'Privacy Policy · TebTally™',
  description: 'Privacy policy outlining how TebTally™ handles data across the suite.',
}

import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-16">
      <header>
        <h1 className="text-3xl font-semibold" style={{ color: '#0b1220' }}>Privacy Policy</h1>
        <p className="mt-2 text-sm" style={{ color: '#42557a' }}>Last updated: November 7, 2025</p>
      </header>

      <section className="space-y-3 text-sm leading-6" style={{ color: '#334155' }}>
        <p>
          TebTally™ (ABN 96 110 054 130) provides educational software including SpellTally™, TrackTally™,
          and WritingTally™ (WriteTally). We collect only the information necessary to deliver these services,
          such as teacher and student names, email addresses, class rosters, and activity related to
          spelling, writing, and classroom incident logging depending on the product used.
        </p>
        <p>
          Data is stored in secure, access-controlled databases. We do not sell personal information and
          only share data with third parties when required to provide the service (for example, Google
          integrations for roster imports). Access to personal data is limited to authorised school staff
          and TebTally™ personnel who require it to provide support.
        </p>
        <p>
          We retain records while an account remains active and delete or anonymise data on request or when
          no longer needed, in line with school policies and applicable law.
        </p>
        <p>
          Questions or requests about privacy can be sent to{' '}
          <a className="underline" href="mailto:privacy@tebtally.com" style={{ color: '#0ea5e9' }}>privacy@tebtally.com</a>.
        </p>
      </section>
      <div className="pt-4 text-sm">
        <Link className="font-medium" href="/" style={{ color: '#0ea5e9' }}>
          ← Back to TebTally™
        </Link>
      </div>
    </main>
  )
}
