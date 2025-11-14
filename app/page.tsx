import AppCard from "../components/AppCard"

export default function Page() {
  const links = {
    spelltally: process.env.NEXT_PUBLIC_SPELLTALLY_URL || 'http://localhost:3001',
    writetally: process.env.NEXT_PUBLIC_WRITETALLY_URL || 'http://localhost:3002',
    tracktally: process.env.NEXT_PUBLIC_TRACKTALLY_URL || 'http://localhost:3003',
  }

  return (
    <>
      <section className="hero">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <h1 className="title" style={{ margin: 0 }}>TebTally</h1>
          <span style={{ fontSize: 12, background: '#EEF3FB', color: '#42557a', padding: '4px 8px', borderRadius: 999 }}>
            In development
          </span>
        </div>
        <p className="subtitle">A suite of classroom tools for spelling, writing, and behaviour tracking.</p>
        <p className="subtitle" style={{ marginTop: 4 }}>Jayden Tebble trading as TebTally. ASIC registration pending.</p>
      </section>

      <section id="free-tools">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '24px 0 12px', color: 'var(--text-main)' }}>
          Free Tools
        </h2>
        <div className="grid">
          <AppCard
            title="Classroom Timer"
            href="/tools/timer"
            description="A simple countdown timer for classroom activities and transitions."/>
          <AppCard
            title="Random Name Picker"
            href="/tools/name-picker"
            description="Randomly select student names for participation and activities."/>
        </div>
      </section>

      <section id="apps">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '24px 0 12px', color: 'var(--text-main)' }}>
          Premium Apps
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', margin: '0 0 16px' }}>
          Professional tools for comprehensive classroom management
        </p>
        <div className="grid">
          <AppCard
            title="SpellTally"
            href={links.spelltally}
            description="Weekly spelling practice and tests with teacher dashboards."
            isPremium={true}
            pricing="14-day free trial • From $9.99/month"/>
          <AppCard
            title="WritingTally"
            href={links.writetally}
            description="End-to-end writing assessments with rubrics and AI feedback."
            isPremium={true}
            pricing="14-day free trial • From $9.99/month"/>
          <AppCard
            title="TrackTally"
            href={links.tracktally}
            description="Fast, offline-friendly behaviour incident logging for classrooms."
            isPremium={true}
            pricing="14-day free trial • From $9.99/month"/>
        </div>
      </section>

      <section id="about" className="about">
        <h2>About TebTally</h2>
        <p>
          TebTally brings together focused, teacher-first apps under one roof. As we grow, this hub will host
          account management, billing, and single sign-on to each product.
        </p>
        <p style={{ color: '#42557a' }}>
          Privacy & Terms live here and apply to the TebTally suite while individual product docs remain in their apps.
        </p>
      </section>
    </>
  )
}
