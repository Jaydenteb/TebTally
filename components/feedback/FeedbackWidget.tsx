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
  { type: 'BUG_REPORT' as const, icon: Bug, label: 'Bug', emoji: '🐛' },
  { type: 'FEATURE_SUGGESTION' as const, icon: Lightbulb, label: 'Feature', emoji: '💡' },
  { type: 'GENERAL_FEEDBACK' as const, icon: MessageSquare, label: 'Feedback', emoji: '💬' },
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
          source: 'tebtally.com',
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
                <p>Help us improve TebTally</p>
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
