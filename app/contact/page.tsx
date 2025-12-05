"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || "Contact from TebTally website");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:support@tebtally.com?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <main className="mx-auto max-w-2xl space-y-8 px-6 py-16">
      <header>
        <h1 className="text-3xl font-semibold" style={{ color: "#0b1220" }}>
          Contact Us
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#42557a" }}>
          Have a question or feedback? We'd love to hear from you.
        </p>
      </header>

      <div
        style={{
          padding: "24px",
          background: "linear-gradient(135deg, rgba(51, 208, 245, 0.08) 0%, rgba(109, 60, 255, 0.08) 100%)",
          borderRadius: "14px",
          border: "1px solid rgba(51, 208, 245, 0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: "1.5rem" }}>✉️</span>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#0b1220", margin: 0 }}>
            Email Us Directly
          </h2>
        </div>
        <p style={{ fontSize: "0.9375rem", color: "#42557a", margin: "0 0 12px" }}>
          For fastest response, email us at:
        </p>
        <a
          href="mailto:support@tebtally.com"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: "1rem",
            fontWeight: 600,
            color: "#6D3CFF",
            textDecoration: "none",
          }}
        >
          support@tebtally.com
        </a>
      </div>

      <div style={{ position: "relative", textAlign: "center", margin: "32px 0" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 1,
            background: "rgba(58, 76, 130, 0.15)",
          }}
        />
        <span
          style={{
            position: "relative",
            background: "#fff",
            padding: "0 16px",
            fontSize: "0.875rem",
            color: "#42557a",
          }}
        >
          or use the form below
        </span>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label
            htmlFor="name"
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#0b1220",
              marginBottom: 6,
            }}
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "1rem",
              border: "1px solid rgba(58, 76, 130, 0.22)",
              borderRadius: "10px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6D3CFF")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(58, 76, 130, 0.22)")}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#0b1220",
              marginBottom: 6,
            }}
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "1rem",
              border: "1px solid rgba(58, 76, 130, 0.22)",
              borderRadius: "10px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6D3CFF")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(58, 76, 130, 0.22)")}
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#0b1220",
              marginBottom: 6,
            }}
          >
            Subject
          </label>
          <select
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "1rem",
              border: "1px solid rgba(58, 76, 130, 0.22)",
              borderRadius: "10px",
              outline: "none",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <option value="">Select a topic...</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="SpellTally Support">SpellTally Support</option>
            <option value="CheckTally Support">CheckTally Support</option>
            <option value="TebTally Pro Support">TebTally Pro Support</option>
            <option value="School Subscription">School Subscription</option>
            <option value="Billing Question">Billing Question</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Bug Report">Bug Report</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#0b1220",
              marginBottom: 6,
            }}
          >
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "1rem",
              border: "1px solid rgba(58, 76, 130, 0.22)",
              borderRadius: "10px",
              outline: "none",
              resize: "vertical",
              minHeight: 120,
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6D3CFF")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(58, 76, 130, 0.22)")}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            padding: "14px 24px",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, #33D0F5, #6D3CFF)",
            border: "none",
            borderRadius: "10px",
            cursor: status === "sending" ? "wait" : "pointer",
            opacity: status === "sending" ? 0.7 : 1,
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            if (status !== "sending") e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {status === "sending" ? "Opening email..." : "Send Message"}
        </button>

        {status === "sent" && (
          <p style={{ fontSize: "0.875rem", color: "#0f766e", textAlign: "center" }}>
            Your email client should have opened. If not, please email us directly at{" "}
            <a href="mailto:support@tebtally.com" style={{ color: "#6D3CFF", fontWeight: 500 }}>
              support@tebtally.com
            </a>
          </p>
        )}
      </form>

      <div className="pt-4 text-sm">
        <Link className="font-medium" href="/" style={{ color: "#0ea5e9" }}>
          ← Back to TebTally™
        </Link>
      </div>
    </main>
  );
}
