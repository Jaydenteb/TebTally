import AppCard from "../components/AppCard"
import ToolCard from "../components/tools/ToolCard"
import Link from "next/link"

export default function Page() {
  const links = {
    spelltally: process.env.NEXT_PUBLIC_SPELLTALLY_URL || 'http://localhost:3001',
    writetally: process.env.NEXT_PUBLIC_WRITETALLY_URL || 'http://localhost:3002',
    tracktally: process.env.NEXT_PUBLIC_TRACKTALLY_URL || 'http://localhost:3003',
  }

  const featuredTools = [
    {
      id: 'timer',
      title: 'Simple Timer',
      description: 'Countdown timer with customizable duration and alarm sounds.',
      icon: '⏱️',
    },
    {
      id: 'name-picker',
      title: 'Name Picker',
      description: 'Random student selector with tracking of who has been called.',
      icon: '🎯',
    },
    {
      id: 'wheel-spinner',
      title: 'Wheel Spinner',
      description: 'Customizable spinning wheel for random selection.',
      icon: '🎡',
    },
  ]

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

      <section id="apps" style={{ paddingTop: 16 }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 600, margin: '0 0 16px', letterSpacing: '-0.01em' }}>
          Apps
        </h2>
        <div className="grid">
          <AppCard
            title="SpellTally"
            href={links.spelltally}
            description="Weekly spelling practice and tests with teacher dashboards."/>
          <AppCard
            title="WritingTally"
            href={links.writetally}
            description="End-to-end writing assessments with rubrics and AI feedback."/>
          <AppCard
            title="TrackTally"
            href={links.tracktally}
            description="Fast, offline-friendly behaviour incident logging for classrooms."/>
        </div>
      </section>

      <section id="tools" style={{ paddingTop: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 600, margin: 0, letterSpacing: '-0.01em' }}>
            Free Teacher Tools
          </h2>
          <Link
            href="/tools"
            style={{
              color: 'var(--primary-mid)',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.9375rem',
            }}
          >
            View All →
          </Link>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: 16, fontSize: '1rem' }}>
          No sign-up required. Works offline. Free forever.
        </p>
        <div className="grid">
          {featuredTools.map(tool => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              href={`/tools/${tool.id}`}
              icon={tool.icon}
            />
          ))}
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
