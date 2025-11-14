type Props = {
  title: string
  description: string
  href: string
  isPremium?: boolean
  pricing?: string
}

export default function AppCard({ title, description, href, isPremium, pricing }: Props) {
  return (
    <a
      className={isPremium ? "card card-premium" : "card"}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        {isPremium && (
          <span className="premium-badge">Premium</span>
        )}
      </div>
      <p>{description}</p>
      {isPremium && pricing && (
        <p className="pricing-text">{pricing}</p>
      )}
    </a>
  )
}
