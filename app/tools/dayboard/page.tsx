'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import PremiumCallout from '@/components/tools/PremiumCallout';
import LookingForMore from '@/components/tools/LookingForMore';
import { getStorageItem, setStorageItem } from '@/lib/storage';

interface ScheduleBlock {
  id: string;
  startTime: string;
  endTime: string;
  subject: string;
  icon: string;
}

const SUGGESTED_ICONS = ['📚', '✏️', '🔬', '🎨', '🎵', '⚽', '🍎', '📖', '🧮', '🌍', '💻', '🎭', '🏃', '🔔'];

export default function DayboardPage() {
  const [blocks, setBlocks] = useState<ScheduleBlock[]>([]);
  const [displayMode, setDisplayMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // New block form
  const [newBlock, setNewBlock] = useState({
    startTime: '',
    endTime: '',
    subject: '',
    icon: '📚'
  });

  // Load saved schedule
  useEffect(() => {
    const savedBlocks = getStorageItem<ScheduleBlock[]>('dayboard-schedule', []);
    setBlocks(savedBlocks);
  }, []);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle fullscreen for display mode
  useEffect(() => {
    if (displayMode) {
      document.documentElement.requestFullscreen?.();
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen?.();
      }
    }
  }, [displayMode]);

  const addBlock = () => {
    if (!newBlock.startTime || !newBlock.endTime || !newBlock.subject) {
      alert('Please fill in all fields');
      return;
    }

    const block: ScheduleBlock = {
      id: `${Date.now()}-${Math.random()}`,
      ...newBlock
    };

    const updatedBlocks = [...blocks, block].sort((a, b) =>
      a.startTime.localeCompare(b.startTime)
    );

    setBlocks(updatedBlocks);
    setStorageItem('dayboard-schedule', updatedBlocks);

    // Reset form
    setNewBlock({
      startTime: '',
      endTime: '',
      subject: '',
      icon: '📚'
    });
  };

  const removeBlock = (id: string) => {
    const updatedBlocks = blocks.filter(b => b.id !== id);
    setBlocks(updatedBlocks);
    setStorageItem('dayboard-schedule', updatedBlocks);
  };

  const clearSchedule = () => {
    if (confirm('Are you sure you want to clear the entire schedule?')) {
      setBlocks([]);
      setStorageItem('dayboard-schedule', []);
    }
  };

  const getCurrentBlock = () => {
    const now = currentTime.toTimeString().slice(0, 5);
    return blocks.find(block => now >= block.startTime && now < block.endTime);
  };

  const getNextBlock = () => {
    const now = currentTime.toTimeString().slice(0, 5);
    return blocks.find(block => now < block.startTime);
  };

  const getProgressPercentage = () => {
    if (blocks.length === 0) return 0;

    const now = currentTime.toTimeString().slice(0, 5);
    const firstBlock = blocks[0];
    const lastBlock = blocks[blocks.length - 1];

    if (now < firstBlock.startTime) return 0;
    if (now >= lastBlock.endTime) return 100;

    const currentBlock = getCurrentBlock();
    if (!currentBlock) return 0;

    const [startHour, startMin] = currentBlock.startTime.split(':').map(Number);
    const [endHour, endMin] = currentBlock.endTime.split(':').map(Number);
    const [nowHour, nowMin] = now.split(':').map(Number);

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const nowMinutes = nowHour * 60 + nowMin;

    return ((nowMinutes - startMinutes) / (endMinutes - startMinutes)) * 100;
  };

  const formatTime12h = (time24: string) => {
    const [hour, min] = time24.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${min.toString().padStart(2, '0')} ${period}`;
  };

  const currentBlock = getCurrentBlock();
  const nextBlock = getNextBlock();
  const progressPercentage = getProgressPercentage();

  const premiumApps = [
    {
      name: 'SpellTally',
      description: 'Engaging spelling practice with competitive gameplay.',
      url: process.env.NEXT_PUBLIC_SPELLTALLY_URL || 'http://localhost:3001',
      badge: 'Premium'
    },
    {
      name: 'TrackTally',
      description: 'Professional behaviour tracking and reporting.',
      url: process.env.NEXT_PUBLIC_TRACKTALLY_URL || 'http://localhost:3003',
      badge: 'Premium'
    },
    {
      name: 'WritingTally',
      description: 'Writing assessment made simple and effective.',
      url: process.env.NEXT_PUBLIC_WRITINGTALLY_URL || 'http://localhost:3002',
      badge: 'Premium'
    }
  ];

  // Display Mode (Full Screen TV View)
  if (displayMode) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        position: 'relative'
      }}>
        {/* Exit Display Mode Button */}
        <button
          onClick={() => setDisplayMode(false)}
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            padding: '0.5rem 1rem',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '2px solid white',
            borderRadius: 'var(--radius-md)',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.875rem',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          Exit Display Mode
        </button>

        {/* Clock */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            fontSize: '4rem',
            fontWeight: 700,
            color: 'white',
            textShadow: '0 4px 12px rgba(0,0,0,0.2)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div style={{
            fontSize: '1.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginTop: '0.5rem'
          }}>
            {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Current Block Highlight */}
        {currentBlock && (
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '5rem',
              marginBottom: '1rem'
            }}>
              {currentBlock.icon}
            </div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: 'var(--text-base)',
              marginBottom: '0.5rem'
            }}>
              {currentBlock.subject}
            </div>
            <div style={{
              fontSize: '1.5rem',
              color: 'var(--text-muted)'
            }}>
              {formatTime12h(currentBlock.startTime)} - {formatTime12h(currentBlock.endTime)}
            </div>

            {/* Progress Bar */}
            <div style={{
              marginTop: '1.5rem',
              background: 'var(--surface-subtle)',
              height: '12px',
              borderRadius: '999px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${progressPercentage}%`,
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                transition: 'width 1s linear',
                borderRadius: '999px'
              }} />
            </div>
          </div>
        )}

        {/* Schedule Overview */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: 'var(--text-base)'
          }}>
            Today's Schedule
          </h3>

          <div style={{
            display: 'grid',
            gap: '0.75rem'
          }}>
            {blocks.map(block => {
              const isCurrent = currentBlock?.id === block.id;
              const isPast = currentTime.toTimeString().slice(0, 5) >= block.endTime;

              return (
                <div
                  key={block.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: isCurrent
                      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))'
                      : isPast
                      ? 'var(--surface-subtle)'
                      : 'white',
                    borderRadius: 'var(--radius-md)',
                    border: isCurrent ? '3px solid #667eea' : '1px solid var(--border-muted)',
                    opacity: isPast && !isCurrent ? 0.5 : 1,
                    transform: isCurrent ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all var(--transition-normal)',
                    boxShadow: isCurrent ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '2.5rem' }}>
                    {block.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--text-base)'
                    }}>
                      {block.subject}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.25rem'
                    }}>
                      {formatTime12h(block.startTime)} - {formatTime12h(block.endTime)}
                    </div>
                  </div>
                  {isCurrent && (
                    <div style={{
                      padding: '0.5rem 1rem',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      borderRadius: '999px',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}>
                      NOW
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Up Preview */}
        {nextBlock && !currentBlock && (
          <div style={{
            marginTop: '1.5rem',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem'
            }}>
              Next Up
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '2rem' }}>{nextBlock.icon}</span>
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--text-base)'
                }}>
                  {nextBlock.subject}
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: 'var(--text-muted)'
                }}>
                  at {formatTime12h(nextBlock.startTime)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Planning Mode (Normal View)
  return (
    <ToolLayout
      title="Class Dayboard"
      description="Create and display your daily class schedule with live progress tracking."
    >
      <PremiumCallout
        title="Want Advanced Planning Features?"
        description="Upgrade to get weekly templates, drag-and-drop scheduling, special events, and PDF exports."
        appName="TebTally Pro"
        appUrl="#"
        badge="Coming Soon"
      />

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* Add Schedule Block */}
        <Card padding="large">
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            Add Schedule Block
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <Input
              type="time"
              label="Start Time"
              value={newBlock.startTime}
              onChange={(e) => setNewBlock({ ...newBlock, startTime: e.target.value })}
            />

            <Input
              type="time"
              label="End Time"
              value={newBlock.endTime}
              onChange={(e) => setNewBlock({ ...newBlock, endTime: e.target.value })}
            />

            <Input
              type="text"
              label="Subject"
              value={newBlock.subject}
              onChange={(e) => setNewBlock({ ...newBlock, subject: e.target.value })}
              placeholder="e.g., Math, Reading, Science"
            />
          </div>

          {/* Icon Selector */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: '0.5rem',
              color: 'var(--text-base)'
            }}>
              Icon
            </label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {SUGGESTED_ICONS.map(icon => (
                <button
                  key={icon}
                  onClick={() => setNewBlock({ ...newBlock, icon })}
                  style={{
                    fontSize: '1.5rem',
                    padding: '0.5rem',
                    background: newBlock.icon === icon
                      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))'
                      : 'var(--surface-subtle)',
                    border: newBlock.icon === icon ? '2px solid #667eea' : '1px solid var(--border-muted)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    if (newBlock.icon !== icon) {
                      e.currentTarget.style.background = 'var(--surface-base)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (newBlock.icon !== icon) {
                      e.currentTarget.style.background = 'var(--surface-subtle)';
                    }
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            size="large"
            onClick={addBlock}
          >
            Add Block
          </Button>
        </Card>

        {/* Current Schedule */}
        {blocks.length > 0 && (
          <Card padding="large" style={{ marginTop: '1.5rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
                Today's Schedule ({blocks.length} blocks)
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                  variant="primary"
                  onClick={() => setDisplayMode(true)}
                >
                  📺 Display Mode
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  onClick={clearSchedule}
                >
                  Clear All
                </Button>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {blocks.map(block => {
                const isCurrent = currentBlock?.id === block.id;
                const isPast = currentTime.toTimeString().slice(0, 5) >= block.endTime;

                return (
                  <div
                    key={block.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: isCurrent
                        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))'
                        : 'var(--surface-subtle)',
                      borderRadius: 'var(--radius-md)',
                      border: isCurrent ? '2px solid #667eea' : '1px solid transparent',
                      opacity: isPast && !isCurrent ? 0.6 : 1
                    }}
                  >
                    <div style={{ fontSize: '2rem' }}>
                      {block.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: 'var(--text-base)'
                      }}>
                        {block.subject}
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.25rem'
                      }}>
                        {formatTime12h(block.startTime)} - {formatTime12h(block.endTime)}
                      </div>
                    </div>
                    {isCurrent && (
                      <div style={{
                        padding: '0.25rem 0.75rem',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        NOW
                      </div>
                    )}
                    <button
                      onClick={() => removeBlock(block.id)}
                      style={{
                        padding: '0.5rem',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '1.25rem',
                        transition: 'color var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#ef4444';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-muted)';
                      }}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {blocks.length === 0 && (
          <Card padding="large" style={{ marginTop: '1.5rem' }}>
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: 'var(--text-muted)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
              <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                No schedule blocks yet
              </p>
              <p>Add your first block to get started!</p>
            </div>
          </Card>
        )}
      </div>

      <LookingForMore apps={premiumApps} />
    </ToolLayout>
  );
}
