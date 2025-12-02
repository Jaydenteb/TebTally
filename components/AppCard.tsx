import { ReactNode } from 'react'

type Props = {
  title: ReactNode
  description: string
  href: string
  premium?: boolean
  badge?: string
  disabled?: boolean
}

export default function AppCard({ title, description, href, premium = false, badge, disabled = false }: Props) {
  if (premium) {
    const cardContent = (
      <div
        style={{
          padding: '24px 24px',
          background: 'linear-gradient(135deg, rgba(51, 208, 245, 0.03) 0%, rgba(109, 60, 255, 0.03) 100%)',
          border: '2px solid transparent',
          borderRadius: 'var(--radius-md)',
          transition: 'all var(--transition-normal)',
          cursor: disabled ? 'default' : 'pointer',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'linear-gradient(white, white), linear-gradient(120deg, #33D0F5, #6D3CFF)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          height: '100%',
          minHeight: 180,
          opacity: disabled ? 0.7 : 1,
          display: 'flex',
          flexDirection: 'column' as const,
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(109, 60, 255, 0.15)';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
      >
        {badge && (
          <div style={{
            position: 'absolute',
            top: 14,
            right: 14,
            background: 'linear-gradient(120deg, #33D0F5, #6D3CFF)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>
            {badge}
          </div>
        )}
        <h3 style={{
          fontSize: '1.35rem',
          fontWeight: 700,
          marginBottom: 10,
          color: 'var(--text-base)',
          paddingRight: badge ? 90 : 0,
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-muted)',
          lineHeight: 1.55,
          margin: 0,
          flex: 1,
        }}>
          {description}
        </p>
        {!disabled && (
          <div style={{
            marginTop: 16,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--primary-mid)',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}>
            Learn More
            <span style={{ fontSize: '1.125rem' }}>→</span>
          </div>
        )}
      </div>
    );

    if (disabled) {
      return (
        <div style={{
          textDecoration: 'none',
          display: 'block',
          position: 'relative',
        }}>
          {cardContent}
        </div>
      );
    }

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
        {cardContent}
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
