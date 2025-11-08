export const metadata = {
  title: 'TebTally',
  description: 'The TebTally education apps hub',
}

import './globals.css'

import BrandLogo from "../components/BrandLogo"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container">
            <BrandLogo />
            <nav className="nav">
              <a href="#apps">Apps</a>
              <a href="#about">About</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="container">
            <span>© {new Date().getFullYear()} TebTally</span>
            <div style={{ marginTop: 6, fontSize: 12, color: '#42557a' }}>
              ABN 96 110 054 130 • Jayden Tebble trading as TebTally
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
