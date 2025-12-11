import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://tebtally.com'),
  title: {
    default: 'TebTally - Simple Apps for Busy Teachers',
    template: '%s | TebTally',
  },
  description: 'Purpose-built classroom apps for Australian primary teachers. Spelling tests, formative assessment, and classroom tools that save time.',
  keywords: ['classroom apps', 'teacher tools', 'Australian education', 'primary school', 'spelling tests', 'formative assessment'],
  authors: [{ name: 'TebTally' }],
  creator: 'TebTally',
  publisher: 'TebTally',
  icons: {
    icon: '/brand/tt.svg',
    shortcut: ['/brand/tt.svg'],
    apple: ['/brand/tt.svg'],
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://tebtally.com',
    siteName: 'TebTally',
    title: 'TebTally - Simple Apps for Busy Teachers',
    description: 'Purpose-built classroom apps for Australian primary teachers.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'TebTally' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TebTally - Simple Apps for Busy Teachers',
    description: 'Purpose-built classroom apps for Australian primary teachers.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/Header'
import FeedbackWidget from '@/components/feedback/FeedbackWidget'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-links-group">
              <div className="footer-column">
                <span className="footer-heading">Apps</span>
                <a href="/spelltally">SpellTally</a>
                <a href="/checktally">CheckTally</a>
                <a href="/tebtally-pro">TebTally Pro</a>
                <a href="/tools">Free Tools</a>
              </div>
              <div className="footer-column">
                <span className="footer-heading">Resources</span>
                <a href="/blog">Blog</a>
                <a href="/pricing">Pricing</a>
                <a href="/contact">Contact</a>
              </div>
              <div className="footer-column">
                <span className="footer-heading">Legal</span>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-copyright">
                © {year} TebTally™ · Made with love in Australia
              </div>
              <div className="footer-abn">
                ABN 96 110 054 130
              </div>
            </div>
          </div>
        </footer>
        <Analytics />
        <FeedbackWidget />
      </body>
    </html>
  )
}
