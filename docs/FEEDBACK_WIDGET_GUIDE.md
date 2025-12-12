# Feedback Widget Implementation Guide

Add a feedback widget to any TebTally app that sends submissions to the central admin dashboard at id.tebtally.com.

## Overview

The feedback widget is a floating button that opens a popout form allowing users to submit:
- Bug Reports
- Feature Suggestions
- General Feedback

All submissions are stored in the TebTallyIdentity database and viewable at `/admin/feedback`.

---

## Quick Start

### 1. Create the Widget Component

Create `components/feedback/FeedbackWidget.tsx`:

```tsx
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle, X, Bug, Lightbulb, MessageSquare, Send, Check, Loader2 } from 'lucide-react'

type FeedbackType = 'BUG_REPORT' | 'FEATURE_SUGGESTION' | 'GENERAL_FEEDBACK'

interface FeedbackForm {
  type: FeedbackType
  message: string
  name: string
  email: string
}

const feedbackTypes = [
  { type: 'BUG_REPORT' as const, label: 'Bug', emoji: '🐛' },
  { type: 'FEATURE_SUGGESTION' as const, label: 'Feature', emoji: '💡' },
  { type: 'GENERAL_FEEDBACK' as const, label: 'Feedback', emoji: '💬' },
]

const API_URL = process.env.NEXT_PUBLIC_IDENTITY_API_URL || 'https://id.tebtally.com'

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const [form, setForm] = useState<FeedbackForm>({
    type: 'GENERAL_FEEDBACK',
    message: '',
    name: '',
    email: '',
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setError(null)
  }, [])

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClose])

  // Handle escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, handleClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (form.message.trim().length < 10) {
      setError('Please provide more details (at least 10 characters)')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: form.type,
          message: form.message.trim(),
          name: form.name.trim() || undefined,
          email: form.email.trim() || undefined,
          source: 'YOUR_APP_NAME', // Change this!
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit feedback')
      }

      setIsSuccess(true)
      setForm({ type: 'GENERAL_FEEDBACK', message: '', name: '', email: '' })

      // Auto close after success
      setTimeout(() => {
        setIsSuccess(false)
        setIsOpen(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null

  const widget = (
    <>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="feedback-trigger"
        aria-label="Send feedback"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Panel */}
      {isOpen && (
        <div ref={panelRef} className="feedback-panel">
          {isSuccess ? (
            <div className="feedback-success">
              <div className="feedback-success-icon">
                <Check size={32} />
              </div>
              <h3>Thank you!</h3>
              <p>Your feedback has been received.</p>
            </div>
          ) : (
            <>
              <div className="feedback-header">
                <h3>Send Feedback</h3>
                <p>Help us improve</p>
              </div>

              <form onSubmit={handleSubmit} className="feedback-form">
                {/* Type Selector */}
                <div className="feedback-type-selector">
                  {feedbackTypes.map(({ type, label, emoji }) => (
                    <button
                      key={type}
                      type="button"
                      className={`feedback-type-btn ${form.type === type ? 'active' : ''}`}
                      onClick={() => setForm({ ...form, type })}
                    >
                      <span className="feedback-type-emoji">{emoji}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>

                {/* Message */}
                <textarea
                  placeholder={
                    form.type === 'BUG_REPORT'
                      ? "Describe the bug you encountered..."
                      : form.type === 'FEATURE_SUGGESTION'
                      ? "Describe the feature you'd like..."
                      : "Share your thoughts with us..."
                  }
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="feedback-textarea"
                  rows={4}
                  maxLength={5000}
                  required
                />

                {/* Optional Fields */}
                <div className="feedback-optional">
                  <input
                    type="text"
                    placeholder="Name (optional)"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="feedback-input"
                    maxLength={100}
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="feedback-input"
                    maxLength={255}
                  />
                </div>

                {/* Error Message */}
                {error && <p className="feedback-error">{error}</p>}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || form.message.trim().length < 10}
                  className="feedback-submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Feedback
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )

  return createPortal(widget, document.body)
}
```

**Important:** Change `source: 'YOUR_APP_NAME'` to your app's identifier (e.g., `'spelltally.com'`, `'checktally.com'`, `'tebtally-pro'`).

---

