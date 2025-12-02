import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'TebTally™',
  description: 'The TebTally™ education apps hub',
  icons: {
    icon: '/brand/tt.svg',
    shortcut: ['/brand/tt.svg'],
    apple: ['/brand/tt.svg'],
  },
}

import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/Header'

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
        <Header />
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="container">
            <span>© {year} TebTally™</span>
            <div style={{ marginTop: 6, fontSize: 12, color: '#42557a' }}>
              ABN 96 110 054 130 - TebTally™
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
