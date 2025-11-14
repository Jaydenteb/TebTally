import { Metadata } from 'next';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import ToolCard from '@/components/tools/ToolCard';

export const metadata: Metadata = {
  title: 'Free Teacher Tools | TebTally',
  description: 'Free classroom tools for teachers including timers, random selectors, seating organisers, and more.',
};

const tools = [
  // Timer Tools
  {
    id: 'timer',
    title: 'Simple Timer',
    description: 'Countdown timer with customizable duration, pause, and alarm sounds.',
    category: 'Time Management',
    icon: '⏱️',
  },
  {
    id: 'multi-timer',
    title: 'Multi-Timer',
    description: 'Run multiple timers simultaneously for stations or group activities.',
    category: 'Time Management',
    icon: '⏲️',
  },
  {
    id: 'transition-timer',
    title: 'Transition Timer',
    description: 'Quick countdown with preset times: 30s, 1min, 2min, 5min.',
    category: 'Time Management',
    icon: '⚡',
  },
  {
    id: 'think-pair-share-timer',
    title: 'Think-Pair-Share Timer',
    description: 'Multi-stage timer for collaborative learning activities.',
    category: 'Time Management',
    icon: '🤝',
  },
  // Random Selection Tools
  {
    id: 'name-picker',
    title: 'Name Picker',
    description: 'Random student selector with tracking of who has been called.',
    category: 'Random Selection',
    icon: '🎯',
  },
  {
    id: 'group-picker',
    title: 'Group Picker',
    description: 'Create random groups with balanced distribution.',
    category: 'Random Selection',
    icon: '👥',
  },
  {
    id: 'wheel-spinner',
    title: 'Wheel Spinner',
    description: 'Customizable spinning wheel for random selection.',
    category: 'Random Selection',
    icon: '🎡',
  },
  {
    id: 'dice-roller',
    title: 'Dice Roller',
    description: 'Roll multiple dice types (d6, d20, custom).',
    category: 'Random Selection',
    icon: '🎲',
  },
  {
    id: 'coin-flipper',
    title: 'Coin Flipper',
    description: 'Simple heads or tails coin flip.',
    category: 'Random Selection',
    icon: '🪙',
  },
  // Classroom Management
  {
    id: 'seating-organiser',
    title: 'Seating Organiser',
    description: 'Create and manage seating charts with drag-and-drop and rules.',
    category: 'Classroom Management',
    icon: '🪑',
  },
  {
    id: 'noise-meter',
    title: 'Noise Meter',
    description: 'Monitor classroom noise levels with visual feedback.',
    category: 'Classroom Management',
    icon: '📊',
  },
  {
    id: 'queue-manager',
    title: 'Queue Manager',
    description: 'Digital hand-raising and call queue system.',
    category: 'Classroom Management',
    icon: '✋',
  },
];

const categories = Array.from(new Set(tools.map(tool => tool.category)));

export default function ToolsPage() {
  return (
    <div className="page-wrapper">
      <header className="header">
        <div className="container">
          <BrandLogo />
          <nav className="nav">
            <Link href="/#apps">Apps</Link>
            <Link href="/tools" className="active">Tools</Link>
            <Link href="/#about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </header>

      <main className="main">
        <section className="hero-section">
          <div className="container">
            <h1 className="hero-title">Free Teacher Tools</h1>
            <p className="hero-subtitle">
              A collection of free, easy-to-use classroom tools to help manage
              your teaching day. No sign-up required, works offline.
            </p>
          </div>
        </section>

        {categories.map(category => (
          <section key={category} className="tools-section">
            <div className="container">
              <h2 className="section-heading">{category}</h2>
              <div className="tools-grid">
                {tools
                  .filter(tool => tool.category === category)
                  .map(tool => (
                    <ToolCard
                      key={tool.id}
                      title={tool.title}
                      description={tool.description}
                      href={`/tools/${tool.id}`}
                      icon={tool.icon}
                    />
                  ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} Jayden Tebble trading as TebTally
            · ABN 96 110 054 130
          </p>
        </div>
      </footer>
    </div>
  );
}
