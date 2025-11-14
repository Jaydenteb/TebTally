'use client';

import { useState, useEffect, useRef } from 'react';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Toggle from '@/components/ui/Toggle';
import { getStorageItem, setStorageItem } from '@/lib/storage';

interface Timer {
  id: string;
  label: string;
  totalSeconds: number;
  timeLeft: number;
  isRunning: boolean;
  isComplete: boolean;
}

export default function MultiTimerPage() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [newLabel, setNewLabel] = useState('');
  const [newMinutes, setNewMinutes] = useState(5);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load settings
  useEffect(() => {
    const savedSound = getStorageItem<boolean>('multi-timer-sound', true);
    setSoundEnabled(savedSound);
  }, []);

  // Save sound setting
  useEffect(() => {
    setStorageItem('multi-timer-sound', soundEnabled);
  }, [soundEnabled]);

  // Timer intervals
  useEffect(() => {
    timers.forEach((timer) => {
      if (timer.isRunning && timer.timeLeft > 0) {
        if (!intervalRefs.current[timer.id]) {
          intervalRefs.current[timer.id] = setInterval(() => {
            setTimers((prev) =>
              prev.map((t) => {
                if (t.id === timer.id) {
                  const newTimeLeft = t.timeLeft - 1;
                  if (newTimeLeft <= 0) {
                    playAlarm();
                    return { ...t, timeLeft: 0, isRunning: false, isComplete: true };
                  }
                  return { ...t, timeLeft: newTimeLeft };
                }
                return t;
              })
            );
          }, 1000);
        }
      } else {
        if (intervalRefs.current[timer.id]) {
          clearInterval(intervalRefs.current[timer.id]);
          delete intervalRefs.current[timer.id];
        }
      }
    });

    return () => {
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, [timers]);

  const playAlarm = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error('Failed to play alarm:', err);
      });
    }
  };

  const addTimer = () => {
    if (newMinutes <= 0) return;

    const newTimer: Timer = {
      id: Date.now().toString(),
      label: newLabel.trim() || `Timer ${timers.length + 1}`,
      totalSeconds: newMinutes * 60,
      timeLeft: newMinutes * 60,
      isRunning: false,
      isComplete: false,
    };

    setTimers([...timers, newTimer]);
    setNewLabel('');
    setNewMinutes(5);
  };

  const startTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isRunning: true, isComplete: false } : t))
    );
  };

  const pauseTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isRunning: false } : t))
    );
  };

  const resetTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, timeLeft: t.totalSeconds, isRunning: false, isComplete: false }
          : t
      )
    );
  };

  const deleteTimer = (id: string) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
      delete intervalRefs.current[id];
    }
  };

  const startAll = () => {
    setTimers((prev) =>
      prev.map((t) => (t.timeLeft > 0 ? { ...t, isRunning: true, isComplete: false } : t))
    );
  };

  const pauseAll = () => {
    setTimers((prev) => prev.map((t) => ({ ...t, isRunning: false })));
  };

  const resetAll = () => {
    setTimers((prev) =>
      prev.map((t) => ({ ...t, timeLeft: t.totalSeconds, isRunning: false, isComplete: false }))
    );
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (timer: Timer) => {
    if (timer.totalSeconds === 0) return 0;
    return ((timer.totalSeconds - timer.timeLeft) / timer.totalSeconds) * 100;
  };

  return (
    <ToolLayout
      title="Multi-Timer"
      description="Run multiple timers simultaneously for stations or group activities."
    >
      <audio
        ref={audioRef}
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKzn7q1gGgs+mtzyxnMlBCuAz/LXiTgIGWi68OScTgwNU6ni77BnHgY2jtv0y3osBSp3yPDdkUELFF608OmpVxQLRp/g8r9sIwYxh9H003w0Bh1tw/Dgl0cOD1Sq5++vYhsLPpzc8sZ0Jgcqf87y1os4CRllufDlnFANDlKo4u+zahwHNY3b88t8LQUrd8jw3JJCCxRct/Dqq1gWC0WeDvPAbSQGMIbR89R9Ng"
      />

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Add Timer Form */}
        <Card padding="large">
          <h3 style={{ margin: '0 0 20px', fontSize: '1.25rem', fontWeight: 600 }}>
            Add New Timer
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: 12, alignItems: 'end' }}>
            <Input
              label="Label (optional)"
              placeholder="e.g., Station 1, Group A"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTimer()}
            />
            <Input
              label="Minutes"
              type="number"
              min={1}
              max={120}
              value={newMinutes}
              onChange={(e) => setNewMinutes(Number(e.target.value))}
              onKeyPress={(e) => e.key === 'Enter' && addTimer()}
            />
            <Button onClick={addTimer} disabled={newMinutes <= 0}>
              Add Timer
            </Button>
          </div>

          <div style={{ marginTop: 16 }}>
            <Toggle
              label="Enable alarm sound"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
            />
          </div>
        </Card>

        {/* Global Controls */}
        {timers.length > 0 && (
          <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Button onClick={startAll} variant="primary" size="small">
              Start All
            </Button>
            <Button onClick={pauseAll} variant="secondary" size="small">
              Pause All
            </Button>
            <Button onClick={resetAll} variant="secondary" size="small">
              Reset All
            </Button>
          </div>
        )}

        {/* Timers Grid */}
        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {timers.map((timer) => (
            <Card key={timer.id} padding="medium">
              <div style={{ marginBottom: 12 }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {timer.label}
                </h4>
              </div>

              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: timer.isComplete ? '#10b981' : 'var(--text-main)',
                  textAlign: 'center',
                  marginBottom: 12,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {formatTime(timer.timeLeft)}
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  height: 6,
                  background: 'var(--surface-subtle)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${getProgress(timer)}%`,
                    background: timer.isComplete
                      ? '#10b981'
                      : 'linear-gradient(135deg, var(--primary-gradient-start), var(--primary-gradient-end))',
                    transition: 'width 1s linear',
                  }}
                />
              </div>

              {timer.isComplete && (
                <div
                  style={{
                    marginBottom: 12,
                    padding: '8px 12px',
                    background: '#d1fae5',
                    color: '#065f46',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  Complete!
                </div>
              )}

              {/* Timer Controls */}
              <div style={{ display: 'flex', gap: 8 }}>
                {!timer.isRunning ? (
                  <Button
                    onClick={() => startTimer(timer.id)}
                    size="small"
                    style={{ flex: 1 }}
                    disabled={timer.timeLeft === 0}
                  >
                    Start
                  </Button>
                ) : (
                  <Button
                    onClick={() => pauseTimer(timer.id)}
                    variant="secondary"
                    size="small"
                    style={{ flex: 1 }}
                  >
                    Pause
                  </Button>
                )}
                <Button
                  onClick={() => resetTimer(timer.id)}
                  variant="secondary"
                  size="small"
                  style={{ flex: 1 }}
                >
                  Reset
                </Button>
                <Button
                  onClick={() => deleteTimer(timer.id)}
                  variant="danger"
                  size="small"
                >
                  ×
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {timers.length === 0 && (
          <Card padding="large" style={{ marginTop: 24, textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>
              No timers yet. Add your first timer above to get started!
            </p>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
