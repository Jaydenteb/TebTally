'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [canvasSize, setCanvasSize] = useState(300);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Handle responsive canvas sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Max size 400px, min size 250px, responsive to container
        const newSize = Math.min(400, Math.max(250, containerWidth - 40));
        setCanvasSize(newSize);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Draw wheel function
  const drawWheel = useCallback(() => {
    if (!canvasRef.current || segments.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
    ctx.scale(dpr, dpr);

    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    const radius = (canvasSize / 2) - 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

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
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text - scale font based on canvas size
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      const fontSize = Math.max(12, Math.floor(canvasSize / 25));
      ctx.font = `bold ${fontSize}px Inter, sans-serif`;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 3;

      // Truncate label if too long
      const maxLabelWidth = radius - 30;
      let label = segment.label;
      while (ctx.measureText(label).width > maxLabelWidth && label.length > 3) {
        label = label.slice(0, -1);
      }
      if (label !== segment.label) label += '…';

      ctx.fillText(label, radius - 15, 0);
      ctx.restore();
    });

    // Draw center circle - scale based on canvas size
    const centerRadius = Math.max(15, canvasSize / 20);
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#5a62ff';
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [segments, canvasSize]);

  // Draw wheel when segments or size changes
  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

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
    if (!soundEnabled) return;

    try {
      // Create a pleasant chime sound using Web Audio API
      const audioContext = new AudioContext();
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      // Connect oscillators to gain
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Create a pleasant chime with two harmonious frequencies
      oscillator1.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator2.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
      oscillator1.type = 'sine';
      oscillator2.type = 'sine';

      // Create fade in and fade out envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

      // Start and stop
      oscillator1.start(audioContext.currentTime);
      oscillator2.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + 1);
      oscillator2.stop(audioContext.currentTime + 1);

      // Cleanup
      setTimeout(() => {
        audioContext.close();
      }, 1100);
    } catch (err) {
      console.error('Failed to play sound:', err);
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

  // Calculate pointer size based on canvas size
  const pointerSize = Math.max(15, canvasSize / 20);

  return (
    <ToolLayout
      title="Wheel Spinner"
      description="Customizable spinning wheel for random selection."
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Wheel Display */}
        <Card padding="large">
          <div ref={containerRef} style={{ textAlign: 'center' }}>
            {/* Wheel Container */}
            <div
              style={{
                position: 'relative',
                width: canvasSize,
                height: canvasSize,
                margin: '0 auto 24px',
              }}
            >
              {/* Pointer */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: `${pointerSize}px solid transparent`,
                  borderRight: `${pointerSize}px solid transparent`,
                  borderTop: `${pointerSize * 2}px solid var(--primary-mid)`,
                  zIndex: 10,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                }}
              />

              {/* Wheel */}
              <div
                style={{
                  width: canvasSize,
                  height: canvasSize,
                  transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                <canvas
                  ref={canvasRef}
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
                  fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
                  fontWeight: 700,
                  wordBreak: 'break-word',
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

          {/* Add Segment - Responsive */}
          <div className="wheel-add-segment">
            <Input
              placeholder="Enter segment label"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSegment()}
              style={{ flex: 1, minWidth: 0 }}
            />
            <Button onClick={addSegment} disabled={!newLabel.trim()}>
              Add
            </Button>
          </div>

          {segments.length > 0 ? (
            <div style={{ display: 'grid', gap: 12 }}>
              {segments.map((segment) => (
                <div
                  key={segment.id}
                  className="wheel-segment-row"
                >
                  <div
                    className="wheel-segment-color"
                    style={{ background: segment.color }}
                  />
                  <input
                    type="text"
                    value={segment.label}
                    onChange={(e) => updateSegmentLabel(segment.id, e.target.value)}
                    className="wheel-segment-input"
                  />
                  <input
                    type="color"
                    value={segment.color}
                    onChange={(e) => updateSegmentColor(segment.id, e.target.value)}
                    className="wheel-segment-color-picker"
                  />
                  <button
                    onClick={() => removeSegment(segment.id)}
                    disabled={segments.length <= 2}
                    className="wheel-segment-delete"
                    aria-label="Remove segment"
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
            <li>Tap the color picker to change segment colors</li>
            <li>Edit segment labels directly in the list</li>
            <li>Tap "Spin the Wheel!" to make a random selection</li>
            <li>The pointer at the top shows the winning segment</li>
            <li>You must have at least 2 segments to spin</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
}
