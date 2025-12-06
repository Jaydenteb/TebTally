import Link from "next/link";
import {
  Sparkles,
  Check,
  LayoutDashboard,
  Zap,
  Shield,
  Smartphone,
  Users,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";

import proPreview from "../Images/Hero image.png";
import spellPreview from "../Images/Spellt.png";
import checkPreview from "../Images/Check.png";
import trackPreview from "../Images/logger.png";
import housePreview from "../Images/House.png";
import classPreview from "../Images/Class.png";

export default function HomePage() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Unified Dashboard",
      description:
        "Access all your TebTally apps from one central hub. Manage subscriptions, classes, and settings in one place.",
    },
    {
      icon: Zap,
      title: "Purpose-Built Tools",
      description:
        "Each app solves a specific classroom challenge. No bloat, just focused solutions that work.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Australian-hosted data, minimal collection, and school-safe security. Your students' privacy is protected.",
    },
    {
      icon: Smartphone,
      title: "Works Everywhere",
      description:
        "Desktop, tablet, or phone. Online or offline. Your classroom tools go wherever you do.",
    },
    {
      icon: Users,
      title: "Built by Teachers",
      description:
        "Designed by an Australian primary teacher who understands the daily realities of classroom management.",
    },
    {
      icon: TrendingUp,
      title: "Growing Suite",
      description:
        "New apps launching regularly. Your subscription grows more valuable as we add more tools.",
    },
  ];

  const apps = [
    {
      name: "TebTally Pro",
      description: "All classroom tools in one workspace",
      badge: "Live",
      price: "$5/mo",
      image: proPreview,
    },
    {
      name: "SpellTally",
      description: "Weekly spelling tests made simple",
      badge: "Live",
      price: "$7/mo",
      image: spellPreview,
    },
    {
      name: "CheckTally",
      description: "Track student skills as you teach",
      badge: "Live",
      price: "$7/mo",
      image: checkPreview,
    },
    {
      name: "TrackTally",
      description: "Offline behaviour incident logging",
      badge: "Pending",
      price: "Soon",
      image: trackPreview,
    },
    {
      name: "HouseTally",
      description: "House points and live leaderboards",
      badge: "In Dev",
      price: "TBA",
      image: housePreview,
    },
    {
      name: "ClassTally",
      description: "Smart class placement for next year",
      badge: "In Dev",
      price: "TBA",
      image: classPreview,
    },
  ];

  const benefits = [
    "Australian Curriculum aligned",
    "Works offline when you need it",
    "Google Classroom integration",
    "No student contact info required",
    "Export your data anytime",
    "Free classroom tools included",
    "14-30 day free trials",
    "Cancel subscriptions anytime",
  ];

  return (
    <div className="min-h-screen bg-[var(--surface-subtle)]">
      {/* Hero Section */}
      <section className="px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--surface-base)] px-4 py-2 text-sm font-medium text-[var(--text-muted)] shadow-sm">
            <Sparkles className="h-4 w-4 text-[var(--primary-mid)]" />
            Suite of Teacher Apps
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-main)] sm:text-5xl md:text-6xl">
            Classroom apps that cut{" "}
            <span className="bg-gradient-to-r from-[#33D0F5] to-[#6D3CFF] bg-clip-text text-transparent">
              admin, not corners
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-muted)] sm:text-xl">
            TebTally is a growing suite of focused classroom apps for Australian teachers. Spelling
            tests, behaviour logging, formative assessment, and free daily tools.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#apps"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#33D0F5] to-[#6D3CFF] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Explore Apps
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-muted)] bg-[var(--surface-base)] px-8 py-4 text-lg font-semibold text-[var(--text-main)] transition hover:bg-[var(--surface-muted)]"
            >
              Try Free Tools
            </Link>
          </div>
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            Free trials available - No credit card required
          </p>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-[var(--border-muted)] bg-[var(--surface-base)] shadow-lg">
            <div className="border-b border-[var(--border-muted)] bg-[var(--surface-muted)] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400 opacity-60" />
                <div className="h-3 w-3 rounded-full bg-yellow-400 opacity-60" />
                <div className="h-3 w-3 rounded-full bg-green-400 opacity-60" />
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-muted)]">Welcome to</p>
                    <h3 className="text-xl font-semibold text-[var(--text-main)]">TebTally Suite</h3>
                  </div>
                  <div className="rounded-full bg-gradient-to-r from-[#33D0F5] to-[#6D3CFF] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    In Development
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {apps.slice(0, 6).map((app) => (
                    <div
                      key={app.name}
                      className="relative overflow-hidden rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-subtle)]"
                    >
                      <div className="aspect-video w-full">
                        <Image
                          src={app.image}
                          alt={app.name}
                          className="h-full w-full object-cover opacity-50"
                        />
                      </div>
                      <div className="p-3">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-xs font-semibold text-[var(--text-main)]">
                            {app.name}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                              app.badge === "Live"
                                ? "bg-emerald-500/10 text-emerald-600"
                                : "bg-slate-500/10 text-slate-600"
                            }`}
                          >
                            {app.badge}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">{app.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-center text-sm text-[var(--text-muted)]">
                One hub. Multiple focused apps. All your classroom tools connected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[var(--surface-base)] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[var(--text-main)] sm:text-4xl">
              Built for Australian teachers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-muted)]">
              Every app in the TebTally suite is designed to solve real classroom problems
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-[var(--border-muted)] bg-[var(--surface-subtle)] p-6 sm:p-8"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#33D0F5] to-[#6D3CFF]">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[var(--text-main)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-muted)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Section */}
      <section id="apps" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[var(--text-main)] sm:text-4xl">
              The TebTally Suite
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-muted)]">
              Each app tackles a specific classroom challenge. Use one or use them all.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <div
                key={app.name}
                className="overflow-hidden rounded-3xl border border-[var(--border-muted)] bg-[var(--surface-base)] transition hover:shadow-lg"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface-muted)]">
                  <Image
                    src={app.image}
                    alt={app.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute right-3 top-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                        app.badge === "Live"
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-500 text-white"
                      }`}
                    >
                      {app.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[var(--text-main)]">{app.name}</h3>
                    <span className="text-sm font-semibold text-[var(--primary-mid)]">
                      {app.price}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">{app.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-[var(--primary-mid)] hover:underline"
            >
              View detailed pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[var(--surface-base)] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-r from-[#33D0F5] to-[#6D3CFF] p-8 sm:p-12">
            <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
              Why teachers love TebTally
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-white">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section id="tools" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[var(--text-main)] sm:text-4xl">
              Free Classroom Tools
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-muted)]">
              No sign-up required. Works offline. Free forever.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-[var(--border-muted)] bg-[var(--surface-subtle)] p-8">
              <div className="mb-4 text-4xl">⏱️</div>
              <h3 className="mb-2 text-xl font-semibold text-[var(--text-main)]">Timers</h3>
              <p className="mb-4 text-[var(--text-muted)]">
                4 specialized timers for managing classroom activities and transitions.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary-mid)] hover:underline"
              >
                Explore timers →
              </Link>
            </div>
            <div className="rounded-3xl border border-[var(--border-muted)] bg-[var(--surface-subtle)] p-8">
              <div className="mb-4 text-4xl">🧰</div>
              <h3 className="mb-2 text-xl font-semibold text-[var(--text-main)]">
                Classroom Tools
              </h3>
              <p className="mb-4 text-[var(--text-muted)]">
                Random selectors, seating charts, noise meter, and more.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary-mid)] hover:underline"
              >
                View all tools →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-[var(--text-main)] sm:text-4xl">
            Ready to simplify your classroom admin?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-muted)]">
            Join teachers across Australia using TebTally apps for spelling, assessment, and daily
            classroom management.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#apps"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#33D0F5] to-[#6D3CFF] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Explore Apps
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-muted)] bg-[var(--surface-base)] px-8 py-4 text-lg font-semibold text-[var(--text-main)] transition hover:bg-[var(--surface-muted)]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-muted)] bg-[var(--surface-base)] px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{
                  background: "linear-gradient(120deg, #33D0F5, #6D3CFF)",
                }}
              >
                TT
              </div>
              <span className="font-semibold text-[var(--text-main)]">TebTally</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-muted)]">
              <Link href="/pricing" className="transition hover:text-[var(--text-main)]">
                Pricing
              </Link>
              <Link href="/privacy" className="transition hover:text-[var(--text-main)]">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition hover:text-[var(--text-main)]">
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 transition hover:text-[var(--text-main)]"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} TebTally. Made with love in Australia.
          </div>
        </div>
      </footer>
    </div>
  );
}
