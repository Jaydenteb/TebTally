export const metadata = {
  title: 'Terms of Service · TebTally™',
  description: 'Terms governing use of TebTally™ products.',
}

import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-16">
      <header>
        <h1 className="text-3xl font-semibold" style={{ color: '#0b1220' }}>Terms of Service</h1>
        <p className="mt-2 text-sm" style={{ color: '#42557a' }}>Last updated: November 7, 2025</p>
      </header>

      <section className="space-y-3 text-sm leading-6" style={{ color: '#334155' }}>
        <p>
          TebTally™ (ABN 96 110 054 130) provides educational software including SpellTally™, TrackTally™,
          and WritingTally™ (WriteTally). By using any TebTally™ product you agree to comply with these terms and
          applicable school policies.
        </p>
        <p>
          Teachers and administrators are responsible for ensuring that student data is accurate and that
          accounts are used only for authorised educational activities. Students should access the services
          under teacher or guardian supervision.
        </p>
        <p>
          We may update features and these terms from time to time. Continued use after changes take effect
          constitutes acceptance of the updated terms. If you do not agree, discontinue use of the service.
        </p>
        <p>
          For support or questions regarding these terms, contact{' '}
          <a className="underline" href="mailto:support@tebtally.com" style={{ color: '#0ea5e9' }}>support@tebtally.com</a>.
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
