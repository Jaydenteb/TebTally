'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Slider from '@/components/ui/Slider';
import PremiumCallout from '@/components/tools/PremiumCallout';
import LookingForMore from '@/components/tools/LookingForMore';
import { getStorageItem, setStorageItem } from '@/lib/storage';

interface EnergyLog {
  id: string;
  timestamp: number;
  level: number;
  date: string;
}

const ENERGY_LABELS = [
  { min: 1, max: 2, label: 'Very Low', emoji: '😴', color: '#6B7280' },
  { min: 3, max: 4, label: 'Low', emoji: '😐', color: '#3B82F6' },
  { min: 5, max: 6, label: 'Moderate', emoji: '🙂', color: '#10B981' },
  { min: 7, max: 8, label: 'High', emoji: '😊', color: '#F59E0B' },
  { min: 9, max: 10, label: 'Very High', emoji: '🤩', color: '#EF4444' }
];

export default function EnergyDialPage() {
  const [currentEnergy, setCurrentEnergy] = useState(5);
  const [logs, setLogs] = useState<EnergyLog[]>([]);
  const [viewMode, setViewMode] = useState<'current' | 'history'>('current');

  useEffect(() => {
    const savedLogs = getStorageItem<EnergyLog[]>('energy-dial-logs', []);
    setLogs(savedLogs);
  }, []);

  const getEnergyInfo = (level: number) => {
    return ENERGY_LABELS.find(l => level >= l.min && level <= l.max) || ENERGY_LABELS[2];
  };

  const logEnergy = () => {
    const now = new Date();
    const newLog: EnergyLog = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      level: currentEnergy,
      date: now.toISOString().split('T')[0]
    };

    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    setStorageItem('energy-dial-logs', updatedLogs);
  };

  const clearLogs = () => {
    if (confirm('Are you sure you want to clear all energy logs?')) {
      setLogs([]);
      setStorageItem('energy-dial-logs', []);
    }
  };

  const getWeeklyData = () => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weekLogs = logs.filter(log => log.timestamp >= weekAgo.getTime());

    // Group by day
    const groupedByDay: { [key: string]: EnergyLog[] } = {};
    weekLogs.forEach(log => {
      if (!groupedByDay[log.date]) {
        groupedByDay[log.date] = [];
      }
      groupedByDay[log.date].push(log);
    });

    return groupedByDay;
  };

  const getTodayLogs = () => {
    const today = new Date().toISOString().split('T')[0];
    return logs.filter(log => log.date === today);
  };

  const getAverageEnergy = (dayLogs: EnergyLog[]) => {
    if (dayLogs.length === 0) return 0;
    const sum = dayLogs.reduce((acc, log) => acc + log.level, 0);
    return Math.round(sum / dayLogs.length);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const currentEnergyInfo = getEnergyInfo(currentEnergy);
  const todayLogs = getTodayLogs();
  const weeklyData = getWeeklyData();

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

  return (
    <ToolLayout
      title="Energy Dial"
      description="Monitor and track your classroom's energy levels throughout the day."
    >
      <PremiumCallout
        title="Want Comprehensive Behaviour Tracking?"
        description="TrackTally offers professional behaviour management with detailed analytics and reporting."
        appName="TrackTally"
        appUrl={process.env.NEXT_PUBLIC_TRACKTALLY_URL || 'http://localhost:3003'}
        badge="Premium"
      />

      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* View Mode Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          borderBottom: '2px solid var(--surface-subtle)'
        }}>
          <button
            onClick={() => setViewMode('current')}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: viewMode === 'current' ? '2px solid var(--primary-mid)' : '2px solid transparent',
              color: viewMode === 'current' ? 'var(--primary-mid)' : 'var(--text-muted)',
              fontWeight: viewMode === 'current' ? 600 : 400,
              cursor: 'pointer',
              fontSize: '1rem',
              marginBottom: '-2px',
              transition: 'all var(--transition-fast)'
            }}
          >
            Current Energy
          </button>
          <button
            onClick={() => setViewMode('history')}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: viewMode === 'history' ? '2px solid var(--primary-mid)' : '2px solid transparent',
              color: viewMode === 'history' ? 'var(--primary-mid)' : 'var(--text-muted)',
              fontWeight: viewMode === 'history' ? 600 : 400,
              cursor: 'pointer',
              fontSize: '1rem',
              marginBottom: '-2px',
              transition: 'all var(--transition-fast)'
            }}
          >
            History ({logs.length})
          </button>
        </div>

        {viewMode === 'current' ? (
          <>
            {/* Current Energy Display */}
            <Card padding="large">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                  fontSize: '5rem',
                  marginBottom: '0.5rem',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
                }}>
                  {currentEnergyInfo.emoji}
                </div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: currentEnergyInfo.color,
                  marginBottom: '0.25rem'
                }}>
                  {currentEnergyInfo.label}
                </h2>
                <p style={{
                  fontSize: '1.125rem',
                  color: 'var(--text-muted)',
                  marginBottom: '2rem'
                }}>
                  Energy Level: {currentEnergy}/10
                </p>

                <Slider
                  min={1}
                  max={10}
                  value={currentEnergy}
                  onChange={(e) => setCurrentEnergy(Number(e.target.value))}
                  showValue={false}
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <Button
                  variant="primary"
                  size="large"
                  onClick={logEnergy}
                >
                  Log Current Energy
                </Button>
              </div>
            </Card>

            {/* Today's Logs */}
            {todayLogs.length > 0 && (
              <Card padding="large" style={{ marginTop: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                    Today's Energy Logs
                  </h3>
                  <span style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem'
                  }}>
                    Average: {getAverageEnergy(todayLogs)}/10
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gap: '0.75rem'
                }}>
                  {todayLogs.slice(-5).reverse().map(log => {
                    const info = getEnergyInfo(log.level);
                    return (
                      <div
                        key={log.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '0.75rem',
                          background: 'var(--surface-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          borderLeft: `4px solid ${info.color}`
                        }}
                      >
                        <span style={{ fontSize: '1.5rem' }}>{info.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 500, color: info.color }}>
                            {info.label}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            {formatTime(log.timestamp)}
                          </div>
                        </div>
                        <div style={{
                          fontWeight: 700,
                          fontSize: '1.25rem',
                          color: info.color
                        }}>
                          {log.level}/10
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </>
        ) : (
          <>
            {/* Weekly History */}
            <Card padding="large">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  Last 7 Days
                </h3>
                {logs.length > 0 && (
                  <Button
                    variant="danger"
                    size="small"
                    onClick={clearLogs}
                  >
                    Clear All Logs
                  </Button>
                )}
              </div>

              {Object.keys(weeklyData).length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem 1rem',
                  color: 'var(--text-muted)'
                }}>
                  <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                    No energy logs yet
                  </p>
                  <p>Start logging your classroom energy to see patterns over time!</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {Object.entries(weeklyData)
                    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
                    .map(([date, dayLogs]) => {
                      const avgEnergy = getAverageEnergy(dayLogs);
                      const avgInfo = getEnergyInfo(avgEnergy);

                      return (
                        <div
                          key={date}
                          style={{
                            padding: '1rem',
                            background: 'var(--surface-subtle)',
                            borderRadius: 'var(--radius-md)',
                            borderLeft: `4px solid ${avgInfo.color}`
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.75rem'
                          }}>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '1rem' }}>
                                {formatDate(date)}
                              </div>
                              <div style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-muted)',
                                marginTop: '0.25rem'
                              }}>
                                {dayLogs.length} log{dayLogs.length !== 1 ? 's' : ''}
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}>
                              <span style={{ fontSize: '1.5rem' }}>{avgInfo.emoji}</span>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{
                                  fontWeight: 700,
                                  fontSize: '1.25rem',
                                  color: avgInfo.color
                                }}>
                                  {avgEnergy}/10
                                </div>
                                <div style={{
                                  fontSize: '0.75rem',
                                  color: 'var(--text-muted)'
                                }}>
                                  Average
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Visual timeline */}
                          <div style={{
                            display: 'flex',
                            gap: '0.25rem',
                            height: '4px',
                            borderRadius: '2px',
                            overflow: 'hidden',
                            background: '#e5e7eb'
                          }}>
                            {dayLogs.map(log => {
                              const info = getEnergyInfo(log.level);
                              return (
                                <div
                                  key={log.id}
                                  style={{
                                    flex: 1,
                                    background: info.color,
                                    transition: 'all var(--transition-fast)'
                                  }}
                                  title={`${formatTime(log.timestamp)}: ${info.label} (${log.level}/10)`}
                                />
                              );
                            })}
                          </div>

                          {/* Individual logs */}
                          <div style={{
                            display: 'grid',
                            gap: '0.5rem',
                            marginTop: '0.75rem',
                            fontSize: '0.875rem'
                          }}>
                            {dayLogs.map(log => {
                              const info = getEnergyInfo(log.level);
                              return (
                                <div
                                  key={log.id}
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.5rem',
                                    background: '#ffffff',
                                    borderRadius: 'var(--radius-sm)'
                                  }}
                                >
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                  }}>
                                    <span>{info.emoji}</span>
                                    <span style={{ color: 'var(--text-muted)' }}>
                                      {formatTime(log.timestamp)}
                                    </span>
                                  </div>
                                  <span style={{
                                    fontWeight: 600,
                                    color: info.color
                                  }}>
                                    {log.level}/10
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </Card>
          </>
        )}
      </div>

      <LookingForMore apps={premiumApps} />
    </ToolLayout>
  );
}
