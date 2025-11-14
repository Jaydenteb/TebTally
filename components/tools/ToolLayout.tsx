'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function ToolLayout({ children, title, description }: ToolLayoutProps) {
  return (
    <div className="tool-page">
      <header className="tool-header-simple">
        <div className="container">
          <Link href="/tools" className="back-link">
            ← Back to Tools
          </Link>
          <div className="tool-header-content">
            <h1 className="tool-title">{title}</h1>
            {description && <p className="tool-description">{description}</p>}
          </div>
        </div>
      </header>

      <main className="tool-main">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
}
