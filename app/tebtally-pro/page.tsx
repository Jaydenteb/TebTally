import { Metadata } from 'next'
import { LandingHero, FeatureGrid, HowItWorks, PricingCard, FAQ, FinalCTA } from '@/components/landing'

export const metadata: Metadata = {
  title: 'TebTally Pro - All Classroom Tools in One Workspace',
  description: 'The complete classroom toolkit for Australian primary teachers. Timers, name pickers, group makers and more in one unified workspace. Cloud-synced across devices. Free 14-day trial.',
  keywords: ['classroom tools', 'teacher toolkit', 'classroom timer', 'name picker', 'group generator', 'primary school tools', 'Australian teachers'],
  openGraph: {
    title: 'TebTally Pro - Your Complete Classroom Toolkit',
    description: 'All the classroom tools you need in one place.',
    images: ['/images/tebtallypro-og.png'],
  },
}

const features = [
  {
    iconName: 'LayoutDashboard' as const,
    title: 'Unified Dashboard',
    description: 'Access all your classroom tools from one place. See your schedule, energy logs, and class info at a glance.',
  },
  {
    iconName: 'Users' as const,
    title: 'Class Management',
    description: 'Import from Google Classroom or add students manually. Your roster syncs across all tools automatically.',
  },
  {
    iconName: 'Calendar' as const,
    title: 'Dayboard Pro',
    description: 'Plan your daily schedule block by block. Display mode shows current activity on your classroom screen.',
  },
  {
    iconName: 'Activity' as const,
    title: 'Energy Dial',
    description: 'Track classroom energy throughout the day. Quick notes and insights feed into analytics for reflection.',
  },
  {
    iconName: 'Shuffle' as const,
    title: 'Name Picker & Groups',
    description: 'Fair random selection with memory - no repeats until everyone has been picked. Generate balanced groups instantly.',
  },
  {
    iconName: 'Grid3X3' as const,
    title: 'Seating & Jobs',
    description: 'Drag-and-drop seating charts. Automated job rotation ensures every student gets a turn.',
  },
]

const tools = [
  'Dayboard & Display Mode',
  'Energy Dial with notes',
  'Name Picker with memory',
  'Group Generator',
  'Seating Charts',
  'Class Jobs rotation',
  'Timers & Stopwatch',
  'Dice, Coins & Wheel',
  'Noise Meter',
  'Analytics & Trends',
]

const steps = [
  {
    number: 1,
    title: 'Set up your class',
    description: 'Import from Google Classroom or add students manually. Takes less than a minute.',
  },
  {
    number: 2,
    title: 'Choose your tools',
    description: 'Access any tool from your dashboard. Your roster powers them all automatically.',
  },
  {
    number: 3,
    title: 'Teach with ease',
    description: 'Everything syncs across devices. Start on your laptop, continue on your tablet.',
  },
]

const pricingFeatures = [
  'Unlimited classes & students',
  'All classroom tools included',
  'Google Classroom sync',
  'Cloud sync across devices',
  'Analytics & insights',
  '14-day free trial included',
]

const faqItems = [
  {
    question: 'What tools are included?',
    answer: 'TebTally Pro includes: Dayboard with display mode, Energy Dial, Name Picker, Group Generator, Seating Charts, Class Jobs, multiple Timer types, Dice & Coins, Wheel Spinner, Noise Meter, and Analytics. New tools are added regularly at no extra cost.',
  },
  {
    question: 'Does it work offline?',
    answer: 'Most tools work offline once loaded. Changes sync automatically when you reconnect. Perfect for schools with unreliable WiFi.',
  },
  {
    question: 'Can I use it on my interactive whiteboard?',
    answer: 'Yes! TebTally Pro is designed for projection. Display mode shows clean, large visuals perfect for classroom screens and interactive whiteboards.',
  },
  {
    question: 'How is this different from free tools online?',
    answer: 'Free tools are scattered across different sites, often with ads, and don\'t remember your class. TebTally Pro gives you everything in one ad-free workspace with your roster powering every tool.',
  },
  {
    question: 'Are school licenses available?',
    answer: 'Yes! Contact us for school pricing. All teachers at your school get access with a single annual subscription.',
  },
]

export default function TebTallyProPage() {
  return (
    <div className="landing-page">
      <LandingHero
        headline="Every classroom tool,"
        highlightedText="one workspace"
        description="TebTally Pro brings together Dayboard, Energy Dial, Name Picker, Seating Charts, and more. Cloud-synced rosters power every tool automatically."
        primaryCta={{
          text: 'Start 14-Day Free Trial',
          href: 'https://id.tebtally.com/register?app=pro',
        }}
        secondaryCta={{
          text: 'See Features',
          href: '#features',
        }}
        trialText="14-day free trial · No credit card required"
      />

      <section className="problem-section">
        <h2>Stop juggling browser tabs</h2>
        <div className="problem-grid">
          <div className="problem-card">
            <span className="problem-emoji">🗂️</span>
            <p>Free tools scattered across different websites</p>
          </div>
          <div className="problem-card">
            <span className="problem-emoji">🚫</span>
            <p>Ads and distractions in free classroom tools</p>
          </div>
          <div className="problem-card">
            <span className="problem-emoji">🔄</span>
            <p>Re-entering class lists for every new tool</p>
          </div>
        </div>
      </section>

      <FeatureGrid
        heading="All your tools, one dashboard"
        subheading="Your class roster powers everything automatically"
        features={features}
      />

      <section className="tools-section-landing">
        <h2>10+ tools included</h2>
        <div className="tools-grid-landing">
          {tools.map((tool, index) => (
            <div key={index} className="tool-item-landing">
              <span className="tool-check">✓</span>
              {tool}
            </div>
          ))}
        </div>
      </section>

      <HowItWorks steps={steps} />

      <PricingCard
        name="TebTally Pro"
        price="$5"
        features={pricingFeatures}
        cta={{
          text: 'Start Free Trial',
          href: 'https://id.tebtally.com/register?app=pro',
        }}
        trialText="Start with a 14-day free trial. No credit card required."
      />

      <FAQ items={faqItems} />

      <FinalCTA
        heading="Ready to simplify your classroom?"
        description="Join teachers using TebTally Pro to manage their classroom tools in one place."
        cta={{
          text: 'Get Started Free',
          href: 'https://id.tebtally.com/register?app=pro',
        }}
      />
    </div>
  )
}
