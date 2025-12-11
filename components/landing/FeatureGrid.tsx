'use client'

import * as Icons from 'lucide-react'

type IconName = keyof typeof Icons

interface Feature {
  iconName: IconName
  title: string
  description: string
}

interface FeatureGridProps {
  heading: string
  subheading?: string
  features: Feature[]
}

export function FeatureGrid({ heading, subheading, features }: FeatureGridProps) {
  return (
    <section className="feature-section" id="features">
      <div className="feature-header">
        <h2>{heading}</h2>
        {subheading && <p>{subheading}</p>}
      </div>

      <div className="feature-grid">
        {features.map((feature, index) => {
          const Icon = Icons[feature.iconName] as Icons.LucideIcon
          return (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {Icon && <Icon size={24} />}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
