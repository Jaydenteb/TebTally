'use client';

import AppCard from "../components/AppCard"
import ToolCard from "../components/tools/ToolCard"
import Link from "next/link"

export default function Page() {
  const links = {
    spelltally: process.env.NEXT_PUBLIC_SPELLTALLY_URL || 'http://localhost:3001',
    writetally: process.env.NEXT_PUBLIC_WRITETALLY_URL || 'http://localhost:3002',
    tracktally: process.env.NEXT_PUBLIC_TRACKTALLY_URL || 'http://localhost:3003',
  }

  const toolCategories = [
    {
      id: 'timers',
      title: 'Timers',
      description: '4 specialized timers for managing classroom activities and transitions.',
      icon: '⏱️',
      count: 4,
    },
    {
      id: 'class-tools',
      title: 'Classroom Tools',
      description: 'Random selectors, seating charts, noise meter, and more.',
      icon: '🎯',
      count: 7,
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
      </section>

      <section id="apps" style={{ paddingTop: 32, paddingBottom: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 700,
            margin: '0 0 12px',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(120deg, #33D0F5, #6D3CFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Premium Apps
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto' }}>
            Comprehensive classroom management solutions designed for modern teachers
          </p>
        </div>
        <div className="grid" style={{ gap: 24 }}>
          <AppCard
            title="SpellTally"
            href={links.spelltally}
            description="Weekly spelling practice and tests with teacher dashboards."
            premium={true}
            badge="Popular"
          />
          <AppCard
            title="WritingTally"
            href={links.writetally}
            description="End-to-end writing assessments with rubrics and AI feedback."
            premium={true}
            badge="AI-Powered"
          />
          <AppCard
            title="TrackTally"
            href={links.tracktally}
            description="Fast, offline-friendly behaviour incident logging for classrooms."
            premium={true}
            badge="Offline First"
          />
        </div>
      </section>

      <section id="tools" style={{ paddingTop: 48 }}>
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
        <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: '1rem' }}>
          No sign-up required. Works offline. Free forever.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
          maxWidth: 800,
          margin: '0 auto'
        }}>
          {toolCategories.map(category => (
            <Link
              key={category.id}
              href="/tools"
              style={{
                textDecoration: 'none',
                display: 'block',
              }}
            >
              <div
                style={{
                  padding: '28px 24px',
                  background: 'var(--surface-base)',
                  border: '1px solid var(--border-muted)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-normal)',
                  cursor: 'pointer',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'var(--primary-mid)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-muted)';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{category.icon}</div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  margin: '0 0 8px',
                  color: 'var(--text-base)',
                }}>
                  {category.title}
                </h3>
                <p style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-muted)',
                  margin: '0 0 12px',
                  lineHeight: 1.5,
                }}>
                  {category.description}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.875rem',
                  color: 'var(--primary-mid)',
                  fontWeight: 500,
                }}>
                  {category.count} tools
                  <span style={{ fontSize: '1rem' }}>→</span>
                </div>
              </div>
            </Link>
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
