export const metadata = {
  title: 'Pricing · TebTally™',
  description: 'TebTally™ pricing for teachers and schools - SpellTally, TebTally Pro, CheckTally and more.',
}

import Link from 'next/link'

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 px-6 py-16">
      <header>
        <h1 className="text-3xl font-semibold" style={{ color: '#0b1220' }}>Pricing</h1>
        <p className="mt-2 text-sm" style={{ color: '#42557a' }}>TebTally™ Pricing (2026)</p>
      </header>

      {/* Teacher Subscriptions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: '#0b1220' }}>
          Teacher Subscriptions
        </h2>
        <p className="text-sm" style={{ color: '#42557a' }}>Per month, billed monthly</p>

        <div style={{
          background: '#fff',
          border: '1px solid rgba(58, 76, 130, 0.22)',
          borderRadius: '14px',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f6f8fc' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#0b1220', borderBottom: '1px solid rgba(58, 76, 130, 0.22)' }}>App</th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: '#0b1220', borderBottom: '1px solid rgba(58, 76, 130, 0.22)' }}>Price</th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: '#0b1220', borderBottom: '1px solid rgba(58, 76, 130, 0.22)' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '14px 20px', fontSize: '0.9375rem', color: '#334155', borderBottom: '1px solid rgba(58, 76, 130, 0.12)' }}>SpellTally™</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', fontSize: '0.9375rem', fontWeight: 600, color: '#0b1220', borderBottom: '1px solid rgba(58, 76, 130, 0.12)' }}>$7</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', borderBottom: '1px solid rgba(58, 76, 130, 0.12)' }}>
                  <a href="https://spelltally.com/register" target="_blank" rel="noopener noreferrer" style={{ color: '#5a62ff', fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none' }}>Start Trial →</a>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '14px 20px', fontSize: '0.9375rem', color: '#334155', borderBottom: '1px solid rgba(58, 76, 130, 0.12)' }}>TebTally™ Pro</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', fontSize: '0.9375rem', fontWeight: 600, color: '#0b1220', borderBottom: '1px solid rgba(58, 76, 130, 0.12)' }}>$5</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', borderBottom: '1px solid rgba(58, 76, 130, 0.12)' }}>
                  <a href="https://pro.tebtally.com/login" target="_blank" rel="noopener noreferrer" style={{ color: '#5a62ff', fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none' }}>Start Trial →</a>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '14px 20px', fontSize: '0.9375rem', color: '#334155', borderBottom: '1px solid rgba(58, 76, 130, 0.12)' }}>CheckTally™</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', fontSize: '0.9375rem', fontWeight: 600, color: '#0b1220', borderBottom: '1px solid rgba(58, 76, 130, 0.12)' }}>$7</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', borderBottom: '1px solid rgba(58, 76, 130, 0.12)' }}>
                  <a href="https://check.tebtally.com/login" target="_blank" rel="noopener noreferrer" style={{ color: '#5a62ff', fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none' }}>Start Trial →</a>
                </td>
              </tr>
              <tr style={{ background: 'linear-gradient(135deg, rgba(51, 208, 245, 0.05) 0%, rgba(109, 60, 255, 0.05) 100%)' }}>
                <td style={{ padding: '14px 20px', fontSize: '0.9375rem', fontWeight: 600, color: '#0b1220' }}>
                  Teacher Bundle
                  <span style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 400, color: '#42557a', marginTop: 2 }}>All three apps</span>
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right', fontSize: '1.125rem', fontWeight: 700, background: 'linear-gradient(120deg, #33D0F5, #6D3CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>$15</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', fontSize: '0.75rem', color: '#42557a' }}>Coming soon</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* School Subscriptions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: '#0b1220' }}>
          School Subscriptions
        </h2>
        <p className="text-sm" style={{ color: '#42557a' }}>Per year, unlimited teachers</p>

        <div style={{
          background: '#fff',
          border: '1px solid rgba(58, 76, 130, 0.22)',
          borderRadius: '14px',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f6f8fc' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: '#0b1220', borderBottom: '1px solid rgba(58, 76, 130, 0.22)' }}>App</th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: '#0b1220', borderBottom: '1px solid rgba(58, 76, 130, 0.22)' }}>Standard</th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: '#0b1220', borderBottom: '1px solid rgba(58, 76, 130, 0.22)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                    Founding School
                    <span style={{
                      background: 'linear-gradient(120deg, #33D0F5, #6D3CFF)',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: '0.6875rem',
                      fontWeight: 600
                    }}>2026</span>
                  </span>
                </th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600, color: '#0b1220', borderBottom: '1px solid rgba(58, 76, 130, 0.22)' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '14px 20px', fontSize: '0.9375rem', color: '#334155', borderBottom: '1px solid rgba(58, 76, 130, 0.12)' }}>SpellTally™</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', fontSize: '0.9375rem', color: '#42557a', borderBottom: '1px solid rgba(58, 76, 130, 0.12)' }}>$349</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', borderBottom: '1px solid rgba(58, 76, 130, 0.12)' }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0b1220' }}>$175</span>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#42557a', marginTop: 2 }}>
                    Use code: <code style={{ background: '#f6f8fc', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 600, color: '#6D3CFF' }}>FOUNDERST</code>
                  </span>
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right', borderBottom: '1px solid rgba(58, 76, 130, 0.12)' }}>
                  <Link href="/contact" style={{ color: '#5a62ff', fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none' }}>Contact Us →</Link>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '14px 20px', fontSize: '0.9375rem', color: '#334155' }}>CheckTally™</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', fontSize: '0.9375rem', color: '#42557a' }}>$349</td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0b1220' }}>$175</span>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#42557a', marginTop: 2 }}>
                    Use code: <code style={{ background: '#f6f8fc', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 600, color: '#6D3CFF' }}>FOUNDERCT</code>
                  </span>
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <Link href="/contact" style={{ color: '#5a62ff', fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none' }}>Contact Us →</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm" style={{ color: '#42557a', fontStyle: 'italic' }}>
          * Flexible pricing available for schools — <a href="mailto:hello@tebtally.com" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>get in touch</a>
        </p>
      </section>

      {/* Coming Soon */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" style={{ color: '#0b1220' }}>
          Coming Soon
        </h2>
        <p className="text-sm" style={{ color: '#42557a' }}>School-facing apps in development — pricing to be announced</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '12px'
        }}>
          {['TrackTally™', 'ClassTally™', 'TeamTally™', 'HouseTally™'].map((app) => (
            <div
              key={app}
              style={{
                padding: '16px 20px',
                background: '#f6f8fc',
                borderRadius: '10px',
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: '#42557a'
              }}
            >
              {app}
            </div>
          ))}
        </div>
      </section>

      <div className="pt-4 text-sm">
        <Link className="font-medium" href="/" style={{ color: '#0ea5e9' }}>
          ← Back to TebTally™
        </Link>
      </div>
    </main>
  )
}
