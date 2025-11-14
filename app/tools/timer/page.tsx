'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TimerPage() {
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          setIsRunning(false)
        }
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, minutes, seconds])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setMinutes(5)
    setSeconds(0)
  }

  return (
    <>
      <section className="hero">
        <h1 className="title">Classroom Timer</h1>
        <p className="subtitle">A simple timer for classroom activities and transitions.</p>
      </section>

      <section style={{ padding: '24px 0' }}>
        <div className="card" style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', fontWeight: 600, margin: '24px 0', fontFamily: 'monospace', color: 'var(--primary-mid)' }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {!isRunning ? (
              <button onClick={handleStart} className="btn-primary">
                Start
              </button>
            ) : (
              <button onClick={handlePause} className="btn-secondary">
                Pause
              </button>
            )}
            <button onClick={handleReset} className="btn-secondary">
              Reset
            </button>
          </div>

          <div style={{ marginTop: 24, display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={() => setMinutes(Math.max(0, minutes - 1))} className="btn-secondary" disabled={isRunning}>
              -
            </button>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Minutes</span>
            <button onClick={() => setMinutes(minutes + 1)} className="btn-secondary" disabled={isRunning}>
              +
            </button>
          </div>
        </div>
      </section>

      {/* Callout banner for premium app */}
      <section style={{ padding: '24px 0' }}>
        <div className="premium-callout">
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.125rem', fontWeight: 600 }}>
              Need more classroom management tools?
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
