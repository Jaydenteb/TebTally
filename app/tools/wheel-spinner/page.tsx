'use client';

import { useState, useEffect, useRef } from 'react';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Toggle from '@/components/ui/Toggle';
import { getStorageItem, setStorageItem } from '@/lib/storage';

interface Segment {
  id: string;
  label: string;
  color: string;
}

const PRESET_COLORS = [
  '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6',
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
];

export default function WheelSpinnerPage() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [newLabel, setNewLabel] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load segments
  useEffect(() => {
    const saved = getStorageItem<Segment[]>('wheel-spinner-segments', [
      { id: '1', label: 'Option 1', color: PRESET_COLORS[0] },
      { id: '2', label: 'Option 2', color: PRESET_COLORS[1] },
      { id: '3', label: 'Option 3', color: PRESET_COLORS[2] },
      { id: '4', label: 'Option 4', color: PRESET_COLORS[3] },
    ]);
    setSegments(saved);

    const savedSound = getStorageItem<boolean>('wheel-spinner-sound', true);
    setSoundEnabled(savedSound);
  }, []);

  // Save segments
  useEffect(() => {
    setStorageItem('wheel-spinner-segments', segments);
  }, [segments]);

  // Save sound setting
  useEffect(() => {
    setStorageItem('wheel-spinner-sound', soundEnabled);
  }, [soundEnabled]);

  // Draw wheel
  useEffect(() => {
    if (!canvasRef.current || segments.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw segments
    const anglePerSegment = (2 * Math.PI) / segments.length;
    segments.forEach((segment, index) => {
      const startAngle = index * anglePerSegment;
      const endAngle = (index + 1) * anglePerSegment;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(segment.label, radius - 20, 0);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = 'var(--primary-mid)';
    ctx.lineWidth = 4;
    ctx.stroke();
  }, [segments]);

  const addSegment = () => {
    if (!newLabel.trim()) return;

    const newSegment: Segment = {
      id: Date.now().toString(),
      label: newLabel.trim(),
      color: PRESET_COLORS[segments.length % PRESET_COLORS.length],
    };

    setSegments([...segments, newSegment]);
    setNewLabel('');
  };

  const removeSegment = (id: string) => {
    if (segments.length <= 2) {
      alert('You must have at least 2 segments!');
      return;
    }
    setSegments(segments.filter(s => s.id !== id));
  };

  const updateSegmentLabel = (id: string, label: string) => {
    setSegments(segments.map(s => s.id === id ? { ...s, label } : s));
  };

  const updateSegmentColor = (id: string, color: string) => {
    setSegments(segments.map(s => s.id === id ? { ...s, color } : s));
  };

  const playSound = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error('Failed to play sound:', err);
      });
    }
  };

  const spin = () => {
    if (isSpinning || segments.length === 0) return;

    setIsSpinning(true);
    setResult(null);

    // Random spins (3-6 full rotations) + random final position
    const spins = 3 + Math.random() * 3;
    const finalRotation = spins * 360 + Math.random() * 360;
    const newRotation = rotation + finalRotation;

    setRotation(newRotation);

    // Determine winner
    setTimeout(() => {
      const normalizedRotation = newRotation % 360;
      const segmentAngle = 360 / segments.length;
      // Pointer is at top (270 degrees in canvas coordinates)
      // Calculate which segment is under the pointer
      const pointerPosition = 270;
      const originalAngle = (pointerPosition - normalizedRotation + 360) % 360;
      const winningIndex = Math.floor(originalAngle / segmentAngle) % segments.length;
      const winner = segments[winningIndex];

      setResult(winner.label);
      setIsSpinning(false);
      playSound();
    }, 4000);
  };

  return (
    <ToolLayout
      title="Wheel Spinner"
      description="Customizable spinning wheel for random selection."
    >
      {/* Audio element */}
      <audio
        ref={audioRef}
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKzn7q1gGgs+mtzyxnMlBCuAz/LXiTgIGWi68OScTgwNU6ni77BnHgY2jtv0y3osBSp3yPDdkUELFF608OmpVxQLRp/g8r9sIwYxh9H003w0Bh1tw/Dgl0cOD1Sq5++vYhsLPpzc8sZ0Jgcqf87y1os4CRllufDlnFANDlKo4u+zahwHNY3b88t8LQUrd8jw3JJCCxRct/Dqq1gWC0WeDvPAbSQGMIbR89R9Ng"
      />

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Wheel Display */}
        <Card padding="large">
          <div style={{ textAlign: 'center' }}>
            {/* Pointer */}
            <div
              style={{
                position: 'relative',
                width: 400,
                height: 400,
                margin: '0 auto 24px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '20px solid transparent',
                  borderRight: '20px solid transparent',
                  borderTop: '40px solid var(--primary-mid)',
                  zIndex: 10,
                }}
              />

              {/* Wheel */}
              <div
                style={{
                  width: 400,
                  height: 400,
                  transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={400}
                  style={{ display: 'block' }}
                />
              </div>
            </div>

            {result && !isSpinning && (
              <div
                style={{
                  marginBottom: 24,
                  padding: '16px 24px',
                  background: 'linear-gradient(135deg, var(--primary-gradient-start), var(--primary-gradient-end))',
                  color: 'white',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                }}
              >
                🎉 {result}
              </div>
            )}

            <Button
              onClick={spin}
              disabled={isSpinning || segments.length === 0}
              size="large"
              style={{ width: '100%', maxWidth: 300 }}
            >
              {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
            </Button>

            <div style={{ marginTop: 16 }}>
              <Toggle
                label="Enable sound"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
              />
            </div>
          </div>
        </Card>

        {/* Segments Management */}
        <Card padding="large" style={{ marginTop: 24 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '1.125rem', fontWeight: 600 }}>
            Customize Segments
          </h3>

          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <Input
              placeholder="Enter segment label"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSegment()}
              style={{ flex: 1 }}
            />
            <Button onClick={addSegment} disabled={!newLabel.trim()}>
              Add Segment
            </Button>
          </div>

          {segments.length > 0 ? (
            <div style={{ display: 'grid', gap: 12 }}>
              {segments.map((segment, index) => (
                <div
                  key={segment.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 120px 40px',
                    gap: 12,
                    alignItems: 'center',
                    padding: 12,
                    background: 'var(--surface-subtle)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: segment.color,
                      border: '2px solid var(--border-muted)',
                    }}
                  />
                  <input
                    type="text"
                    value={segment.label}
                    onChange={(e) => updateSegmentLabel(segment.id, e.target.value)}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid var(--border-muted)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'inherit',
                      fontSize: '1rem',
                      background: 'var(--surface-base)',
                    }}
                  />
                  <input
                    type="color"
                    value={segment.color}
                    onChange={(e) => updateSegmentColor(segment.id, e.target.value)}
                    style={{
                      width: '100%',
                      height: 36,
                      border: '1px solid var(--border-muted)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                    }}
                  />
                  <button
                    onClick={() => removeSegment(segment.id)}
                    disabled={segments.length <= 2}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: segments.length <= 2 ? 'var(--surface-subtle)' : 'var(--text-muted)',
                      cursor: segments.length <= 2 ? 'not-allowed' : 'pointer',
                      fontSize: '1.5rem',
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (segments.length > 2) e.currentTarget.style.color = '#ef4444';
                    }}
                    onMouseLeave={(e) => {
                      if (segments.length > 2) e.currentTarget.style.color = 'var(--text-muted)';
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
              Add at least 2 segments to use the wheel
            </div>
          )}
        </Card>

        {/* Instructions */}
        <Card padding="medium" style={{ marginTop: 24, background: 'var(--surface-subtle)' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '0.9375rem', fontWeight: 600 }}>
            How to use
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            <li>Add segments with custom labels (student names, activities, choices, etc.)</li>
            <li>Click on a segment's color circle to change its color</li>
            <li>Edit segment labels directly in the list</li>
            <li>Click "Spin the Wheel!" to make a random selection</li>
            <li>The pointer at the top shows the winning segment</li>
            <li>You must have at least 2 segments to spin</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
}
