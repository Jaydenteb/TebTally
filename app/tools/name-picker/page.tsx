'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { getStorageItem, setStorageItem } from '@/lib/storage';

interface Student {
  id: string;
  name: string;
  picked: boolean;
}

export default function NamePickerPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [newName, setNewName] = useState('');
  const [currentPick, setCurrentPick] = useState<Student | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkNames, setBulkNames] = useState('');

  // Load students from localStorage
  useEffect(() => {
    const saved = getStorageItem<Student[]>('name-picker-students', []);
    setStudents(saved);
  }, []);

  // Save students to localStorage
  useEffect(() => {
    setStorageItem('name-picker-students', students);
  }, [students]);

  const addStudent = () => {
    if (!newName.trim()) return;

    const newStudent: Student = {
      id: Date.now().toString(),
      name: newName.trim(),
      picked: false,
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
      picked: false,
    }));

    setStudents([...students, ...newStudents]);
    setBulkNames('');
    setShowBulkModal(false);
  };

  const removeStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const pickRandom = () => {
    const unpicked = students.filter(s => !s.picked);
    if (unpicked.length === 0) {
      alert('All students have been picked! Reset to start over.');
      return;
    }

    setIsAnimating(true);

    // Animate through random names
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * unpicked.length);
      setCurrentPick(unpicked[randomIndex]);
      count++;

      if (count > 15) {
        clearInterval(interval);
        const finalPick = unpicked[Math.floor(Math.random() * unpicked.length)];
        setCurrentPick(finalPick);
        setIsAnimating(false);

        // Mark as picked
        setStudents(students.map(s =>
          s.id === finalPick.id ? { ...s, picked: true } : s
        ));
      }
    }, 100);
  };

  const resetPicked = () => {
    setStudents(students.map(s => ({ ...s, picked: false })));
    setCurrentPick(null);
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to remove all students?')) {
      setStudents([]);
      setCurrentPick(null);
    }
  };

  const unpickedCount = students.filter(s => !s.picked).length;
  const pickedCount = students.filter(s => s.picked).length;

  return (
    <ToolLayout
      title="Name Picker"
      description="Random student selector with tracking of who has been called."
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Main Pick Display */}
        <Card padding="large">
          <div style={{ textAlign: 'center' }}>
            {currentPick ? (
              <>
                <div
                  style={{
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: 'var(--primary-mid)',
                    marginBottom: 24,
                    minHeight: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {currentPick.name}
                </div>
              </>
            ) : (
              <div
                style={{
                  fontSize: '1.5rem',
                  color: 'var(--text-muted)',
                  minHeight: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Click "Pick Random" to select a student
              </div>
            )}

            <Button
              onClick={pickRandom}
              disabled={students.length === 0 || unpickedCount === 0 || isAnimating}
              size="large"
              style={{ width: '100%', maxWidth: 300 }}
            >
              {isAnimating ? 'Picking...' : 'Pick Random'}
            </Button>

            {students.length > 0 && (
              <div style={{ marginTop: 24, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary-mid)' }}>
                    {unpickedCount}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Remaining</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {pickedCount}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Already Picked</div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Add Students */}
        <Card padding="large" style={{ marginTop: 24 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '1.125rem', fontWeight: 600 }}>
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
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <Button onClick={resetPicked} variant="secondary" size="small">
                Reset Picked
              </Button>
              <Button onClick={clearAll} variant="danger" size="small">
                Clear All
              </Button>
            </div>
          )}

          {/* Student List */}
          {students.length > 0 ? (
            <div style={{ display: 'grid', gap: 8 }}>
              {students.map((student) => (
                <div
                  key={student.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: student.picked ? 'var(--surface-subtle)' : 'var(--surface-base)',
                    border: '1px solid var(--border-muted)',
                    borderRadius: 'var(--radius-sm)',
                    opacity: student.picked ? 0.6 : 1,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontWeight: 500 }}>{student.name}</span>
                    {student.picked && (
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        ✓ Picked
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => removeStudent(student.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '1.25rem',
                      padding: '4px 8px',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
              No students added yet. Add students above to get started!
            </div>
          )}
        </Card>

        {/* Instructions */}
        <Card padding="medium" style={{ marginTop: 24, background: 'var(--surface-subtle)' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '0.9375rem', fontWeight: 600 }}>
            How to use
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            <li>Add student names one at a time or use "Add Multiple" for bulk entry</li>
            <li>Click "Pick Random" to randomly select from students who haven't been picked</li>
            <li>Picked students are tracked and won't be selected again until you reset</li>
            <li>Use "Reset Picked" to clear the picked status and start fresh</li>
            <li>Your class list is saved automatically</li>
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
    </ToolLayout>
  );
}
