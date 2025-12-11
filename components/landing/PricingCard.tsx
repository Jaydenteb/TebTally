'use client'

import { Check } from 'lucide-react'

interface PricingCardProps {
  name: string
  price: string
  period?: string
  description?: string
  features: string[]
  cta: {
    text: string
    href: string
  }
  badge?: string
  trialText?: string
}

export function PricingCard({
  name,
  price,
  period = '/month',
  description,
  features,
  cta,
  badge,
  trialText,
}: PricingCardProps) {
  return (
    <section className="pricing-section" id="pricing">
      <h2>Simple, transparent pricing</h2>
      {trialText && <p className="pricing-subtitle">{trialText}</p>}

      <div className="pricing-card">
        {badge && <span className="pricing-badge">{badge}</span>}

        <div className="pricing-header">
          <h3>{name}</h3>
          <div className="price">
            <span className="amount">{price}</span>
            <span className="period">{period}</span>
          </div>
          {description && <p className="pricing-description">{description}</p>}
        </div>

        <ul className="pricing-features">
          {features.map((feature, index) => (
            <li key={index}>
              <Check size={18} className="check-icon" />
              {feature}
            </li>
          ))}
        </ul>

        <a href={cta.href} className="pricing-cta" target="_blank" rel="noopener noreferrer">
          {cta.text}
        </a>
      </div>
    </section>
  )
}
