type Props = {
  title: string
  description: string
  href: string
  premium?: boolean
  badge?: string
}

export default function AppCard({ title, description, href, premium = false, badge }: Props) {
  if (premium) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{
          textDecoration: 'none',
          display: 'block',
          position: 'relative',
        }}
      >
        <div
          style={{
            padding: '32px 28px',
            background: 'linear-gradient(135deg, rgba(51, 208, 245, 0.03) 0%, rgba(109, 60, 255, 0.03) 100%)',
            border: '2px solid transparent',
            borderRadius: 'var(--radius-md)',
            transition: 'all var(--transition-normal)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(120deg, #33D0F5, #6D3CFF)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            height: '100%',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(109, 60, 255, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {badge && (
            <div style={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: 'linear-gradient(120deg, #33D0F5, #6D3CFF)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}>
              {badge}
            </div>
          )}
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: 12,
            color: 'var(--text-base)',
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {description}
          </p>
          <div style={{
            marginTop: 20,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--primary-mid)',
            fontWeight: 600,
            fontSize: '0.9375rem',
          }}>
            Learn More
            <span style={{ fontSize: '1.25rem' }}>→</span>
          </div>
        </div>
      </a>
    )
  }

  return (
    <a className="card" href={href} target="_blank" rel="noreferrer">
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  )
}
