'use client';

import { useState } from 'react';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface DieResult {
  id: number;
  value: number;
  max: number;
}

const DICE_TYPES = [
  { sides: 4, label: 'd4' },
  { sides: 6, label: 'd6' },
  { sides: 8, label: 'd8' },
  { sides: 10, label: 'd10' },
  { sides: 12, label: 'd12' },
  { sides: 20, label: 'd20' },
  { sides: 100, label: 'd100' },
];

export default function DiceRollerPage() {
  const [results, setResults] = useState<DieResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = (sides: number, count: number = 1) => {
    setIsRolling(true);

    // Animate rolling
    let animationCount = 0;
    const interval = setInterval(() => {
      const tempResults: DieResult[] = [];
      for (let i = 0; i < count; i++) {
        tempResults.push({
          id: i,
          value: Math.floor(Math.random() * sides) + 1,
          max: sides,
        });
      }
      setResults(tempResults);
      animationCount++;

      if (animationCount > 10) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 50);
  };

  const getTotalScore = () => {
    return results.reduce((sum, die) => sum + die.value, 0);
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <ToolLayout
      title="Dice Roller"
      description="Roll multiple dice types (d4, d6, d20, custom)."
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Results Display */}
        {results.length > 0 && (
          <Card padding="large" style={{ marginBottom: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 20 }}>
                {results.map((die) => (
                  <div
                    key={die.id}
                    style={{
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, var(--primary-gradient-start), var(--primary-gradient-end))',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 700,
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-md)',
                      position: 'relative',
                    }}
                  >
                    {die.value}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 4,
                        right: 6,
                        fontSize: '0.75rem',
                        opacity: 0.8,
                      }}
                    >
                      d{die.max}
                    </div>
                  </div>
                ))}
              </div>

              {results.length > 1 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    Total
                  </div>
                  <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary-mid)' }}>
                    {getTotalScore()}
                  </div>
                </div>
              )}

              <Button onClick={clearResults} variant="secondary" size="small">
                Clear Results
              </Button>
            </div>
          </Card>
        )}

        {/* Standard Dice */}
        <Card padding="large">
          <h3 style={{ margin: '0 0 20px', fontSize: '1.25rem', fontWeight: 600 }}>
            Standard Dice
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12 }}>
            {DICE_TYPES.map((die) => (
              <button
                key={die.sides}
                onClick={() => rollDice(die.sides, 1)}
                disabled={isRolling}
                style={{
                  padding: '20px 12px',
                  background: 'var(--surface-base)',
                  border: '2px solid var(--border-muted)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  cursor: isRolling ? 'not-allowed' : 'pointer',
                  transition: 'all var(--transition-fast)',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  if (!isRolling) {
                    e.currentTarget.style.borderColor = 'var(--primary-mid)';
                    e.currentTarget.style.background = 'var(--surface-subtle)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-muted)';
                  e.currentTarget.style.background = 'var(--surface-base)';
                }}
              >
                {die.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Multiple Dice */}
        <Card padding="large" style={{ marginTop: 24 }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '1.25rem', fontWeight: 600 }}>
            Roll Multiple Dice
          </h3>

          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { count: 2, sides: 6, label: '2d6' },
              { count: 3, sides: 6, label: '3d6' },
              { count: 4, sides: 6, label: '4d6' },
              { count: 2, sides: 20, label: '2d20' },
              { count: 5, sides: 6, label: '5d6' },
              { count: 6, sides: 6, label: '6d6' },
            ].map((option) => (
              <Button
                key={option.label}
                onClick={() => rollDice(option.sides, option.count)}
                disabled={isRolling}
                variant="secondary"
                size="medium"
                style={{ justifyContent: 'flex-start' }}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Instructions */}
        <Card padding="medium" style={{ marginTop: 24, background: 'var(--surface-subtle)' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '0.9375rem', fontWeight: 600 }}>
            How to use
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            <li>Click any die type to roll a single die</li>
            <li>Use "Roll Multiple Dice" for common combinations</li>
            <li>When rolling multiple dice, the total is calculated automatically</li>
            <li>Great for games, random number generation, and probability lessons</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
}
