type PremiumCalloutProps = {
  title: string;
  description: string;
  appName: string;
  appUrl: string;
  badge?: string;
};

export default function PremiumCallout({ title, description, appName, appUrl, badge }: PremiumCalloutProps) {
  return (
    <div
      style={{
        marginBottom: 24,
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(51, 208, 245, 0.05) 0%, rgba(109, 60, 255, 0.05) 100%)',
        border: '2px solid',
        borderImage: 'linear-gradient(120deg, #33D0F5, #6D3CFF) 1',
        borderRadius: 'var(--radius-md)',
        position: 'relative',
      }}
    >
      {badge && (
        <div style={{
          position: 'absolute',
          top: -12,
          right: 24,
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            margin: '0 0 8px',
            background: 'linear-gradient(120deg, #33D0F5, #6D3CFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: '0.9375rem',
            color: 'var(--text-muted)',
            margin: 0,
            lineHeight: 1.5,
          }}>
            {description}
          </p>
        </div>
        <a
          href={appUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(120deg, #33D0F5, #6D3CFF)',
            color: 'white',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 600,
            fontSize: '0.9375rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all var(--transition-fast)',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(109, 60, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Try {appName}
          <span style={{ fontSize: '1.125rem' }}>→</span>
        </a>
      </div>
    </div>
  );
}
