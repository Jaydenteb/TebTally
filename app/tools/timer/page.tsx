'use client';

import { useState, useEffect, useRef } from 'react';
import { Metadata } from 'next';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import Toggle from '@/components/ui/Toggle';
import PremiumCallout from '@/components/tools/PremiumCallout';
import LookingForMore from '@/components/tools/LookingForMore';
import { getStorageItem, setStorageItem } from '@/lib/storage';

interface TimerSettings {
  soundEnabled: boolean;
  volume: number;
}

export default function TimerPage() {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [settings, setSettings] = useState<TimerSettings>({
    soundEnabled: true,
    volume: 0.5,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = getStorageItem<TimerSettings>('timer-settings', {
      soundEnabled: true,
      volume: 0.5,
    });
    setSettings(savedSettings);
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    setStorageItem('timer-settings', settings);
  }, [settings]);

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
    if (settings.soundEnabled && audioRef.current) {
      audioRef.current.volume = settings.volume;
      audioRef.current.play().catch((err) => {
        console.error('Failed to play alarm:', err);
      });
    }
  };

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(minutes * 60 + seconds);
      setIsComplete(false);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeLeft(minutes * 60 + seconds);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleSetTime = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeLeft(minutes * 60 + seconds);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const total = minutes * 60 + seconds;
    if (total === 0) return 0;
    return ((total - timeLeft) / total) * 100;
  };

  const premiumApps = [
    {
      name: 'SpellTally',
      description: 'Engaging spelling practice with competitive gameplay.',
      url: 'https://spell.tebtally.com',
      badge: 'Premium',
    },
    {
      name: 'CheckTally',
      description: 'Quick and comprehensive formative assessment tool.',
      url: 'https://check.tebtally.com',
      badge: 'Premium',
    },
  ];

  return (
    <ToolLayout
      title="Simple Timer"
      description="Countdown timer with customizable duration and alarm sounds."
    >
      <PremiumCallout
        title="Want engaging spelling practice?"
        description="SpellTally provides weekly spelling tests with student dashboards and competitive gameplay."
        appName="SpellTally"
        appUrl="https://spell.tebtally.com"
        badge="Premium"
      />

      {/* Hidden audio element for alarm */}
      <audio
        ref={audioRef}
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKzn7q1gGgs+mtzyxnMlBCuAz/LXiTgIGWi68OScTgwNU6ni77BnHgY2jtv0y3osBSp3yPDdkUELFF608OmpVxQLRp/g8r9sIwYxh9H003w0Bh1tw/Dgl0cOD1Sq5++vYhsLPpzc8sZ0Jgcqf87y1os4CRllufDlnFANDlKo4u+zahwHNY3b88t8LQUrd8jw3JJCCxRct/Dqq1gWC0WeDvPAbSQGMIbR89R9Ng"
        loop
      />

      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {/* Timer Display */}
        <Card padding="large">
          <div style={{ textAlign: 'center' }}>
            <div
              className="timer-display"
              style={{
                fontSize: 'clamp(2.5rem, 12vw, 5rem)',
                fontWeight: 700,
                color: isComplete ? '#10b981' : 'var(--text-main)',
                marginBottom: 24,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.02em',
              }}
            >
              {formatTime(timeLeft)}
            </div>

            {/* Progress Bar */}
            <div
              style={{
                height: 8,
                background: 'var(--surface-subtle)',
                borderRadius: 4,
                overflow: 'hidden',
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${getProgress()}%`,
                  background: isComplete
                    ? '#10b981'
                    : 'linear-gradient(135deg, var(--primary-gradient-start), var(--primary-gradient-end))',
                  transition: 'width 1s linear',
                }}
              />
            </div>

            {/* Control Buttons */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              {!isRunning ? (
                <Button onClick={handleStart} size="large">
                  {timeLeft === 0 || isComplete ? 'Restart' : 'Start'}
                </Button>
              ) : (
                <Button onClick={handlePause} variant="secondary" size="large">
                  Pause
                </Button>
              )}
              <Button onClick={handleReset} variant="secondary" size="large">
                Reset
              </Button>
            </div>

            {isComplete && (
              <div
                style={{
                  marginTop: 24,
                  padding: '12px 20px',
                  background: '#d1fae5',
                  color: '#065f46',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600,
                }}
              >
                Time's up!
              </div>
            )}
          </div>
        </Card>

        {/* Time Settings */}
        <Card padding="large" className="mt-4" style={{ marginTop: 24 }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '1.125rem', fontWeight: 600 }}>
            Set Time
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <Slider
              label="Minutes"
              min={0}
              max={60}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              disabled={isRunning}
            />
            <Slider
              label="Seconds"
              min={0}
              max={59}
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>

          <Button
            onClick={handleSetTime}
            variant="secondary"
            size="medium"
            disabled={isRunning}
            style={{ width: '100%' }}
          >
            Apply Time
          </Button>
        </Card>

        {/* Sound Settings */}
        <Card padding="large" style={{ marginTop: 24 }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '1.125rem', fontWeight: 600 }}>
            Sound Settings
          </h3>

          <div style={{ marginBottom: 16 }}>
            <Toggle
              label="Enable alarm sound"
              checked={settings.soundEnabled}
              onChange={(e) =>
                setSettings({ ...settings, soundEnabled: e.target.checked })
              }
            />
          </div>

          {settings.soundEnabled && (
            <Slider
              label="Volume"
              min={0}
              max={1}
              step={0.1}
              value={settings.volume}
              onChange={(e) =>
                setSettings({ ...settings, volume: Number(e.target.value) })
              }
              valueFormatter={(value) => `${Math.round(value * 100)}%`}
            />
          )}
        </Card>

        {/* Instructions */}
        <Card padding="medium" style={{ marginTop: 24, background: 'var(--surface-subtle)' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '0.9375rem', fontWeight: 600 }}>
            How to use
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            <li>Set your desired time using the sliders</li>
            <li>Click "Apply Time" to update the timer</li>
            <li>Click "Start" to begin the countdown</li>
            <li>Use "Pause" to temporarily stop, or "Reset" to start over</li>
            <li>An alarm will sound when the timer reaches zero (if enabled)</li>
          </ul>
        </Card>

        <LookingForMore apps={premiumApps} />
      </div>
    </ToolLayout>
  );
}
