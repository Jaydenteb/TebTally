import { Metadata } from 'next';
import Link from 'next/link';
import ToolCard from '@/components/tools/ToolCard';

export const metadata: Metadata = {
  title: 'Free Teacher Tools | TebTally™',
  description: 'Free classroom tools for teachers including timers, random selectors, seating organisers, and more.',
};

const tools: Array<{
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  badge?: string;
}> = [
  // Timer Tools
  {
    id: 'timer',
    title: 'Simple Timer',
    description: 'Countdown timer with customizable duration, pause controls, and alarm sounds. Best for focused work sessions and time-boxed activities.',
    category: 'Time Management',
    icon: '⏱️',
    badge: 'Popular',
  },
  {
    id: 'multi-timer',
    title: 'Multi-Timer',
    description: 'Run multiple labeled timers simultaneously. Perfect for managing station rotations, group activities, or multi-task lessons.',
    category: 'Time Management',
    icon: '⏲️',
  },
  {
    id: 'transition-timer',
    title: 'Transition Timer',
    description: 'Quick countdown with one-tap preset times: 30s, 1min, 2min, 5min. Ideal for fast classroom transitions and cleanup.',
    category: 'Time Management',
    icon: '⚡',
    badge: 'Popular',
  },
  {
    id: 'think-pair-share-timer',
    title: 'Think-Pair-Share Timer',
    description: 'Multi-stage timer designed for collaborative learning. Separate phases for individual thinking, partner discussion, and whole-class sharing.',
    category: 'Time Management',
    icon: '🤝',
  },
  // Random Selection Tools
  {
    id: 'name-picker',
    title: 'Name Picker',
    description: 'Random student selector with visual tracking of who\'s been called. Ensures fair participation across your class.',
    category: 'Random Selection',
    icon: '🎯',
    badge: 'Popular',
  },
  {
    id: 'group-picker',
    title: 'Group Picker',
    description: 'Automatically create random groups with balanced distribution. Great for collaborative projects and mixing up student interactions.',
    category: 'Random Selection',
    icon: '👥',
  },
  {
    id: 'wheel-spinner',
    title: 'Wheel Spinner',
    description: 'Colorful spinning wheel for random selection. Customize options and colors for engaging decision-making and prize draws.',
    category: 'Random Selection',
    icon: '🎡',
  },
  {
    id: 'dice-roller',
    title: 'Dice Roller',
    description: 'Roll multiple dice types including d6, d20, and custom values. Perfect for math games, probability lessons, and RPG activities.',
    category: 'Random Selection',
    icon: '🎲',
  },
  {
    id: 'coin-flipper',
    title: 'Coin Flipper',
    description: 'Simple digital coin flip for quick binary decisions. Visual animation shows heads or tails results.',
    category: 'Random Selection',
    icon: '🪙',
  },
  // Classroom Management
  {
    id: 'seating-organiser',
    title: 'Seating Organiser',
    description: 'Design seating charts with drag-and-drop editing. Set rules for student placement (keep apart/seat together) and save multiple arrangements.',
    category: 'Classroom Management',
    icon: '🪑',
    badge: 'Advanced',
  },
  {
    id: 'noise-meter',
    title: 'Noise Meter',
    description: 'Real-time classroom volume monitor with customizable thresholds. Visual and audio feedback helps students self-regulate noise levels.',
    category: 'Classroom Management',
    icon: '📊',
  },
  {
    id: 'energy-dial',
    title: 'Energy Dial',
    description: 'Track classroom energy and engagement throughout the day. View weekly history and patterns to optimize lesson planning.',
    category: 'Classroom Management',
    icon: '⚡',
    badge: 'New',
  },
  {
    id: 'dayboard',
    title: 'Class Dayboard',
    description: 'Weekly schedule planner with live progress tracking. Display Mode shows current activity and upcoming lessons on classroom TVs.',
    category: 'Classroom Management',
    icon: '📅',
    badge: 'New',
  },
];

const categories = Array.from(new Set(tools.map(tool => tool.category)));

export default function ToolsPage() {
  return (
    <div className="tool-page">
      <header className="tool-header-simple">
        <div className="container">
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
          <div className="tool-header-content">
            <h1 className="tool-title">Free Teacher Tools</h1>
            <p className="tool-description">
              A collection of free, easy-to-use classroom tools to help manage
              your teaching day. No sign-up required, works offline.
            </p>
          </div>
        </div>
      </header>

      <main className="tool-main">

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
                      badge={tool.badge}
                    />
                  ))}
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