### 2. Add CSS Styles

Add these styles to your `globals.css`:

```css
/* ===== FEEDBACK WIDGET ===== */

.feedback-trigger {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-gradient-start, #33d0f5), var(--primary-gradient-end, #6d3cff));
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(90, 98, 255, 0.35);
  transition: all 0.2s ease;
  z-index: 1000;
}

.feedback-trigger:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 24px rgba(90, 98, 255, 0.45);
}

.feedback-trigger:active {
  transform: scale(0.98);
}

.feedback-panel {
  position: fixed;
  bottom: 96px;
  right: 24px;
  width: 360px;
  max-width: calc(100vw - 48px);
  background: white;
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(11, 18, 32, 0.2);
  z-index: 1001;
  animation: feedbackSlideIn 0.25s ease;
  overflow: hidden;
}

@keyframes feedbackSlideIn {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.feedback-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.feedback-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0b1220;
  margin: 0 0 0.25rem;
}

.feedback-header p {
  font-size: 0.875rem;
  color: #42557a;
  margin: 0;
}

.feedback-form {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feedback-type-selector {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.feedback-type-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.75rem 0.5rem;
  background: #f6f8fc;
  border: 2px solid transparent;
  border-radius: 14px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  color: #42557a;
  transition: all 0.15s ease;
}

.feedback-type-btn:hover {
  background: #eef3fb;
  color: #0b1220;
}

.feedback-type-btn.active {
  background: linear-gradient(120deg, rgba(51, 208, 245, 0.12), rgba(109, 60, 255, 0.12));
  border-color: #5a62ff;
  color: #5a62ff;
}

.feedback-type-emoji {
  font-size: 1.25rem;
}

.feedback-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.9375rem;
  background: white;
  color: #0b1220;
  resize: none;
  transition: all 0.15s ease;
}

.feedback-textarea:focus {
  outline: none;
  border-color: #5a62ff;
  box-shadow: 0 0 0 3px rgba(90, 98, 255, 0.1);
}

.feedback-textarea::placeholder {
  color: #42557a;
}

.feedback-optional {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feedback-input {
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.875rem;
  background: white;
  color: #0b1220;
  transition: all 0.15s ease;
}

.feedback-input:focus {
  outline: none;
  border-color: #5a62ff;
  box-shadow: 0 0 0 3px rgba(90, 98, 255, 0.1);
}

.feedback-input::placeholder {
  color: #42557a;
}

.feedback-error {
  color: #ef4444;
  font-size: 0.8125rem;
  margin: 0;
}

.feedback-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  background: linear-gradient(135deg, var(--primary-gradient-start, #33d0f5), var(--primary-gradient-end, #6d3cff));
  color: white;
  font-weight: 600;
  font-size: 0.9375rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 4px 14px rgba(90, 98, 255, 0.3);
}

.feedback-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(90, 98, 255, 0.4);
}

.feedback-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.feedback-success {
  padding: 3rem 1.5rem;
  text-align: center;
}

.feedback-success-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(51, 208, 245, 0.15), rgba(109, 60, 255, 0.15));
  color: #5a62ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.feedback-success h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0b1220;
  margin: 0 0 0.5rem;
}

.feedback-success p {
  color: #42557a;
  margin: 0;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .feedback-trigger {
    bottom: 16px;
    right: 16px;
    width: 52px;
    height: 52px;
  }

  .feedback-panel {
    bottom: 80px;
    right: 16px;
    left: 16px;
    width: auto;
    max-width: none;
  }

  .feedback-header {
    padding: 1rem 1.25rem;
  }

  .feedback-form {
    padding: 1rem 1.25rem 1.25rem;
  }

  .feedback-type-btn {
    padding: 0.625rem 0.375rem;
    font-size: 0.6875rem;
  }

  .feedback-type-emoji {
    font-size: 1.125rem;
  }
}
```

---

### 3. Add to Layout

In your root `layout.tsx`:

```tsx
import FeedbackWidget from '@/components/feedback/FeedbackWidget'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Your app content */}
        {children}

        {/* Feedback widget - add before closing body */}
        <FeedbackWidget />
      </body>
    </html>
  )
}
```

---

### 4. Environment Variable (Optional)

For local development, add to `.env.local`:

