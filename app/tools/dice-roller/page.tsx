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
            Roll Single Die
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
            {DICE_TYPES.map((die) => (
              <button
                key={die.sides}
                onClick={() => rollDice(die.sides, 1)}
                disabled={isRolling}
                className="dice-button"
                style={{
                  padding: '24px 16px',
                  background: 'linear-gradient(135deg, var(--surface-base), var(--surface-subtle))',
                  border: '2px solid var(--border-muted)',
                  borderRadius: 'var(--radius-lg)',
                  cursor: isRolling ? 'not-allowed' : 'pointer',
                  transition: 'all var(--transition-fast)',
                  fontFamily: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  if (!isRolling) {
                    e.currentTarget.style.borderColor = 'var(--primary-mid)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-muted)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  lineHeight: 1,
                }}>
                  🎲
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--primary-mid)',
                }}>
                  {die.label}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                }}>
                  1-{die.sides}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Multiple Dice */}
        <Card padding="large" style={{ marginTop: 24 }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '1.25rem', fontWeight: 600 }}>
            Common Combinations
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            {[
              { count: 2, sides: 6, label: '2d6', desc: 'Two 6-sided' },
              { count: 3, sides: 6, label: '3d6', desc: 'Three 6-sided' },
              { count: 4, sides: 6, label: '4d6', desc: 'Four 6-sided' },
              { count: 2, sides: 20, label: '2d20', desc: 'Two 20-sided' },
              { count: 5, sides: 6, label: '5d6', desc: 'Five 6-sided' },
              { count: 6, sides: 6, label: '6d6', desc: 'Six 6-sided' },
            ].map((option) => (
              <button
                key={option.label}
                onClick={() => rollDice(option.sides, option.count)}
                disabled={isRolling}
                style={{
                  padding: '16px 12px',
                  background: 'var(--surface-base)',
                  border: '1px solid var(--border-muted)',
                  borderRadius: 'var(--radius-md)',
                  cursor: isRolling ? 'not-allowed' : 'pointer',
                  transition: 'all var(--transition-fast)',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  if (!isRolling) {
                    e.currentTarget.style.background = 'var(--surface-subtle)';
                    e.currentTarget.style.borderColor = 'var(--primary-mid)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--surface-base)';
                  e.currentTarget.style.borderColor = 'var(--border-muted)';
                }}
              >
                <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: 4 }}>
                  {option.label}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {option.desc}
                </div>
              </button>
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
