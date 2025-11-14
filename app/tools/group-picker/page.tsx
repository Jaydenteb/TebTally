'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import PremiumCallout from '@/components/tools/PremiumCallout';
import LookingForMore from '@/components/tools/LookingForMore';
import { getStorageItem, setStorageItem, getSharedStudents, setSharedStudents, clearSharedStudents } from '@/lib/storage';

interface Student {
  id: string;
  name: string;
}

interface Group {
  id: number;
  students: Student[];
}

export default function GroupPickerPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [newName, setNewName] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupingMethod, setGroupingMethod] = useState<'numGroups' | 'groupSize'>('numGroups');
  const [numGroups, setNumGroups] = useState(4);
  const [groupSize, setGroupSize] = useState(3);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkNames, setBulkNames] = useState('');

  // Load students
  useEffect(() => {
    const saved = getStorageItem<Student[]>('group-picker-students', []);
    setStudents(saved);
  }, []);

  // Save students
  useEffect(() => {
    setStorageItem('group-picker-students', students);
  }, [students]);

  const addStudent = () => {
    if (!newName.trim()) return;
    const newStudent: Student = {
      id: Date.now().toString(),
      name: newName.trim(),
    };
    setStudents([...students, newStudent]);
    setNewName('');
  };

  const addBulkStudents = () => {
    const names = bulkNames
      .split('\n')
      .map(n => n.trim())
      .filter(n => n.length > 0);

    const newStudents: Student[] = names.map(name => ({
      id: `${Date.now()}-${Math.random()}`,
      name,
    }));

    setStudents([...students, ...newStudents]);
    setBulkNames('');
    setShowBulkModal(false);
  };

  const removeStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const loadFromShared = () => {
    const shared = getSharedStudents();
    if (shared.length === 0) {
      alert('No shared student list found. Save students first from any tool.');
      return;
    }

    if (students.length > 0) {
      if (!confirm('This will replace your current student list. Continue?')) {
        return;
      }
    }

    setStudents(shared);
    setGroups([]);
  };

  const saveToShared = () => {
    if (students.length === 0) {
      alert('Add some students first before saving.');
      return;
    }

    setSharedStudents(students);
    alert(`Saved ${students.length} students to shared list!`);
  };

  const clearShared = () => {
    if (confirm('This will clear the shared student list used by all tools. Continue?')) {
      clearSharedStudents();
      alert('Shared student list cleared!');
    }
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const createGroups = () => {
    if (students.length === 0) return;

    const shuffled = shuffleArray(students);
    const newGroups: Group[] = [];

    if (groupingMethod === 'numGroups') {
      const actualNumGroups = Math.min(numGroups, students.length);
      const baseSize = Math.floor(students.length / actualNumGroups);
      const remainder = students.length % actualNumGroups;

      let index = 0;
      for (let i = 0; i < actualNumGroups; i++) {
        const size = baseSize + (i < remainder ? 1 : 0);
        newGroups.push({
          id: i + 1,
          students: shuffled.slice(index, index + size),
        });
        index += size;
      }
    } else {
      // Group by size
      let index = 0;
      let groupId = 1;
      while (index < students.length) {
        newGroups.push({
          id: groupId++,
          students: shuffled.slice(index, index + groupSize),
        });
        index += groupSize;
      }
    }

    setGroups(newGroups);
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to remove all students?')) {
      setStudents([]);
      setGroups([]);
    }
  };

  const copyToClipboard = () => {
    const text = groups
      .map(group => {
        const members = group.students.map(s => s.name).join(', ');
        return `Group ${group.id}: ${members}`;
      })
      .join('\n');

    navigator.clipboard.writeText(text).then(() => {
      alert('Groups copied to clipboard!');
    });
  };

  const premiumApps = [
    {
      name: 'TrackTally',
      description: 'Fast, offline-friendly behaviour incident logging for classrooms.',
      url: process.env.NEXT_PUBLIC_TRACKTALLY_URL || 'http://localhost:3003',
      badge: 'Offline First',
    },
    {
      name: 'WritingTally',
      description: 'End-to-end writing assessments with rubrics and AI feedback.',
      url: process.env.NEXT_PUBLIC_WRITETALLY_URL || 'http://localhost:3002',
      badge: 'AI-Powered',
    },
  ];

  return (
    <ToolLayout
      title="Group Picker"
      description="Create random groups with balanced distribution."
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <PremiumCallout
          title="Need comprehensive student management?"
          description="WritingTally provides end-to-end writing assessments with rubrics, peer review, and AI-powered feedback."
          appName="WritingTally"
          appUrl={process.env.NEXT_PUBLIC_WRITETALLY_URL || 'http://localhost:3002'}
          badge="Premium"
        />

        {/* Setup Card */}
        <Card padding="large">
          <h3 style={{ margin: '0 0 20px', fontSize: '1.25rem', fontWeight: 600 }}>
            Manage Students
          </h3>

          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <Input
              placeholder="Enter student name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addStudent()}
              style={{ flex: 1 }}
            />
            <Button onClick={addStudent} disabled={!newName.trim()}>
              Add
            </Button>
            <Button onClick={() => setShowBulkModal(true)} variant="secondary">
              Add Multiple
            </Button>
          </div>

          {students.length > 0 && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  padding: 16,
                  background: 'var(--surface-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: 16,
                  maxHeight: 200,
                  overflowY: 'auto',
                }}
              >
                {students.map((student) => (
                  <div
                    key={student.id}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 12px',
                      background: 'var(--surface-base)',
                      border: '1px solid var(--border-muted)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.9375rem',
                    }}
                  >
                    {student.name}
                    <button
                      onClick={() => removeStudent(student.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        padding: 0,
                        lineHeight: 1,
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button onClick={loadFromShared} variant="secondary" size="small">
                  Load Shared List
                </Button>
                <Button onClick={saveToShared} variant="secondary" size="small">
                  Save to Shared
                </Button>
                <Button onClick={clearShared} variant="danger" size="small">
                  Clear Shared
                </Button>
                <div style={{ marginLeft: 'auto' }}>
                  <Button onClick={clearAll} variant="danger" size="small">
                    Clear All Students
                  </Button>
                </div>
              </div>
            </>
          )}

          {students.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
              No students added yet. Add students above to get started!
            </div>
          )}
        </Card>

        {/* Grouping Options */}
        {students.length > 0 && (
          <Card padding="large" style={{ marginTop: 24 }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '1.25rem', fontWeight: 600 }}>
              Group Settings
            </h3>

            <div style={{ marginBottom: 20 }}>
              <Select
                label="Grouping Method"
                value={groupingMethod}
                onChange={(e) => setGroupingMethod(e.target.value as 'numGroups' | 'groupSize')}
              >
                <option value="numGroups">Specify number of groups</option>
                <option value="groupSize">Specify students per group</option>
              </Select>
            </div>

            {groupingMethod === 'numGroups' ? (
              <div style={{ marginBottom: 20 }}>
                <Input
                  label="Number of Groups"
                  type="number"
                  min={1}
                  max={students.length}
                  value={numGroups}
                  onChange={(e) => setNumGroups(Number(e.target.value))}
                />
                <div style={{ marginTop: 8, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {students.length} students will be divided into {Math.min(numGroups, students.length)} groups
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: 20 }}>
                <Input
                  label="Students Per Group"
                  type="number"
                  min={1}
                  max={students.length}
                  value={groupSize}
                  onChange={(e) => setGroupSize(Number(e.target.value))}
                />
                <div style={{ marginTop: 8, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {students.length} students will create {Math.ceil(students.length / groupSize)} groups of {groupSize} students each
                </div>
              </div>
            )}

            <Button onClick={createGroups} size="large" style={{ width: '100%' }}>
              Create Random Groups
            </Button>
          </Card>
        )}

        {/* Groups Display */}
        {groups.length > 0 && (
          <Card padding="large" style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
                Groups
              </h3>
              <Button onClick={copyToClipboard} variant="secondary" size="small">
                Copy to Clipboard
              </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
              {groups.map((group) => (
                <div
                  key={group.id}
                  style={{
                    padding: 20,
                    background: 'var(--surface-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-muted)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: 'var(--primary-mid)',
                      marginBottom: 12,
                    }}
                  >
                    Group {group.id}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20, listStyle: 'disc' }}>
                    {group.students.map((student) => (
                      <li key={student.id} style={{ marginBottom: 6, color: 'var(--text-main)' }}>
                        {student.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Button
              onClick={createGroups}
              variant="secondary"
              size="medium"
              style={{ width: '100%', marginTop: 20 }}
            >
              Shuffle Again
            </Button>
          </Card>
        )}

        {/* Instructions */}
        <Card padding="medium" style={{ marginTop: 24, background: 'var(--surface-subtle)' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '0.9375rem', fontWeight: 600 }}>
            How to use
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            <li>Add all student names to your class list</li>
            <li>Choose to group by number of groups OR students per group</li>
            <li>Click "Create Random Groups" to generate balanced random groups</li>
            <li>Click "Shuffle Again" to create new groups with the same settings</li>
            <li>Use "Copy to Clipboard" to paste groups into another app</li>
          </ul>
        </Card>
      </div>

      {/* Bulk Add Modal */}
      <Modal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        title="Add Multiple Students"
        size="medium"
      >
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, fontSize: '0.9375rem' }}>
            Enter student names (one per line):
          </label>
          <textarea
            value={bulkNames}
            onChange={(e) => setBulkNames(e.target.value)}
            placeholder="Alice&#10;Bob&#10;Charlie&#10;Diana"
            rows={10}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid var(--border-muted)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'inherit',
              fontSize: '1rem',
              resize: 'vertical',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <Button onClick={() => setShowBulkModal(false)} variant="secondary">
            Cancel
          </Button>
          <Button onClick={addBulkStudents} disabled={!bulkNames.trim()}>
            Add Students
          </Button>
        </div>
      </Modal>

      <LookingForMore apps={premiumApps} />
    </ToolLayout>
  );
}
