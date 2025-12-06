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
  Gift,
  Users,
  Building,
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
    comingSoon: true,
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
    icon: Gift,
    title: "Free Tools Included",
    description:
      "Timers, name pickers, and classroom tools at no cost. Use them without signing up.",
  },
  {
    icon: Users,
    title: "Built by Teachers",
    description:
      "Designed by an Australian primary teacher who understands the daily realities of classroom management.",
  },
  {
    icon: Building,
    title: "School Subscriptions",
    description:
      "Volume pricing available for whole-school rollouts. Contact us for founding school rates.",
  },
];

const apps = [
  {
    id: "tebtallypro",
    name: "TebTally Pro",
    shortDescription: "All classroom tools in one workspace.",
    fullDescription: "TebTally Pro combines all your classroom management tools into one powerful workspace. Access enhanced versions of timers, name pickers, and classroom tools with analytics dashboards to track usage patterns. Perfect for teachers who want everything in one place with data insights.",
    badge: "Live",
    price: "$5/mo",
    trial: "14-day trial",
    image: proPreview,
    href: "https://pro.tebtally.com",
  },
  {
    id: "spelltally",
    name: "SpellTally",
    shortDescription: "Weekly spelling tests made simple.",
    fullDescription: "SpellTally streamlines your weekly spelling routine. Create custom word lists, assign them to students, and let them practice throughout the week. Students hear words read aloud and type their answers. Teachers get instant results with class-wide analytics showing who needs extra support.",
    badge: "Live",
    price: "$7/mo",
    trial: "30-day trial",
    image: spellPreview,
    href: "https://spell.tebtally.com",
  },
  {
    id: "checktally",
    name: "CheckTally",
    shortDescription: "Track student skills as you teach.",
    fullDescription: "CheckTally is a formative assessment tool for busy teachers. Create skill checklists aligned to curriculum outcomes, then quickly mark off student progress during lessons, reading groups, or observations. Build a picture of each student's growth over time without paperwork piling up.",
    badge: "Live",
    price: "$7/mo",
    trial: "30-day trial",
    image: checkPreview,
    href: "https://check.tebtally.com",
  },
  {
    id: "tracktally",
    name: "TrackTally",
    shortDescription: "Offline behaviour incident logging.",
    fullDescription: "TrackTally helps you document behaviour incidents quickly and consistently. Works offline so you can log events even without internet, then syncs when you're back online. Generate reports for parent meetings, welfare teams, or admin with just a few taps.",
    badge: "Pending",
    price: "Soon",
    image: trackPreview,
    href: "#",
    disabled: true,
  },
  {
    id: "housetally",
    name: "HouseTally",
    shortDescription: "House points and live leaderboards.",
    fullDescription: "HouseTally brings house point tracking into the digital age. Award points from any device, display live leaderboards on classroom screens, and let students see their house's progress in real-time. Perfect for building school culture and friendly competition.",
    badge: "In Dev",
    price: "TBA",
    image: housePreview,
    href: "#",
    disabled: true,
  },
  {
    id: "classtally",
    name: "ClassTally",
    shortDescription: "Smart class placement for next year.",
    fullDescription: "ClassTally takes the stress out of class placement. Input student data including academic levels, behaviour notes, ILP/EAL status, and social relationships (friends, incompatibles, essential pairs). The algorithm builds balanced class lists that respect all your constraints.",
    badge: "In Dev",
    price: "TBA",
    image: classPreview,
    href: "#",
    disabled: true,
  },
];

const benefits = [
  "Australian Curriculum aligned",
  "No student emails or contact info required",
  "Export your data anytime",
  "Free classroom tools included",
  "14-30 day free trials on all apps",
  "Cancel subscriptions anytime",
  "Australian made and hosted",
  "Responsive support from real teachers",
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
              href="#features"
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
                {apps.map((app, idx) => {
                  const isLive = !app.disabled;
                  const TileWrapper = isLive ? "a" : "button";
                  const tileProps = isLive
                    ? { href: app.href, target: "_blank", rel: "noopener noreferrer" }
                    : { onClick: () => setActiveApp(idx) };

                  return (
                    <TileWrapper
                      key={app.id}
                      {...tileProps}
                      onMouseEnter={() => setActiveApp(idx)}
                      className="relative overflow-hidden rounded-2xl text-left transition-all duration-200"
                      style={{
                        background: "var(--surface-subtle)",
                        border: activeApp === idx ? "2px solid var(--primary-mid)" : "1px solid var(--border-muted)",
                        transform: activeApp === idx ? "scale(1.05)" : "scale(1)",
                        boxShadow: activeApp === idx ? "0 8px 25px rgba(109, 60, 255, 0.15)" : "none",
                        zIndex: activeApp === idx ? 10 : 1,
                        cursor: isLive ? "pointer" : "default",
                      }}
                    >
                      <div className="aspect-video w-full overflow-hidden relative">
                        <Image
                          src={app.image}
                          alt={app.name}
                          className="h-full w-full object-cover transition-opacity duration-200"
                          style={{ opacity: activeApp === idx ? 1 : 0.5 }}
                        />
                        {isLive && (
                          <div
                            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 hover:opacity-100"
                            style={{ background: "rgba(0,0,0,0.4)" }}
                          >
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold" style={{ color: "var(--primary-mid)" }}>
                              Open App →
                            </span>
                          </div>
                        )}
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
                          {app.shortDescription}
                        </p>
                      </div>
                    </TileWrapper>
                  );
                })}
              </div>

              {/* Selected app description */}
              <div
                className="mt-6 rounded-2xl p-4 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(51, 208, 245, 0.08) 0%, rgba(109, 60, 255, 0.08) 100%)",
                  border: "1px solid rgba(109, 60, 255, 0.15)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, var(--primary-gradient-start), var(--primary-gradient-end))",
                    }}
                  >
                    {apps[activeApp].name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h4 className="font-semibold" style={{ color: "var(--text-main)" }}>
                        {apps[activeApp].name}
                      </h4>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
                        style={{
                          background: apps[activeApp].badge === "Live" ? "rgba(16, 185, 129, 0.1)" : "rgba(100, 116, 139, 0.1)",
                          color: apps[activeApp].badge === "Live" ? "#10b981" : "#64748b",
                        }}
                      >
                        {apps[activeApp].badge}
                      </span>
                      {apps[activeApp].price && (
                        <span className="text-sm font-medium" style={{ color: "var(--primary-mid)" }}>
                          {apps[activeApp].price}
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {apps[activeApp].fullDescription}
                    </p>
                    {!apps[activeApp].disabled && (
                      <a
                        href={apps[activeApp].href}
                        className="mt-3 inline-flex items-center gap-1 text-sm font-medium transition hover:gap-2"
                        style={{ color: "var(--primary-mid)" }}
                      >
                        Try {apps[activeApp].name} →
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Pricing link */}
              <div className="mt-6 text-center">
                <Link href="/pricing" className="inline-flex items-center gap-2 text-sm hover:underline" style={{ color: "var(--primary-mid)" }}>
                  View detailed pricing →
                </Link>
              </div>
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
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-xl font-semibold" style={{ color: "var(--text-main)" }}>
                    {feature.title}
                  </h3>
                  {feature.comingSoon && (
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-semibold uppercase"
                      style={{ background: "rgba(109, 60, 255, 0.15)", color: "var(--primary-mid)" }}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>
                <p style={{ color: "var(--text-muted)" }}>{feature.description}</p>
              </div>
            ))}
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
              href="#features"
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

    </div>
  );
}
