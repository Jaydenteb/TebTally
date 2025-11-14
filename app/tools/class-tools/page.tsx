import Link from 'next/link'

export default function ClassToolsPage() {
  return (
    <>
      <section className="hero">
        <h1 className="title">Class Tools</h1>
        <p className="subtitle">Essential free utilities for classroom management and activities.</p>
      </section>

      <section style={{ padding: '24px 0' }}>
        <div className="grid">
          <a href="/tools/name-picker" className="card">
            <h3>Random Name Picker</h3>
            <p>Randomly select student names for participation and activities.</p>
          </a>
        </div>
      </section>

      {/* Callout banner for premium app */}
      <section style={{ padding: '24px 0' }}>
        <div className="premium-callout">
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.125rem', fontWeight: 600 }}>
              Want to track spelling progress for your class?
            </h3>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
              SpellTally helps you manage weekly spelling lists, track student progress, and run engaging spelling tests with built-in teacher dashboards.
            </p>
          </div>
          <a
            href={process.env.NEXT_PUBLIC_SPELLTALLY_URL || 'http://localhost:3001'}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Try SpellTally Free
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
