import Link from 'next/link';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon?: string;
  badge?: string;
}

export default function ToolCard({ title, description, href, icon, badge }: ToolCardProps) {
  return (
    <Link href={href} className="tool-card">
      {icon && <div className="tool-card-icon">{icon}</div>}
      {badge && (
        <div style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: 'linear-gradient(120deg, #33D0F5, #6D3CFF)',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '999px',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.3px',
          textTransform: 'uppercase',
        }}>
          {badge}
        </div>
      )}
      <h3 className="tool-card-title">{title}</h3>
      <p className="tool-card-description">{description}</p>
      <div className="tool-card-arrow">→</div>
    </Link>
  );
}
