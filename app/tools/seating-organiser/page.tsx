'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { getStorageItem, setStorageItem } from '@/lib/storage';

interface Student {
  id: string;
  name: string;
}

interface Desk {
  id: string;
  studentId: string | null;
  row: number;
  col: number;
}

interface SeatingChart {
  id: string;
  name: string;
  rows: number;
  cols: number;
  desks: Desk[];
}

export default function SeatingOrganiserPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [newName, setNewName] = useState('');
  const [charts, setCharts] = useState<SeatingChart[]>([]);
  const [currentChart, setCurrentChart] = useState<SeatingChart | null>(null);
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(6);
  const [chartName, setChartName] = useState('');
  const [showNewChartModal, setShowNewChartModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkNames, setBulkNames] = useState('');

  // Load data
  useEffect(() => {
    const savedStudents = getStorageItem<Student[]>('seating-students', []);
    const savedCharts = getStorageItem<SeatingChart[]>('seating-charts', []);
    setStudents(savedStudents);
    setCharts(savedCharts);
    if (savedCharts.length > 0) {
      setCurrentChart(savedCharts[0]);
    }
  }, []);

  // Save data
  useEffect(() => {
    setStorageItem('seating-students', students);
  }, [students]);

  useEffect(() => {
    setStorageItem('seating-charts', charts);
  }, [charts]);

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
    // Also remove from any charts
    if (currentChart) {
      const updatedDesks = currentChart.desks.map(d =>
        d.studentId === id ? { ...d, studentId: null } : d
      );
      const updatedChart = { ...currentChart, desks: updatedDesks };
      setCurrentChart(updatedChart);
      setCharts(charts.map(c => c.id === currentChart.id ? updatedChart : c));
    }
  };

  const createNewChart = () => {
    if (!chartName.trim()) return;

    const desks: Desk[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        desks.push({
          id: `${row}-${col}`,
          studentId: null,
          row,
          col,
        });
      }
    }

    const newChart: SeatingChart = {
      id: Date.now().toString(),
      name: chartName.trim(),
      rows,
      cols,
      desks,
    };

    setCharts([...charts, newChart]);
    setCurrentChart(newChart);
    setChartName('');
    setShowNewChartModal(false);
  };

  const assignStudent = (deskId: string, studentId: string) => {
    if (!currentChart) return;

    const updatedDesks = currentChart.desks.map(d =>
      d.id === deskId ? { ...d, studentId } : d
    );

    const updatedChart = { ...currentChart, desks: updatedDesks };
    setCurrentChart(updatedChart);
    setCharts(charts.map(c => c.id === currentChart.id ? updatedChart : c));
  };

  const clearDesk = (deskId: string) => {
    if (!currentChart) return;

    const updatedDesks = currentChart.desks.map(d =>
      d.id === deskId ? { ...d, studentId: null } : d
    );

    const updatedChart = { ...currentChart, desks: updatedDesks };
    setCurrentChart(updatedChart);
    setCharts(charts.map(c => c.id === currentChart.id ? updatedChart : c));
  };

  const randomizeSeating = () => {
    if (!currentChart) return;

    const shuffled = [...students].sort(() => Math.random() - 0.5);
    const updatedDesks = currentChart.desks.map((desk, index) => ({
      ...desk,
      studentId: shuffled[index] ? shuffled[index].id : null,
    }));

    const updatedChart = { ...currentChart, desks: updatedDesks };
    setCurrentChart(updatedChart);
    setCharts(charts.map(c => c.id === currentChart.id ? updatedChart : c));
  };

  const clearAllSeats = () => {
    if (!currentChart) return;

    const updatedDesks = currentChart.desks.map(d => ({ ...d, studentId: null }));
    const updatedChart = { ...currentChart, desks: updatedDesks };
    setCurrentChart(updatedChart);
    setCharts(charts.map(c => c.id === currentChart.id ? updatedChart : c));
  };

  const deleteChart = (chartId: string) => {
    if (confirm('Delete this seating chart?')) {
      const filtered = charts.filter(c => c.id !== chartId);
      setCharts(filtered);
      if (currentChart?.id === chartId) {
        setCurrentChart(filtered.length > 0 ? filtered[0] : null);
      }
    }
  };

  const getStudentName = (studentId: string | null) => {
    if (!studentId) return null;
    return students.find(s => s.id === studentId)?.name || 'Unknown';
  };

  const getUnassignedStudents = () => {
    if (!currentChart) return students;
    const assignedIds = new Set(currentChart.desks.map(d => d.studentId).filter(Boolean));
    return students.filter(s => !assignedIds.has(s.id));
  };

  return (
    <ToolLayout
      title="Seating Organiser"
      description="Create and manage seating charts with drag-and-drop."
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Students Management */}
        <Card padding="large">
          <h3 style={{ margin: '0 0 16px', fontSize: '1.125rem', fontWeight: 600 }}>
            Students
          </h3>

          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <Input
              placeholder="Add student name"
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

          {students.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {students.map((student) => (
                <div
                  key={student.id}
                  style={{
                    padding: '6px 12px',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-muted)',
                    borderRadius: 'var(--radius-xs)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
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
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)' }}>
              No students added. Add students to create seating charts.
            </div>
          )}
        </Card>

        {/* Charts Management */}
        <Card padding="large" style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
              Seating Charts
            </h3>
            <Button onClick={() => setShowNewChartModal(true)}>
              New Chart
            </Button>
          </div>

          {charts.length > 0 ? (
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <Select
                value={currentChart?.id || ''}
                onChange={(e) => {
                  const chart = charts.find(c => c.id === e.target.value);
                  setCurrentChart(chart || null);
                }}
                style={{ flex: 1 }}
              >
                {charts.map(chart => (
                  <option key={chart.id} value={chart.id}>
                    {chart.name} ({chart.rows}×{chart.cols})
                  </option>
                ))}
              </Select>
              {currentChart && (
                <>
                  <Button onClick={randomizeSeating} variant="secondary">
                    Randomize
                  </Button>
                  <Button onClick={clearAllSeats} variant="secondary">
                    Clear All
                  </Button>
                  <Button onClick={() => deleteChart(currentChart.id)} variant="danger">
                    Delete
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)' }}>
              No seating charts. Create one to get started.
            </div>
          )}

          {/* Seating Chart Display */}
          {currentChart && (
            <div style={{ overflowX: 'auto' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${currentChart.cols}, 100px)`,
                  gridTemplateRows: `repeat(${currentChart.rows}, 80px)`,
                  gap: 12,
                  padding: 20,
                  background: 'var(--surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  minWidth: 'fit-content',
                }}
              >
                {currentChart.desks.map((desk) => {
                  const studentName = getStudentName(desk.studentId);
                  return (
                    <div
                      key={desk.id}
                      style={{
                        background: studentName ? 'var(--surface-base)' : 'var(--surface-muted)',
                        border: '1px solid var(--border-muted)',
                        borderRadius: 'var(--radius-sm)',
                        padding: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '0.875rem',
                        position: 'relative',
                      }}
                    >
                      {studentName ? (
                        <>
                          <div style={{ fontWeight: 600, textAlign: 'center', marginBottom: 4 }}>
                            {studentName}
                          </div>
                          <button
                            onClick={() => clearDesk(desk.id)}
                            style={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              fontSize: '1rem',
                              padding: 0,
                              lineHeight: 1,
                            }}
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <select
                          onChange={(e) => e.target.value && assignStudent(desk.id, e.target.value)}
                          value=""
                          style={{
                            width: '100%',
                            padding: '4px',
                            border: '1px solid var(--border-muted)',
                            borderRadius: 'var(--radius-xs)',
                            fontSize: '0.8125rem',
                            background: 'var(--surface-base)',
                          }}
                        >
                          <option value="">Assign...</option>
                          {getUnassignedStudents().map(s => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Card>

        {/* Instructions */}
        <Card padding="medium" style={{ marginTop: 24, background: 'var(--surface-subtle)' }}>
          <h4 style={{ margin: '0 0 8px', fontSize: '0.9375rem', fontWeight: 600 }}>
            How to use
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            <li>Add all your students first</li>
            <li>Create a new seating chart with your classroom layout</li>
            <li>Click on empty desks to assign students from the dropdown</li>
            <li>Use "Randomize" to auto-assign students randomly</li>
            <li>Click "×" on a desk to remove a student</li>
            <li>Create multiple charts for different arrangements</li>
          </ul>
        </Card>
      </div>

      {/* New Chart Modal */}
      <Modal
        isOpen={showNewChartModal}
        onClose={() => setShowNewChartModal(false)}
        title="Create New Seating Chart"
        size="medium"
      >
        <div style={{ marginBottom: 16 }}>
          <Input
            label="Chart Name"
            placeholder="e.g., Morning Arrangement"
            value={chartName}
            onChange={(e) => setChartName(e.target.value)}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <Input
            label="Rows"
            type="number"
            min={1}
            max={10}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
          />
          <Input
            label="Columns"
            type="number"
            min={1}
            max={10}
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
          />
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <Button onClick={() => setShowNewChartModal(false)} variant="secondary">
            Cancel
          </Button>
          <Button onClick={createNewChart} disabled={!chartName.trim()}>
            Create Chart
          </Button>
        </div>
      </Modal>

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
            placeholder="Alice&#10;Bob&#10;Charlie"
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
