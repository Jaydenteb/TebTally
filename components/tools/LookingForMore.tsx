type App = {
  name: string;
  description: string;
  url: string;
  badge?: string;
};

type LookingForMoreProps = {
  apps: App[];
};

export default function LookingForMore({ apps }: LookingForMoreProps) {
  return (
    <div style={{ marginTop: 48, paddingTop: 48, borderTop: '1px solid var(--border-muted)' }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        margin: '0 0 8px',
        textAlign: 'center',
      }}>
        Looking for More?
      </h2>
      <p style={{
        fontSize: '1rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        margin: '0 0 32px',
      }}>
        Check out our premium apps for comprehensive classroom management
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20,
        maxWidth: 900,
        margin: '0 auto',
      }}>
        {apps.map((app) => (
          <a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: 'none',
              display: 'block',
            }}
          >
            <div
              style={{
                padding: '24px',
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
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(109, 60, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {app.badge && (
                <div style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: 'linear-gradient(120deg, #33D0F5, #6D3CFF)',
                  color: 'white',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}>
                  {app.badge}
                </div>
              )}
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: 8,
                color: 'var(--text-base)',
              }}>
                {app.name}
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                margin: 0,
              }}>
                {app.description}
              </p>
              <div style={{
                marginTop: 16,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--primary-mid)',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}>
                Learn More
                <span style={{ fontSize: '1rem' }}>→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
