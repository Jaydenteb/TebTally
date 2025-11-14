'use client';

import { useState, useEffect, useRef } from 'react';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';
import { getStorageItem, setStorageItem } from '@/lib/storage';

const PRESETS = [
  { label: '30 seconds', seconds: 30 },
  { label: '1 minute', seconds: 60 },
  { label: '2 minutes', seconds: 120 },
  { label: '3 minutes', seconds: 180 },
  { label: '5 minutes', seconds: 300 },
  { label: '10 minutes', seconds: 600 },
];

export default function TransitionTimerPage() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load settings
  useEffect(() => {
    const savedSound = getStorageItem<boolean>('transition-timer-sound', true);
    setSoundEnabled(savedSound);
  }, []);

  // Save sound setting
  useEffect(() => {
    setStorageItem('transition-timer-sound', soundEnabled);
  }, [soundEnabled]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const playAlarm = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error('Failed to play alarm:', err);
      });
    }
  };

  const startPreset = (seconds: number) => {
    setTimeLeft(seconds);
    setTotalTime(seconds);
    setIsComplete(false);
    setIsRunning(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeLeft(totalTime);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeLeft(0);
    setTotalTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (totalTime === 0) return 0;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getCircleProgress = () => {
    if (totalTime === 0) return 0;
    return (timeLeft / totalTime) * 100;
  };

  return (
    <ToolLayout
      title="Transition Timer"
      description="Quick countdown with preset times for classroom transitions."
    >
      <audio
        ref={audioRef}
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKzn7q1gGgs+mtzyxnMlBCuAz/LXiTgIGWi68OScTgwNU6ni77BnHgY2jtv0y3osBSp3yPDdkUELFF608OmpVxQLRp/g8r9sIwYxh9H003w0Bh1tw/Dgl0cOD1Sq5++vYhsLPpzc8sZ0Jgcqf87y1os4CRllufDlnFANDlKo4u+zahwHNY3b88t8LQUrd8jw3JJCCxRct/Dqq1gWC0WeDvPAbSQGMIbR89R9Ng"
      />

      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {totalTime === 0 ? (
          /* Preset Selection */
          <Card padding="large">
            <h3 style={{ margin: '0 0 24px', fontSize: '1.5rem', fontWeight: 600, textAlign: 'center' }}>
              Choose a quick timer
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
              {PRESETS.map((preset) => (
                <button
                  key={preset.seconds}
                  onClick={() => startPreset(preset.seconds)}
                  style={{
                    padding: '32px 20px',
                    background: 'linear-gradient(135deg, var(--primary-gradient-start), var(--primary-gradient-end))',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border-muted)' }}>
              <Toggle
                label="Enable alarm sound"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
              />
            </div>
          </Card>
        ) : (
          /* Timer Display */
          <Card padding="large">
            <div style={{ textAlign: 'center' }}>
              {/* Circular Progress */}
              <div style={{ position: 'relative', width: 280, height: 280, margin: '0 auto 32px' }}>
                <svg width="280" height="280" style={{ transform: 'rotate(-90deg)' }}>
                  {/* Background circle */}
                  <circle
                    cx="140"
                    cy="140"
                    r="120"
                    fill="none"
                    stroke="var(--surface-subtle)"
                    strokeWidth="20"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="140"
                    cy="140"
                    r="120"
                    fill="none"
                    stroke={isComplete ? '#10b981' : 'url(#gradient)'}
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 120}`}
                    strokeDashoffset={`${2 * Math.PI * 120 * (1 - getCircleProgress() / 100)}`}
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary-gradient-start)" />
                      <stop offset="100%" stopColor="var(--primary-gradient-end)" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Time display in center */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '4rem',
                      fontWeight: 700,
                      color: isComplete ? '#10b981' : 'var(--text-main)',
                      fontVariantNumeric: 'tabular-nums',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>

              {isComplete && (
                <div
                  style={{
                    marginBottom: 24,
                    padding: '12px 20px',
                    background: '#d1fae5',
                    color: '#065f46',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 600,
                    fontSize: '1.125rem',
                  }}
                >
                  Transition time is up!
                </div>
              )}

              {/* Control Buttons */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
                {!isRunning && !isComplete && timeLeft > 0 && (
                  <Button onClick={handleResume} size="large">
                    Resume
                  </Button>
                )}
                {isRunning && (
                  <Button onClick={handlePause} variant="secondary" size="large">
                    Pause
                  </Button>
                )}
                {timeLeft > 0 && timeLeft < totalTime && (
                  <Button onClick={handleReset} variant="secondary" size="large">
                    Reset
                  </Button>
                )}
                <Button onClick={handleStop} variant="secondary" size="large">
                  New Timer
                </Button>
              </div>

              {/* Sound Toggle */}
              <div style={{ paddingTop: 24, borderTop: '1px solid var(--border-muted)' }}>
                <Toggle
                  label="Enable alarm sound"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Instructions */}
        <Card padding="medium" style={{ marginTop: 24, background: 'var(--surface-subtle)' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '0.9375rem', fontWeight: 600 }}>
            Perfect for
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            <li>Quick transitions between activities</li>
            <li>Bathroom breaks or cleanup time</li>
            <li>Timed discussions or partner work</li>
            <li>Getting students settled and ready</li>
            <li>Any quick countdown you need during class</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
}
