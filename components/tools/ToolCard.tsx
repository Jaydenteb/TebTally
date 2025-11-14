import Link from 'next/link';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

export default function ToolCard({ title, description, href, icon }: ToolCardProps) {
  return (
    <Link href={href} className="tool-card">
      {icon && <div className="tool-card-icon">{icon}</div>}
      <h3 className="tool-card-title">{title}</h3>
      <p className="tool-card-description">{description}</p>
      <div className="tool-card-arrow">→</div>
    </Link>
  );
}
