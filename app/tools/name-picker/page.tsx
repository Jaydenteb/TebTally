'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function NamePickerPage() {
  const [names, setNames] = useState('')
  const [selectedName, setSelectedName] = useState<string | null>(null)

  const handlePick = () => {
    const nameList = names.split('\n').filter(name => name.trim() !== '')
    if (nameList.length > 0) {
      const randomIndex = Math.floor(Math.random() * nameList.length)
      setSelectedName(nameList[randomIndex].trim())
    }
  }

  return (
    <>
      <section className="hero">
        <h1 className="title">Random Name Picker</h1>
        <p className="subtitle">Randomly select a student name for classroom activities.</p>
      </section>

      <section style={{ padding: '24px 0' }}>
        <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: 'var(--text-main)' }}>
            Enter student names (one per line):
          </label>
          <textarea
            value={names}
            onChange={(e) => setNames(e.target.value)}
            placeholder="Emma&#10;Liam&#10;Olivia&#10;Noah&#10;Ava"
            style={{
              width: '100%',
              minHeight: 150,
              padding: 12,
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-muted)',
              fontFamily: 'inherit',
              fontSize: '0.9375rem',
              resize: 'vertical'
            }}
          />

          <button onClick={handlePick} className="btn-primary" style={{ marginTop: 16, width: '100%' }}>
            Pick Random Name
          </button>

          {selectedName && (
            <div style={{
              marginTop: 24,
              padding: 24,
              background: 'linear-gradient(135deg, rgba(51, 208, 245, 0.08) 0%, rgba(109, 60, 255, 0.08) 100%)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                Selected:
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                {selectedName}
              </div>
            </div>
          )}
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
