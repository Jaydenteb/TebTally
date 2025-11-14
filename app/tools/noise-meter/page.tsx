'use client';

import { useState, useEffect, useRef } from 'react';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import Toggle from '@/components/ui/Toggle';
import { getStorageItem, setStorageItem } from '@/lib/storage';

export default function NoiseMeterPage() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [threshold, setThreshold] = useState(70);
  const [showAlert, setShowAlert] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastAlertTimeRef = useRef<number>(0);

  // Load settings
  useEffect(() => {
    const savedThreshold = getStorageItem<number>('noise-meter-threshold', 70);
    const savedSound = getStorageItem<boolean>('noise-meter-sound', true);
    setThreshold(savedThreshold);
    setSoundEnabled(savedSound);
  }, []);

  // Save settings
  useEffect(() => {
    setStorageItem('noise-meter-threshold', threshold);
  }, [threshold]);

  useEffect(() => {
    setStorageItem('noise-meter-sound', soundEnabled);
  }, [soundEnabled]);

  const startMonitoring = async () => {
    try {
      setError(null);

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Create audio context
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const microphone = audioContext.createMediaStreamSource(stream);
      microphoneRef.current = microphone;
      microphone.connect(analyser);

      setIsMonitoring(true);
      measureNoise();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Unable to access microphone. Please allow microphone access and try again.');
    }
  };

  const stopMonitoring = () => {
    // Stop animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Stop microphone stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    setIsMonitoring(false);
    setNoiseLevel(0);
    setShowAlert(false);
  };

  const measureNoise = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate average volume
    const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const normalized = Math.min(100, (average / 128) * 100);

    setNoiseLevel(normalized);

    // Check threshold
    const now = Date.now();
    if (normalized > threshold) {
      if (!showAlert) {
        setShowAlert(true);
      }
      // Play alert every 2 seconds while over threshold
      if (now - lastAlertTimeRef.current > 2000) {
        playAlert();
        lastAlertTimeRef.current = now;
      }
    } else {
      if (showAlert) {
        setShowAlert(false);
        lastAlertTimeRef.current = 0;
      }
    }

    animationFrameRef.current = requestAnimationFrame(measureNoise);
  };

  const playAlert = () => {
    if (!soundEnabled) return;

    try {
      // Create an attention-grabbing alert sound using Web Audio API
      const alertContext = new AudioContext();
      const oscillator = alertContext.createOscillator();
      const gainNode = alertContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(alertContext.destination);

      // Create an alert tone (higher frequency for attention)
      oscillator.frequency.setValueAtTime(800, alertContext.currentTime); // High alert tone
      oscillator.type = 'sine';

      // Create a beep pattern with envelope
      gainNode.gain.setValueAtTime(0, alertContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, alertContext.currentTime + 0.02);
      gainNode.gain.linearRampToValueAtTime(0, alertContext.currentTime + 0.15);

      oscillator.start(alertContext.currentTime);
      oscillator.stop(alertContext.currentTime + 0.15);

      // Cleanup
      setTimeout(() => {
        alertContext.close();
      }, 200);
    } catch (err) {
      console.error('Failed to play alert:', err);
    }
  };

  useEffect(() => {
    return () => {
      stopMonitoring();
    };
  }, []);

  const getColor = () => {
    if (noiseLevel < 30) return '#10b981'; // Green
    if (noiseLevel < 60) return '#f59e0b'; // Yellow
    if (noiseLevel < threshold) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const getStatus = () => {
    if (noiseLevel < 30) return 'Quiet 😊';
    if (noiseLevel < 60) return 'Acceptable 👍';
    if (noiseLevel < threshold) return 'Getting Loud 🔊';
    return 'TOO LOUD! 🚨';
  };

  return (
    <ToolLayout
      title="Noise Meter"
      description="Monitor classroom noise levels with visual feedback."
    >
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {/* Noise Display */}
        <Card padding="large">
          <div style={{ textAlign: 'center' }}>
            {/* Circular Meter */}
            <div style={{ position: 'relative', width: 300, height: 300, margin: '0 auto 24px' }}>
              <svg width="300" height="300" style={{ transform: 'rotate(-90deg)' }}>
                {/* Background circle */}
                <circle
                  cx="150"
                  cy="150"
                  r="130"
                  fill="none"
                  stroke="var(--surface-subtle)"
                  strokeWidth="20"
                />
                {/* Progress circle */}
                <circle
                  cx="150"
                  cy="150"
                  r="130"
                  fill="none"
                  stroke={showAlert ? '#ef4444' : getColor()}
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 130}`}
                  strokeDashoffset={`${2 * Math.PI * 130 * (1 - noiseLevel / 100)}`}
                  style={{ transition: 'stroke-dashoffset 0.1s linear, stroke 0.3s ease' }}
                />
              </svg>

              {/* Center text */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: showAlert ? '#ef4444' : getColor(),
                    marginBottom: 8,
                  }}
                >
                  {Math.round(noiseLevel)}
                </div>
                <div style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                  Noise Level
                </div>
              </div>
            </div>

            {/* Status */}
            <div
              style={{
                padding: '16px 24px',
                background: showAlert ? '#fef2f2' : 'var(--surface-subtle)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: showAlert ? '#ef4444' : getColor(),
                marginBottom: 24,
              }}
            >
              {getStatus()}
            </div>

            {/* Controls */}
            {error && (
              <div
                style={{
                  marginBottom: 16,
                  padding: '12px 16px',
                  background: '#fef2f2',
                  color: '#991b1b',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9375rem',
                }}
              >
                {error}
              </div>
            )}

            <Button
              onClick={isMonitoring ? stopMonitoring : startMonitoring}
              size="large"
              variant={isMonitoring ? 'danger' : 'primary'}
              style={{ width: '100%', maxWidth: 300 }}
            >
              {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
            </Button>
          </div>
        </Card>

        {/* Settings */}
        <Card padding="large" style={{ marginTop: 24 }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '1.125rem', fontWeight: 600 }}>
            Settings
          </h3>

          <div style={{ marginBottom: 20 }}>
            <Slider
              label="Alert Threshold"
              min={30}
              max={100}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              valueFormatter={(value) => `${value}%`}
            />
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 8 }}>
              Alert will trigger when noise exceeds this level
            </div>
          </div>

          <Toggle
            label="Enable alert sound"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
          />
        </Card>

        {/* Privacy Notice */}
        <Card padding="medium" style={{ marginTop: 24, background: '#eff6ff' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '0.9375rem', fontWeight: 600, color: '#1e40af' }}>
            Privacy Notice
          </h4>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#1e40af' }}>
            This tool only measures noise levels locally in your browser. No audio is recorded or
            transmitted. Your microphone access is only used for real-time volume measurement.
          </p>
        </Card>

        {/* Instructions */}
        <Card padding="medium" style={{ marginTop: 16, background: 'var(--surface-subtle)' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '0.9375rem', fontWeight: 600 }}>
            How to use
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            <li>Click "Start Monitoring" and allow microphone access</li>
            <li>The meter shows real-time noise levels from 0-100</li>
            <li>Set a threshold - the meter turns red when exceeded</li>
            <li>Use it to help students maintain appropriate volume levels</li>
            <li>Great for group work, independent reading, or test-taking</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
}
