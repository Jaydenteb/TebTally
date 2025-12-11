import { Metadata } from 'next'
import { LandingHero, FeatureGrid, HowItWorks, PricingCard, FAQ, FinalCTA } from '@/components/landing'

export const metadata: Metadata = {
  title: 'CheckTally - Formative Assessment for Primary Classrooms',
  description: 'Quick formative assessment tool for Australian primary teachers. Record observations during lessons with a single tap. Track skills and identify gaps. Free 30-day trial.',
  keywords: ['formative assessment tool', 'classroom assessment app', 'check for understanding', 'exit tickets', 'primary school assessment', 'Australian curriculum'],
  openGraph: {
    title: 'CheckTally - Formative Assessment Made Simple',
    description: 'Check student understanding instantly with visual feedback.',
    images: ['/images/checktally-og.png'],
  },
}

const features = [
  {
    iconName: 'ClipboardCheck' as const,
    title: 'Quick Observations',
    description: 'Tap to mark students as Yes, No, or Flag during lessons. Record skills in real-time without interrupting your teaching flow.',
  },
  {
    iconName: 'Users' as const,
    title: 'Class Management',
    description: 'Organise students into classes. Import from Google Classroom or add manually. Archive old classes at year end.',
  },
  {
    iconName: 'FolderOpen' as const,
    title: 'Lesson Planning',
    description: 'Create lessons with curriculum skills attached. Organise into folders and day plans for structured term planning.',
  },
  {
    iconName: 'BarChart3' as const,
    title: 'Progress Analytics',
    description: 'See student progress at a glance. Identify skill gaps, track growth over time, and generate reports for parents.',
  },
  {
    iconName: 'Tablet' as const,
    title: 'Works Everywhere',
    description: 'Use on your tablet while walking the room, at your desk, or on your phone. Syncs across all your devices.',
  },
  {
    iconName: 'FileDown' as const,
    title: 'Export Anytime',
    description: 'Download your data whenever you need it. Great for report writing, parent meetings, or transitioning students.',
  },
]

const steps = [
  {
    number: 1,
    title: 'Set up your lesson',
    description: 'Create a lesson with the skills you want to assess. Use curriculum-aligned skills or write your own.',
  },
  {
    number: 2,
    title: 'Observe and tap',
    description: 'As students work, tap to record observations. Yes, No, or Flag - one tap per student per skill.',
  },
  {
    number: 3,
    title: 'See the big picture',
    description: 'View heat maps of class progress. Identify who needs support and which skills need reteaching.',
  },
]

const pricingFeatures = [
  'Unlimited classes & students',
  'Unlimited lessons & skills',
  'Full analytics & heat maps',
  'Google Classroom import',
  'Data export anytime',
  '30-day free trial included',
]

const faqItems = [
  {
    question: 'How do students respond?',
    answer: 'Students don\'t need devices! CheckTally is for teacher observations. You tap to record what you see during lessons - no student login required.',
  },
  {
    question: 'What\'s the difference between Yes, No, and Flag?',
    answer: 'Yes means the student demonstrated the skill. No means they didn\'t. Flag is for anything in between - partial understanding, absent, or needs follow-up.',
  },
  {
    question: 'Can I track skills from the Australian Curriculum?',
    answer: 'Yes! Create skills aligned to any curriculum. Many teachers copy learning intentions directly from their planning documents.',
  },
  {
    question: 'Where is my data stored?',
    answer: 'All data is stored securely in Australia. No student emails or contact information is collected. Export or delete your data anytime.',
  },
  {
    question: 'Does it work offline?',
    answer: 'CheckTally requires an internet connection to sync observations. However, it works great on mobile data if your school WiFi is unreliable.',
  },
]

const benefits = [
  'Australian Curriculum aligned skills',
  'Works on tablet, phone, or desktop',
  'Quick notes and presets',
  'Heat map view of class progress',
  'Export data anytime',
  'No student devices needed',
  'Google Classroom sync',
  'Archive classes at year end',
]

export default function CheckTallyPage() {
  return (
    <div className="landing-page">
      <LandingHero
        headline="Track student skills"
        highlightedText="as you teach"
        description="CheckTally helps Australian teachers record formative observations during lessons. Mark students against curriculum skills with a single tap."
        primaryCta={{
          text: 'Start 30-Day Free Trial',
          href: 'https://id.tebtally.com/register?app=checktally',
        }}
        secondaryCta={{
          text: 'See Features',
          href: '#features',
        }}
        trialText="30-day free trial · No credit card required"
      />

      <section className="problem-section">
        <h2>Assessment shouldn&apos;t slow you down</h2>
        <div className="problem-grid">
          <div className="problem-card">
            <span className="problem-emoji">📋</span>
            <p>Sticky notes and mental notes get lost</p>
          </div>
          <div className="problem-card">
            <span className="problem-emoji">⏱️</span>
            <p>Report time scramble for evidence</p>
          </div>
          <div className="problem-card">
            <span className="problem-emoji">🎯</span>
            <p>Hard to spot who&apos;s falling behind</p>
          </div>
        </div>
      </section>

      <FeatureGrid
        heading="Formative assessment that fits your flow"
        subheading="Record observations without interrupting your teaching"
        features={features}
      />

      <HowItWorks steps={steps} />

      <section className="benefits-section">
        <h2>Why teachers love CheckTally</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <span className="benefit-check">✓</span>
              {benefit}
            </div>
          ))}
        </div>
      </section>

      <PricingCard
        name="Teacher Subscription"
        price="$7"
        features={pricingFeatures}
        cta={{
          text: 'Start Free Trial',
          href: 'https://id.tebtally.com/register?app=checktally',
        }}
        trialText="Start with a 30-day free trial. No credit card required."
      />

      <FAQ items={faqItems} />

      <FinalCTA
        heading="Ready to streamline your observations?"
        description="Join teachers across Australia using CheckTally to track student progress during lessons."
        cta={{
          text: 'Get Started Free',
          href: 'https://id.tebtally.com/register?app=checktally',
        }}
      />
    </div>
  )
}
