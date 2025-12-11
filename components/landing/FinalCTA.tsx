interface FinalCTAProps {
  heading: string
  description: string
  cta: {
    text: string
    href: string
  }
}

export function FinalCTA({ heading, description, cta }: FinalCTAProps) {
  return (
    <section className="final-cta">
      <div className="cta-content">
        <h2>{heading}</h2>
        <p>{description}</p>
        <a href={cta.href} className="cta-button" target="_blank" rel="noopener noreferrer">
          {cta.text}
        </a>
      </div>
    </section>
  )
}
