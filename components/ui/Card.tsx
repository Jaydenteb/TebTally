import { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: CSSProperties;
}

export default function Card({ children, className = '', padding = 'medium', style }: CardProps) {
  const paddingClass = `card-padding-${padding}`;

  return (
    <div className={`card ${paddingClass} ${className}`} style={style}>
      {children}
    </div>
  );
}