```
NEXT_PUBLIC_IDENTITY_API_URL=http://localhost:3001
```

For production, the default `https://id.tebtally.com` is used.

---

### 5. Install Dependencies

Ensure you have lucide-react installed:

```bash
npm install lucide-react
```

---

## API Reference

### POST /api/feedback

Submit feedback to the central system.

**Request:**
```json
{
  "type": "BUG_REPORT" | "FEATURE_SUGGESTION" | "GENERAL_FEEDBACK",
  "message": "string (10-5000 chars)",
  "name": "string (optional, max 100)",
  "email": "string (optional, valid email)",
  "source": "string (optional, e.g. 'spelltally.com')"
}
```

**Response (200):**
```json
{
  "success": true,
  "id": "cuid",
  "message": "Thank you for your feedback!"
}
```

**Rate Limit:** 5 submissions per hour per IP address.

---

## Admin Dashboard

View all feedback at: `https://id.tebtally.com/admin/feedback`

Features:
- Filter by type (Bug/Feature/Feedback)
- Filter by status (New/In Progress/Resolved/Won't Fix/Duplicate)
- Update status and add admin notes
- Delete feedback
- See source app for each submission

---

## Customization

### Change Button Position

Modify `.feedback-trigger` in CSS:
```css
.feedback-trigger {
  bottom: 24px;  /* Distance from bottom */
  right: 24px;   /* Distance from right */
  /* Or use left: 24px; for left side */
}
```

### Change Colors

The widget uses CSS variables. Override them in your app:
```css
:root {
  --primary-gradient-start: #your-color;
  --primary-gradient-end: #your-color;
}
```

### Hide on Specific Pages

Conditionally render based on pathname:
```tsx
'use client'
import { usePathname } from 'next/navigation'

export default function FeedbackWidget() {
  const pathname = usePathname()

  // Hide on admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }

  // ... rest of component
}
```

---

## Backend Configuration (TebTallyIdentity)

When adding the feedback widget to a **new domain**, you must whitelist that domain in the TebTallyIdentity backend for CORS.

### Step 1: Add Domain to CORS Whitelist

**File:** `d:\.codex\tebtally-identity\src\app\api\feedback\route.ts`

Find the `ALLOWED_ORIGINS` array near the top of the file:

```typescript
// CORS allowed origins
const ALLOWED_ORIGINS = [
  "https://tebtally.com",
  "https://www.tebtally.com",
  "http://localhost:3000",
  "http://localhost:3001",
];
```

Add your new domain(s):

```typescript
const ALLOWED_ORIGINS = [
  "https://tebtally.com",
  "https://www.tebtally.com",
  "https://spelltally.com",      // Add new domain
  "https://www.spelltally.com",  // Add www variant
  "http://localhost:3000",
  "http://localhost:3001",
];
```

### Step 2: Deploy TebTallyIdentity

After updating CORS, commit and deploy TebTallyIdentity:

```bash
cd d:\.codex\tebtally-identity
git add src/app/api/feedback/route.ts
git commit -m "feat: add [app-name] to feedback CORS whitelist"
git push
```

The Vercel deployment will automatically update id.tebtally.com.

### Step 3: Verify

Test by opening your app and submitting a test feedback. Check:
1. No CORS errors in browser console
2. Feedback appears at https://id.tebtally.com/admin/feedback
3. Source field shows your app name

---

## Current CORS Whitelist

| Domain | Status |
|--------|--------|
| `https://tebtally.com` | Allowed |
| `https://www.tebtally.com` | Allowed |
| `http://localhost:3000` | Allowed (dev) |
| `http://localhost:3001` | Allowed (dev) |

---

## Troubleshooting

### CORS Error in Console

```
Access to fetch at 'https://id.tebtally.com/api/feedback' from origin 'https://yourapp.com'
has been blocked by CORS policy
```

**Solution:** Add your domain to `ALLOWED_ORIGINS` in TebTallyIdentity and redeploy.

### 429 Too Many Requests

The API rate limits to 5 submissions per hour per IP. Wait an hour or test from a different network.

### Feedback Not Appearing in Admin

1. Check browser Network tab for the POST response
2. Verify the response has `"success": true`
3. Check the `source` field matches your app name for filtering
