"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Check,
  LayoutDashboard,
  Zap,
  Shield,
  Smartphone,
  Users,
  TrendingUp,
} from "lucide-react";

import proPreview from "../Images/Hero image.png";
import spellPreview from "../Images/Spellt.png";
import trackPreview from "../Images/logger.png";
import housePreview from "../Images/House.png";
import classPreview from "../Images/Class.png";
import checkPreview from "../Images/Check.png";

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
    id: "tebtallypro",
    name: "TebTally Pro",
    description: "All classroom tools in one workspace with analytics and unified dashboards.",
    badge: "Live",
    price: "$5/mo",
    trial: "14-day trial",
    image: proPreview,
    href: "https://pro.tebtally.com",
  },
  {
    id: "spelltally",
    name: "SpellTally",
    description: "Weekly spelling practice and tests with teacher dashboards.",
    badge: "Live",
    price: "$7/mo",
    trial: "30-day trial",
    image: spellPreview,
    href: "https://spell.tebtally.com",
  },
  {
    id: "checktally",
    name: "CheckTally",
    description: "Track student skills during classroom observations.",
    badge: "Live",
    price: "$7/mo",
    trial: "30-day trial",
    image: checkPreview,
    href: "https://check.tebtally.com",
  },
  {
    id: "tracktally",
    name: "TrackTally",
    description: "Fast, offline-friendly behaviour incident logging.",
    badge: "Pending",
    price: "Soon",
    image: trackPreview,
    href: "#",
    disabled: true,
  },
  {
    id: "housetally",
    name: "HouseTally",
    description: "House points tracking and live leaderboards.",
    badge: "In Dev",
    price: "TBA",
    image: housePreview,
    href: "#",
    disabled: true,
  },
  {
    id: "classtally",
    name: "ClassTally",
    description: "Smart class placement for next year based on student data.",
    badge: "In Dev",
    price: "TBA",
    image: classPreview,
    href: "#",
    disabled: true,
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

export default function HomePage() {
  const [activeApp, setActiveApp] = useState(0);

  return (
    <div className="min-h-screen" style={{ background: "var(--app-background)" }}>
      {/* Hero Section */}
      <section className="px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm"
            style={{ background: "var(--surface-base)", color: "var(--text-muted)" }}
          >
            <Sparkles className="h-4 w-4" style={{ color: "var(--primary-mid)" }} />
            Suite of Teacher Apps
          </div>
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            style={{ color: "var(--text-main)" }}
          >
            Classroom apps that cut{" "}
            <span
              style={{
                background: "linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              admin, not corners
            </span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl"
            style={{ color: "var(--text-muted)" }}
          >
            TebTally is a growing suite of focused classroom apps for Australian teachers. Spelling
            tests, behaviour logging, formative assessment, and free daily tools.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#apps"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:opacity-90"
              style={{
                background: "linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))",
              }}
            >
              Explore Apps
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold transition"
              style={{
                background: "var(--surface-base)",
                color: "var(--text-main)",
                border: "1px solid var(--border-muted)",
              }}
            >
              Try Free Tools
            </Link>
          </div>
          <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
            Free trials available · No credit card required
          </p>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-5xl">
          <div
            className="overflow-hidden rounded-3xl shadow-lg"
            style={{ background: "var(--surface-base)", border: "1px solid var(--border-muted)" }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: "var(--surface-muted)", borderBottom: "1px solid var(--border-muted)" }}
            >
              <div className="h-3 w-3 rounded-full bg-red-400 opacity-60" />
              <div className="h-3 w-3 rounded-full bg-yellow-400 opacity-60" />
              <div className="h-3 w-3 rounded-full bg-green-400 opacity-60" />
            </div>

            {/* Preview content */}
            <div className="p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                    Welcome to
                  </p>
                  <h3 className="text-xl font-semibold" style={{ color: "var(--text-main)" }}>
                    TebTally Suite
                  </h3>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white"
                  style={{
                    background: "linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))",
                  }}
                >
                  Growing
                </span>
              </div>

              {/* App grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {apps.map((app, idx) => (
                  <button
                    key={app.id}
                    onClick={() => setActiveApp(idx)}
                    className="relative overflow-hidden rounded-2xl text-left transition-all"
                    style={{
                      background: "var(--surface-subtle)",
                      border: activeApp === idx ? "2px solid var(--primary-mid)" : "1px solid var(--border-muted)",
                      transform: activeApp === idx ? "scale(1.02)" : "scale(1)",
                    }}
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={app.image}
                        alt={app.name}
                        className="h-full w-full object-cover"
                        style={{ opacity: activeApp === idx ? 1 : 0.5 }}
                      />
                    </div>
                    <div className="p-3">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-semibold" style={{ color: "var(--text-main)" }}>
                          {app.name}
                        </span>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
                          style={{
                            background: app.badge === "Live" ? "rgba(16, 185, 129, 0.1)" : "rgba(100, 116, 139, 0.1)",
                            color: app.badge === "Live" ? "#10b981" : "#64748b",
                          }}
                        >
                          {app.badge}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {app.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <p className="mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                One hub. Multiple focused apps. All your classroom tools connected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-16 sm:px-6 sm:py-24" style={{ background: "var(--surface-base)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-main)" }}>
              Built for Australian teachers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: "var(--text-muted)" }}>
              Every app in the TebTally suite is designed to solve real classroom problems
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl p-6 sm:p-8"
                style={{ background: "var(--surface-subtle)", border: "1px solid var(--border-muted)" }}
              >
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background: "linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))",
                  }}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold" style={{ color: "var(--text-main)" }}>
                  {feature.title}
                </h3>
                <p style={{ color: "var(--text-muted)" }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Section */}
      <section id="apps" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-main)" }}>
              The TebTally Suite
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: "var(--text-muted)" }}>
              Each app tackles a specific classroom challenge. Use one or use them all.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <a
                key={app.id}
                href={app.disabled ? undefined : app.href}
                className="group overflow-hidden rounded-3xl transition hover:shadow-lg"
                style={{
                  background: "var(--surface-base)",
                  border: "1px solid var(--border-muted)",
                  pointerEvents: app.disabled ? "none" : "auto",
                  opacity: app.disabled ? 0.7 : 1,
                }}
              >
                <div className="relative aspect-video w-full overflow-hidden" style={{ background: "var(--surface-muted)" }}>
                  <Image src={app.image} alt={app.name} className="h-full w-full object-cover" />
                  <div className="absolute right-3 top-3">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold uppercase text-white"
                      style={{
                        background: app.badge === "Live" ? "#10b981" : "#64748b",
                      }}
                    >
                      {app.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold" style={{ color: "var(--text-main)" }}>
                      {app.name}
                    </h3>
                    <span className="text-sm font-semibold" style={{ color: "var(--primary-mid)" }}>
                      {app.price}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {app.description}
                  </p>
                  {app.trial && (
                    <p className="mt-2 text-xs font-medium" style={{ color: "var(--primary-mid)" }}>
                      {app.trial}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/pricing" className="inline-flex items-center gap-2 hover:underline" style={{ color: "var(--primary-mid)" }}>
              View detailed pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24" style={{ background: "var(--surface-base)" }}>
        <div className="mx-auto max-w-4xl">
          <div
            className="rounded-3xl p-8 sm:p-12"
            style={{
              background: "linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))",
            }}
          >
            <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
              Why teachers love TebTally
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
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
            <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-main)" }}>
              Free Classroom Tools
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: "var(--text-muted)" }}>
              No sign-up required. Works offline. Free forever.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Link
              href="/tools"
              className="rounded-3xl p-8 transition hover:shadow-lg"
              style={{ background: "var(--surface-base)", border: "1px solid var(--border-muted)" }}
            >
              <div className="mb-4 text-4xl">⏱️</div>
              <h3 className="mb-2 text-xl font-semibold" style={{ color: "var(--text-main)" }}>
                Timers
              </h3>
              <p className="mb-4" style={{ color: "var(--text-muted)" }}>
                4 specialized timers for managing classroom activities and transitions.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "var(--primary-mid)" }}>
                Explore timers →
              </span>
            </Link>
            <Link
              href="/tools"
              className="rounded-3xl p-8 transition hover:shadow-lg"
              style={{ background: "var(--surface-base)", border: "1px solid var(--border-muted)" }}
            >
              <div className="mb-4 text-4xl">🧰</div>
              <h3 className="mb-2 text-xl font-semibold" style={{ color: "var(--text-main)" }}>
                Classroom Tools
              </h3>
              <p className="mb-4" style={{ color: "var(--text-muted)" }}>
                Random selectors, seating charts, noise meter, and more.
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "var(--primary-mid)" }}>
                View all tools →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-main)" }}>
            Ready to simplify your classroom admin?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: "var(--text-muted)" }}>
            Join teachers across Australia using TebTally apps for spelling, assessment, and daily
            classroom management.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#apps"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:opacity-90"
              style={{
                background: "linear-gradient(to right, var(--primary-gradient-start), var(--primary-gradient-end))",
              }}
            >
              Explore Apps
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold transition"
              style={{
                background: "var(--surface-base)",
                color: "var(--text-main)",
                border: "1px solid var(--border-muted)",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-4 py-12 sm:px-6"
        style={{ background: "var(--surface-base)", borderTop: "1px solid var(--border-muted)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{
                  background: "linear-gradient(120deg, var(--primary-gradient-start), var(--primary-gradient-end))",
                }}
              >
                TT
              </div>
              <span className="font-semibold" style={{ color: "var(--text-main)" }}>
                TebTally
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
              <Link href="/pricing" className="transition hover:opacity-80">
                Pricing
              </Link>
              <Link href="/privacy" className="transition hover:opacity-80">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition hover:opacity-80">
                Terms of Service
              </Link>
              <Link href="/contact" className="transition hover:opacity-80">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} TebTally. Made with love in Australia.
          </div>
        </div>
      </footer>
    </div>
  );
}
