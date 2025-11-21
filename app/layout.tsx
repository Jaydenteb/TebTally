export const metadata = {
  title: 'TebTally',
  description: 'The TebTally education apps hub',
}

import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header className="relative border-b border-slate-200/60 bg-[radial-gradient(circle_at_top,_#f6f8fc_0%,_rgba(255,255,255,0.6)_55%,_rgba(255,255,255,0)_100%)]">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
            <a
              href="/"
              className="brand-text"
              style={{
                background: 'linear-gradient(120deg, #33D0F5, #6D3CFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              TebTally
            </a>
            <nav className="flex items-center gap-4">
              <a href="/#apps" className="nav-link">Apps</a>
              <a href="/#about" className="nav-link">About</a>
              <a href="/privacy" className="nav-link">Privacy</a>
              <a href="/terms" className="nav-link">Terms</a>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="container">
            <span>© {year} TebTally</span>
            <div style={{ marginTop: 6, fontSize: 12, color: '#42557a' }}>
              ABN 96 110 054 130 · TebTally
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
