'use client';

import { useState, useEffect, useRef } from 'react';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import Toggle from '@/components/ui/Toggle';
import { getStorageItem, setStorageItem } from '@/lib/storage';

interface Stage {
  name: string;
  icon: string;
  defaultMinutes: number;
}

const STAGES: Stage[] = [
  { name: 'Think', icon: '🤔', defaultMinutes: 2 },
  { name: 'Pair', icon: '👥', defaultMinutes: 3 },
  { name: 'Share', icon: '🗣️', defaultMinutes: 5 },
];

interface StageSettings {
  thinkMinutes: number;
  pairMinutes: number;
  shareMinutes: number;
  soundEnabled: boolean;
  autoAdvance: boolean;
}

export default function ThinkPairShareTimerPage() {
  const [currentStage, setCurrentStage] = useState<number>(-1); // -1 means not started
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [settings, setSettings] = useState<StageSettings>({
    thinkMinutes: 2,
    pairMinutes: 3,
    shareMinutes: 5,
    soundEnabled: true,
    autoAdvance: false,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load settings
  useEffect(() => {
    const saved = getStorageItem<StageSettings>('think-pair-share-settings', {
      thinkMinutes: 2,
      pairMinutes: 3,
      shareMinutes: 5,
      soundEnabled: true,
      autoAdvance: false,
    });
    setSettings(saved);
  }, []);

  // Save settings
  useEffect(() => {
    setStorageItem('think-pair-share-settings', settings);
  }, [settings]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playAlarm();

            // Auto-advance to next stage if enabled
            if (settings.autoAdvance && currentStage < 2) {
              setTimeout(() => {
                advanceStage();
              }, 2000);
            }

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
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error('Failed to play alarm:', err);
      });
    }
  };

  const getStageDuration = (stage: number) => {
    switch (stage) {
      case 0:
        return settings.thinkMinutes * 60;
      case 1:
        return settings.pairMinutes * 60;
      case 2:
        return settings.shareMinutes * 60;
      default:
        return 0;
    }
  };

  const startActivity = () => {
    setCurrentStage(0);
    setTimeLeft(getStageDuration(0));
    setIsRunning(true);
    setIsComplete(false);
  };

  const advanceStage = () => {
    if (currentStage < 2) {
      const nextStage = currentStage + 1;
      setCurrentStage(nextStage);
      setTimeLeft(getStageDuration(nextStage));
      setIsRunning(true);
      setIsComplete(false);
    } else {
      setIsComplete(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setCurrentStage(-1);
    setTimeLeft(0);
    setIsRunning(false);
    setIsComplete(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleSkip = () => {
    setIsRunning(false);
    advanceStage();
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (currentStage === -1) return 0;
    const totalDuration = getStageDuration(currentStage);
    if (totalDuration === 0) return 0;
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  };

  return (
    <ToolLayout
      title="Think-Pair-Share Timer"
      description="Multi-stage timer for collaborative learning activities."
    >
      <audio
        ref={audioRef}
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKzn7q1gGgs+mtzyxnMlBCuAz/LXiTgIGWi68OScTgwNU6ni77BnHgY2jtv0y3osBSp3yPDdkUELFF608OmpVxQLRp/g8r9sIwYxh9H003w0Bh1tw/Dgl0cOD1Sq5++vYhsLPpzc8sZ0Jgcqf87y1os4CRllufDlnFANDlKo4u+zahwHNY3b88t8LQUrd8jw3JJCCxRct/Dqq1gWC0WeDvPAbSQGMIbR89R9Ng"
      />

      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {currentStage === -1 ? (
          /* Setup Screen */
          <>
            <Card padding="large">
              <h3 style={{ margin: '0 0 24px', fontSize: '1.5rem', fontWeight: 600 }}>
                Configure Activity
              </h3>

              {/* Stage Progress Indicator */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  {STAGES.map((stage, index) => (
                    <div
                      key={stage.name}
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        opacity: 0.6,
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: 4 }}>{stage.icon}</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{stage.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Settings */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>
                <Slider
                  label={`${STAGES[0].icon} Think Time`}
                  min={1}
                  max={10}
                  value={settings.thinkMinutes}
                  onChange={(e) =>
                    setSettings({ ...settings, thinkMinutes: Number(e.target.value) })
                  }
                  valueFormatter={(value) => `${value} min`}
                />
                <Slider
                  label={`${STAGES[1].icon} Pair Time`}
                  min={1}
                  max={10}
                  value={settings.pairMinutes}
                  onChange={(e) =>
                    setSettings({ ...settings, pairMinutes: Number(e.target.value) })
                  }
                  valueFormatter={(value) => `${value} min`}
                />
                <Slider
                  label={`${STAGES[2].icon} Share Time`}
                  min={1}
                  max={15}
                  value={settings.shareMinutes}
                  onChange={(e) =>
                    setSettings({ ...settings, shareMinutes: Number(e.target.value) })
                  }
                  valueFormatter={(value) => `${value} min`}
                />
              </div>

              {/* Options */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  paddingTop: 20,
                  borderTop: '1px solid var(--border-muted)',
                  marginBottom: 24,
                }}
              >
                <Toggle
                  label="Enable alarm sound between stages"
                  checked={settings.soundEnabled}
                  onChange={(e) =>
                    setSettings({ ...settings, soundEnabled: e.target.checked })
                  }
                />
                <Toggle
                  label="Auto-advance to next stage"
                  checked={settings.autoAdvance}
                  onChange={(e) =>
                    setSettings({ ...settings, autoAdvance: e.target.checked })
                  }
                />
              </div>

              <Button onClick={startActivity} size="large" style={{ width: '100%' }}>
                Start Activity
              </Button>
            </Card>

            {/* Instructions */}
            <Card padding="medium" style={{ marginTop: 24, background: 'var(--surface-subtle)' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '0.9375rem', fontWeight: 600 }}>
                How it works
              </h4>
              <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
                <li><strong>Think:</strong> Students think individually about the question</li>
                <li><strong>Pair:</strong> Students discuss their thoughts with a partner</li>
                <li><strong>Share:</strong> Pairs share insights with the whole class</li>
              </ul>
            </Card>
          </>
        ) : (
          /* Activity in Progress */
          <Card padding="large">
            {/* Stage Indicator */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                {STAGES.map((stage, index) => (
                  <div
                    key={stage.name}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      opacity: index === currentStage ? 1 : index < currentStage ? 0.4 : 0.3,
                      transition: 'opacity var(--transition-fast)',
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: 4 }}>
                      {index < currentStage ? '✓' : stage.icon}
                    </div>
                    <div
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: index === currentStage ? 600 : 500,
                        color: index === currentStage ? 'var(--primary-mid)' : 'var(--text-muted)',
                      }}
                    >
                      {stage.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar for all stages */}
              <div
                style={{
                  height: 6,
                  background: 'var(--surface-subtle)',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${((currentStage * 33.33) + (getProgress() / 3))}%`,
                    background: 'linear-gradient(135deg, var(--primary-gradient-start), var(--primary-gradient-end))',
                    transition: 'width 1s linear',
                  }}
                />
              </div>
            </div>

            {/* Current Stage Display */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>
                {isComplete ? 'Activity Complete!' : STAGES[currentStage].name}
              </div>
              <div
                style={{
                  fontSize: '5rem',
                  fontWeight: 700,
                  color: timeLeft === 0 && !isComplete ? '#10b981' : 'var(--text-main)',
                  fontVariantNumeric: 'tabular-nums',
                  letterSpacing: '-0.02em',
                }}
              >
                {isComplete ? '✓' : formatTime(timeLeft)}
              </div>
            </div>

            {timeLeft === 0 && !isComplete && (
              <div
                style={{
                  marginBottom: 24,
                  padding: '12px 20px',
                  background: '#d1fae5',
                  color: '#065f46',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                {currentStage < 2 ? 'Stage complete! Ready for next stage?' : 'All stages complete!'}
              </div>
            )}

            {/* Controls */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              {!isComplete && (
                <>
                  {isRunning ? (
                    <Button onClick={handlePause} variant="secondary" size="large">
                      Pause
                    </Button>
                  ) : timeLeft > 0 ? (
                    <Button onClick={handleResume} size="large">
                      Resume
                    </Button>
                  ) : currentStage < 2 ? (
                    <Button onClick={advanceStage} size="large">
                      Next Stage
                    </Button>
                  ) : null}

                  {currentStage < 2 && timeLeft > 0 && (
                    <Button onClick={handleSkip} variant="secondary" size="large">
                      Skip to Next
                    </Button>
                  )}
                </>
              )}

              <Button onClick={handleReset} variant="secondary" size="large">
                {isComplete ? 'New Activity' : 'Reset'}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
