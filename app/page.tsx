"use client";

import { useEffect, useMemo, useState } from "react";
import AppCard from "../components/AppCard";
import Link from "next/link";
import Image from "next/image";

import proPreview from "../Images/Hero image.png";
import spellPreview from "../Images/Spellt.png";
import writingPreview from "../Images/Writing.png";
import trackPreview from "../Images/logger.png";
import housePreview from "../Images/House.png";
import classPreview from "../Images/Class.png";
import checkPreview from "../Images/Check.png";

type AppPreview = {
  id: "tebtallypro" | "spelltally" | "writingtally" | "tracktally" | "housetally" | "classtally" | "checktally";
  title: string;
  description: string;
  href: string;
  badge: string;
  disabled?: boolean;
  image?: any;
  alt?: string;
};

export default function Page() {
  const links = {
    tebtallypro: process.env.NEXT_PUBLIC_TEBTALLYPRO_URL || "http://localhost:3004",
    spelltally: process.env.NEXT_PUBLIC_SPELLTALLY_URL || "http://localhost:3001",
    writetally: process.env.NEXT_PUBLIC_WRITETALLY_URL || "http://localhost:3002",
    tracktally: process.env.NEXT_PUBLIC_TRACKTALLY_URL || "http://localhost:3003",
  };

  const appPreviews: AppPreview[] = [
    {
      id: "tebtallypro",
      title: "TebTally™ Pro",
      description: "All TebTally™ features and tools enhanced with analytics, unified dashboards, and integrations. 14-day free trial, then $5/month.",
      href: links.tebtallypro,
      badge: "Live",
      image: proPreview,
      alt: "TebTally™ Pro dashboard preview",
    },
    {
      id: "spelltally",
      title: "SpellTally™",
      description: "Weekly spelling practice and tests with teacher dashboards. Try free for 30 days. $7/month or $69/year for schools.",
      href: links.spelltally,
      badge: "Live",
      image: spellPreview,
      alt: "SpellTally™ dashboard preview",
    },
    {
      id: "writingtally",
      title: "WritingTally™",
      description: "End-to-end writing assessments with rubrics and AI feedback. (Coming Soon)",
      href: links.writetally,
      badge: "In Development",
      disabled: true,
      image: writingPreview,
      alt: "WritingTally™ dashboard preview",
    },
    {
      id: "tracktally",
      title: "TrackTally™",
      description: "Fast, offline-friendly behaviour incident logging for classrooms. (Coming Soon)",
      href: links.tracktally,
      badge: "Pending Approval",
      disabled: true,
      image: trackPreview,
      alt: "TrackTally™ dashboard preview",
    },
    {
      id: "housetally",
      title: "HouseTally™",
      description: "House points tracking and live leaderboards for day-to-day school culture.",
      href: "#",
      badge: "In Development",
      disabled: true,
      image: housePreview,
      alt: "HouseTally™ dashboard preview",
    },
    {
      id: "classtally",
      title: "ClassTally™",
      description: "Class placement tool that builds next year's class lists based on academic, behaviour, ILP/EAL data plus relationships (friends, incompatibles, essential pairs).",
      href: "#",
      badge: "In Development",
      disabled: true,
      image: classPreview,
      alt: "ClassTally™ dashboard preview",
    },
    {
      id: "checktally",
      title: "CheckTally™",
      description: "Formative assessment app for teachers - quickly track student skills during classroom observations.",
      href: "#",
      badge: "In Development",
      disabled: true,
      image: checkPreview,
      alt: "CheckTally™ dashboard preview",
    },
  ];

  const previewable = appPreviews.filter((app) => app.image);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [previewOpacity, setPreviewOpacity] = useState(1);
  const activePreview = useMemo(() => previewable[activeIndex] ?? previewable[0], [previewable, activeIndex]);

  useEffect(() => {
    if (isInteracting || previewable.length === 0) return;
    const id = setInterval(() => {
      setPreviewOpacity(0);
      setTimeout(() => {
        setActiveIndex((idx) => (idx + 1) % previewable.length);
        setPreviewOpacity(1);
      }, 150);
    }, 5500);
    return () => clearInterval(id);
  }, [isInteracting, previewable.length]);

  const toolCategories = [
    {
      id: "timers",
      title: "Timers",
      description: "4 specialized timers for managing classroom activities and transitions.",
      icon: "⏱️",
      count: 4,
    },
    {
      id: "class-tools",
      title: "Classroom Tools",
      description: "Random selectors, seating charts, noise meter, and more.",
      icon: "🧰",
      count: 9,
    },
  ];

  const handlePrev = () => {
    setIsInteracting(true);
    setPreviewOpacity(0);
    setTimeout(() => {
      setActiveIndex((idx) => (idx - 1 + previewable.length) % previewable.length);
      setPreviewOpacity(1);
    }, 120);
  };

  const handleNext = () => {
    setIsInteracting(true);
    setPreviewOpacity(0);
    setTimeout(() => {
      setActiveIndex((idx) => (idx + 1) % previewable.length);
      setPreviewOpacity(1);
    }, 120);
  };

  return (
    <>
      <section className="hero">
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
          <h1 className="title" style={{ margin: 0 }}>
            TebTally™
          </h1>
          <span
            style={{
              fontSize: 12,
              background: "#EEF3FB",
              color: "#42557a",
              padding: "4px 8px",
              borderRadius: 999,
            }}
          >
            In development
          </span>
        </div>
        <p className="subtitle">Classroom apps that cut teacher admin, not corners.</p>
        <p style={{ marginTop: 8, fontSize: "1rem", color: "var(--text-muted)" }}>
          Spelling tests, behaviour logging, and daily tools built by an Australian primary teacher.
        </p>
        <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="#tools"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 18px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #0f766e, #14b8a6)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "0.98rem",
              textDecoration: "none",
              boxShadow: "0 10px 24px -18px rgba(15, 118, 110, 0.8)",
            }}
          >
            Explore free tools
          </a>
          <a
            href="#apps"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 18px",
              borderRadius: 999,
              border: "1px solid rgba(51, 208, 245, 0.4)",
              background: "rgba(255,255,255,0.9)",
              color: "#0f172a",
              fontWeight: 600,
              fontSize: "0.98rem",
              textDecoration: "none",
            }}
          >
            See premium apps
          </a>
        </div>
      </section>

      <section id="apps" style={{ paddingTop: 32, paddingBottom: 16 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
              fontWeight: 700,
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
              background: "linear-gradient(120deg, #33D0F5, #6D3CFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Premium Apps
          </h2>
          <p style={{ fontSize: "clamp(0.9375rem, 2.5vw, 1.125rem)", color: "var(--text-muted)", maxWidth: 600, margin: "0 auto", padding: "0 8px" }}>
            Browse the suite. Tap a card or use arrows to preview.
          </p>
        </div>

        <div
          className="grid"
          style={{ gap: 20, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", marginBottom: 24 }}
        >
          {appPreviews.map((app) => {
            return (
              <div
                key={app.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  borderRadius: "var(--radius-md)",
                  transition: "transform 150ms ease",
                  outline: "none",
                  boxShadow: "none",
                }}
                onMouseEnter={() => {
                  setIsInteracting(true);
                  setPreviewOpacity(0);
                  setTimeout(() => {
                    const previewIdx = previewable.findIndex((p) => p.id === app.id);
                    if (previewIdx >= 0) setActiveIndex(previewIdx);
                    setPreviewOpacity(1);
                  }, 120);
                }}
                onMouseLeave={() => setIsInteracting(false)}
                onFocus={() => {
                  setIsInteracting(true);
                  setPreviewOpacity(0);
                  setTimeout(() => {
                    const previewIdx = previewable.findIndex((p) => p.id === app.id);
                    if (previewIdx >= 0) setActiveIndex(previewIdx);
                    setPreviewOpacity(1);
                  }, 120);
                }}
                onBlur={() => setIsInteracting(false)}
                onClick={() => {
                  setIsInteracting(true);
                  setPreviewOpacity(0);
                  setTimeout(() => {
                    const previewIdx = previewable.findIndex((p) => p.id === app.id);
                    if (previewIdx >= 0) setActiveIndex(previewIdx);
                    setPreviewOpacity(1);
                  }, 120);
                }}
                role="button"
                tabIndex={0}
              >
                <AppCard
                  title={app.title}
                  href={app.href}
                  description={app.description}
                  premium={true}
                  badge={app.badge}
                  disabled={app.disabled}
                />
              </div>
            );
          })}
        </div>

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid #e2e8f0",
            boxShadow: "0 18px 40px -24px rgba(15,23,42,0.45)",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          <button
            type="button"
            aria-label="Previous preview"
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              width: 44,
              height: 44,
              minWidth: 44,
              minHeight: 44,
              borderRadius: "50%",
              border: "1px solid #e2e8f0",
              background: "#fff",
              boxShadow: "0 8px 16px -10px rgba(15,23,42,0.4)",
              cursor: "pointer",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.125rem",
            }}
          >
            ←
          </button>

          <div
            style={{
              flex: 1,
              transition: "opacity 250ms ease",
              opacity: previewOpacity,
              display: "flex",
              justifyContent: "center",
              padding: 0,
            }}
          >
            <Image
              key={activePreview.id}
              src={activePreview.image as any}
              alt={activePreview.alt || "App preview"}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
              priority
            />
          </div>

          <button
            type="button"
            aria-label="Next preview"
            onClick={handleNext}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              width: 44,
              height: 44,
              minWidth: 44,
              minHeight: 44,
              borderRadius: "50%",
              border: "1px solid #e2e8f0",
              background: "#fff",
              boxShadow: "0 8px 16px -10px rgba(15,23,42,0.4)",
              cursor: "pointer",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.125rem",
            }}
          >
            →
          </button>
        </div>
      </section>

      <section id="tools" style={{ paddingTop: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontSize: "clamp(1.25rem, 4vw, 1.875rem)", fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>
            Free Teacher Tools
          </h2>
          <Link
            href="/tools"
            style={{
              color: "var(--primary-mid)",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "0.9375rem",
            }}
          >
            View All →
          </Link>
        </div>
        <p style={{ color: "var(--text-muted)", marginBottom: 24, fontSize: "1rem" }}>
          No sign-up required. Works offline. Free forever.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          {toolCategories.map((category) => (
            <Link
              key={category.id}
              href="/tools"
              style={{
                textDecoration: "none",
                display: "block",
              }}
            >
              <div
                style={{
                  padding: "28px 24px",
                  background: "var(--surface-base)",
                  border: "1px solid var(--border-muted)",
                  borderRadius: "var(--radius-md)",
                  transition: "all var(--transition-normal)",
                  cursor: "pointer",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.borderColor = "var(--primary-mid)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "var(--border-muted)";
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{category.icon}</div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    margin: "0 0 8px",
                    color: "var(--text-base)",
                  }}
                >
                  {category.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--text-muted)",
                    margin: "0 0 12px",
                    lineHeight: 1.5,
                  }}
                >
                  {category.description}
                </p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: "0.875rem",
                    color: "var(--primary-mid)",
                    fontWeight: 500,
                  }}
                >
                  {category.count} tools <span style={{ fontSize: "1rem" }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="about" className="about">
        <h2>About TebTally™</h2>
        <p>
          TebTally™ brings together focused, teacher-first apps under one roof. As we grow, this hub will host account
          management, billing, and single sign-on to each product.
        </p>
        <p style={{ color: "#42557a" }}>
          Privacy & Terms live here and apply to the TebTally™ suite while individual product docs remain in their apps.
        </p>
      </section>
    </>
  );
}
