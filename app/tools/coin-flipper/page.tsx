'use client';

import { useState } from 'react';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CoinFlipperPage() {
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [history, setHistory] = useState<('heads' | 'tails')[]>([]);
  const [flipCount, setFlipCount] = useState(0);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);

    // Animate flipping
    let count = 0;
    const interval = setInterval(() => {
      setResult(Math.random() > 0.5 ? 'heads' : 'tails');
      count++;

      if (count > 10) {
        clearInterval(interval);
        const finalResult = Math.random() > 0.5 ? 'heads' : 'tails';
        setResult(finalResult);
        setHistory([finalResult, ...history]);
        setFlipCount(flipCount + 1);
        setIsFlipping(false);
      }
    }, 100);
  };

  const clearHistory = () => {
    setHistory([]);
    setFlipCount(0);
    setResult(null);
  };

  const headsCount = history.filter(r => r === 'heads').length;
  const tailsCount = history.filter(r => r === 'tails').length;

  return (
    <ToolLayout
      title="Coin Flipper"
      description="Simple heads or tails coin flip."
    >
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {/* Coin Display */}
        <Card padding="large">
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 250,
                height: 250,
                margin: '0 auto 32px',
                borderRadius: '50%',
                background: result === 'heads'
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                  : result === 'tails'
                  ? 'linear-gradient(135deg, #6b7280, #4b5563)'
                  : 'linear-gradient(135deg, var(--surface-muted), var(--surface-subtle))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                fontWeight: 700,
                color: result ? 'white' : 'var(--text-muted)',
                boxShadow: 'var(--shadow-lg)',
                border: '8px solid var(--surface-base)',
                transition: 'all 0.3s ease',
                transform: isFlipping ? 'rotateY(360deg)' : 'rotateY(0deg)',
              }}
            >
              {result === 'heads' ? '👑' : result === 'tails' ? '🌟' : '?'}
            </div>

            {result && !isFlipping && (
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: 24,
                  color: 'var(--primary-mid)',
                  textTransform: 'capitalize',
                }}
              >
                {result}!
              </div>
            )}

            <Button
              onClick={flipCoin}
              disabled={isFlipping}
              size="large"
              style={{ width: '100%', maxWidth: 300 }}
            >
              {isFlipping ? 'Flipping...' : 'Flip Coin'}
            </Button>
          </div>
        </Card>

        {/* Statistics */}
        {history.length > 0 && (
          <Card padding="large" style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
                Statistics
              </h3>
              <Button onClick={clearHistory} variant="secondary" size="small">
                Clear History
              </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div
                style={{
                  padding: 20,
                  background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#92400e', marginBottom: 4 }}>
                  👑 Heads
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#78350f' }}>
                  {headsCount}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#92400e' }}>
                  {history.length > 0 ? Math.round((headsCount / history.length) * 100) : 0}%
                </div>
              </div>

              <div
                style={{
                  padding: 20,
                  background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>
                  🌟 Tails
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#111827' }}>
                  {tailsCount}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                  {history.length > 0 ? Math.round((tailsCount / history.length) * 100) : 0}%
                </div>
              </div>
            </div>

            {/* Recent History */}
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 8, color: 'var(--text-muted)' }}>
                Recent Flips ({Math.min(history.length, 20)} of {history.length})
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {history.slice(0, 20).map((flip, index) => (
                  <div
                    key={index}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: flip === 'heads'
                        ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                        : 'linear-gradient(135deg, #6b7280, #4b5563)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                    }}
                    title={flip}
                  >
                    {flip === 'heads' ? '👑' : '🌟'}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Instructions */}
        <Card padding="medium" style={{ marginTop: 24, background: 'var(--surface-subtle)' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '0.9375rem', fontWeight: 600 }}>
            How to use
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            <li>Click "Flip Coin" for a 50/50 random result</li>
            <li>👑 Heads or 🌟 Tails - perfectly fair chance</li>
            <li>Statistics track all flips in your session</li>
            <li>Use "Clear History" to reset and start fresh</li>
            <li>Perfect for making decisions, settling disputes, or teaching probability</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
}
