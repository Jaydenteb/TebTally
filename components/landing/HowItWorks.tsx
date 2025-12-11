interface Step {
  number: number
  title: string
  description: string
}

interface HowItWorksProps {
  heading?: string
  steps: Step[]
}

export function HowItWorks({ heading = 'How it works', steps }: HowItWorksProps) {
  return (
    <section className="how-it-works">
      <h2>{heading}</h2>

      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
