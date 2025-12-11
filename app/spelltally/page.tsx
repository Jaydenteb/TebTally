import { Metadata } from 'next'
import { LandingHero, FeatureGrid, HowItWorks, PricingCard, FAQ, FinalCTA } from '@/components/landing'

export const metadata: Metadata = {
  title: 'SpellTally - Weekly Spelling Tests for Primary Teachers',
  description: 'Run engaging weekly spelling tests in your Australian primary classroom. Text-to-speech practice, instant marking, and student progress tracking. Free 30-day trial.',
  keywords: ['spelling test app', 'weekly spelling tests', 'primary school spelling', 'Australian spelling curriculum', 'classroom spelling tool'],
  openGraph: {
    title: 'SpellTally - Weekly Spelling Tests Made Simple',
    description: 'The easiest way to run spelling tests in your Australian primary classroom.',
    images: ['/images/spelltally-og.png'],
  },
}

const features = [
  {
    iconName: 'BookOpen' as const,
    title: 'Weekly Spelling Lists',
    description: 'Create and publish spelling lists with text-to-speech pronunciation. Students practice at their own pace with audio support.',
  },
  {
    iconName: 'Users' as const,
    title: 'Class Management',
    description: 'Organise students into classes and ability groups. Import from Google Classroom or add manually in seconds.',
  },
  {
    iconName: 'Volume2' as const,
    title: 'Text-to-Speech Practice',
    description: 'Built-in Australian English pronunciation with slowed playback. Every word includes example sentences for context.',
  },
  {
    iconName: 'CheckCircle' as const,
    title: 'Instant Results',
    description: 'Tests auto-grade on submission. Detailed error reporting so teachers can focus on intervention, not marking.',
  },
  {
    iconName: 'RotateCcw' as const,
    title: 'Practice Banks',
    description: 'Incorrect spellings automatically enter a personalised practice bank for targeted remediation and revision.',
  },
  {
    iconName: 'Shield' as const,
    title: 'School Security',
    description: 'Only approved school domains can register. Role-based access keeps student data safe and compliant.',
  },
]

const steps = [
  {
    number: 1,
    title: 'Create your word list',
    description: 'Add words for the week with optional sentences. Text-to-speech handles pronunciation automatically.',
  },
  {
    number: 2,
    title: 'Students take the test',
    description: 'Students hear each word, type their answer, and submit. Works on any device - tablets, laptops, or phones.',
  },
  {
    number: 3,
    title: 'Review results instantly',
    description: 'See class results immediately. Identify patterns, track progress, and plan targeted intervention.',
  },
]

const pricingFeatures = [
  'Unlimited classes & students',
  'Unlimited spelling lists',
  'Text-to-speech for all words',
  'Google Classroom import',
  'Full analytics & exports',
  '30-day free trial included',
]

const faqItems = [
  {
    question: 'What devices do students need?',
    answer: 'SpellTally works on any device with a web browser - tablets, Chromebooks, laptops, or phones. No app installation required. Students just need internet access and headphones for audio.',
  },
  {
    question: 'Is it aligned with the Australian Curriculum?',
    answer: 'Yes! SpellTally is designed for Australian classrooms. The text-to-speech uses Australian English pronunciation, and you can create word lists aligned to any curriculum requirements.',
  },
  {
    question: 'How many students can I have?',
    answer: 'There are no limits on the number of students or classes. Whether you teach one class or five, the pricing stays the same.',
  },
  {
    question: 'Where is student data stored?',
    answer: 'All data is stored securely in Australia. We take privacy seriously - no student emails are required, and data can be exported or deleted at any time.',
  },
  {
    question: 'Can I import my class from Google Classroom?',
    answer: 'Yes! Connect your Google account and import class rosters with a single click. Student names sync automatically.',
  },
]

const benefits = [
  'Australian Curriculum aligned',
  'Text-to-speech for every word',
  'Instant test grading',
  'Practice bank for mistakes',
  'Google Classroom sync',
  'Progress tracking & analytics',
  'Works on tablet, phone, desktop',
  'Attention monitoring in tests',
]

export default function SpellTallyPage() {
  return (
    <div className="landing-page">
      <LandingHero
        headline="Weekly spelling tests,"
        highlightedText="made simple"
        description="SpellTally helps Australian teachers publish spelling lists, run timed tests, and track student progress. Text-to-speech practice included for every word."
        primaryCta={{
          text: 'Start 30-Day Free Trial',
          href: 'https://id.tebtally.com/register?app=spelltally',
        }}
        secondaryCta={{
          text: 'See Features',
          href: '#features',
        }}
        trialText="30-day free trial · No credit card required"
      />

      <section className="problem-section">
        <h2>The spelling test struggle is real</h2>
        <div className="problem-grid">
          <div className="problem-card">
            <span className="problem-emoji">📝</span>
            <p>Hours spent marking spelling tests by hand</p>
          </div>
          <div className="problem-card">
            <span className="problem-emoji">📊</span>
            <p>No easy way to track student progress over time</p>
          </div>
          <div className="problem-card">
            <span className="problem-emoji">🔊</span>
            <p>Students can&apos;t practice pronunciation at home</p>
          </div>
        </div>
      </section>

      <FeatureGrid
        heading="Everything you need for spelling success"
        subheading="Built by an Australian teacher for Australian classrooms"
        features={features}
      />

      <HowItWorks steps={steps} />

      <section className="benefits-section">
        <h2>Why teachers love SpellTally</h2>
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
          href: 'https://id.tebtally.com/register?app=spelltally',
        }}
        trialText="Start with a 30-day free trial. No credit card required."
      />

      <FAQ items={faqItems} />

      <FinalCTA
        heading="Ready to simplify spelling tests?"
        description="Join teachers across Australia using SpellTally for consistent spelling practice and better student outcomes."
        cta={{
          text: 'Get Started Free',
          href: 'https://id.tebtally.com/register?app=spelltally',
        }}
      />
    </div>
  )
}
