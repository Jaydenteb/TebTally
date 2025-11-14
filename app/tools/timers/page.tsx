import Link from 'next/link'

export default function TimersPage() {
  return (
    <>
      <section className="hero">
        <h1 className="title">Timers</h1>
        <p className="subtitle">Free countdown timers for classroom activities and time management.</p>
      </section>

      <section style={{ padding: '24px 0' }}>
        <div className="grid">
          <a href="/tools/timer" className="card">
            <h3>Classroom Timer</h3>
            <p>Simple countdown timer for activities and transitions.</p>
          </a>
        </div>
      </section>

      {/* Callout banner for premium app */}
      <section style={{ padding: '24px 0' }}>
        <div className="premium-callout">
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.125rem', fontWeight: 600 }}>
              Need comprehensive classroom management?
            </h3>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
              TrackTally offers complete behaviour tracking, incident logging, and real-time analytics for your entire classroom.
            </p>
          </div>
          <a
            href={process.env.NEXT_PUBLIC_TRACKTALLY_URL || 'http://localhost:3003'}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Try TrackTally Free
          </a>
        </div>
      </section>

      <section style={{ padding: '24px 0', textAlign: 'center' }}>
        <Link href="/" style={{ color: 'var(--primary-dark)', fontWeight: 500, textDecoration: 'none' }}>
          ← Back to TebTally Hub
        </Link>
      </section>
    </>
  )
}
