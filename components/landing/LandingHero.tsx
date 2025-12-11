'use client'

import { Sparkles } from 'lucide-react'

interface LandingHeroProps {
  badge?: string
  headline: string
  highlightedText: string
  description: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  trialText?: string
  image?: {
    src: string
    alt: string
  }
}

export function LandingHero({
  badge = 'Part of the TebTally Suite',
  headline,
  highlightedText,
  description,
  primaryCta,
  secondaryCta,
  trialText,
  image,
}: LandingHeroProps) {
  return (
    <section className="landing-hero">
      <div className="hero-content">
        {badge && (
          <span className="brand-pill">
            <Sparkles size={12} style={{ marginRight: '6px' }} />
            {badge}
          </span>
        )}

        <h1>
          {headline} <span className="gradient-text">{highlightedText}</span>
        </h1>

        <p className="hero-description">{description}</p>

        <div className="hero-ctas">
          <a href={primaryCta.href} className="btn-primary-landing" target="_blank" rel="noopener noreferrer">
            {primaryCta.text}
          </a>
          {secondaryCta && (
            <a href={secondaryCta.href} className="btn-secondary-landing">
              {secondaryCta.text}
            </a>
          )}
        </div>

        {trialText && <p className="trial-text">{trialText}</p>}
      </div>

      {image && (
        <div className="hero-image">
          <img src={image.src} alt={image.alt} />
        </div>
      )}
    </section>
  )
}
