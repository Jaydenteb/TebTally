'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/tools/ToolLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { getStorageItem, setStorageItem, getSharedStudents, setSharedStudents, clearSharedStudents } from '@/lib/storage';

interface Student {
  id: string;
  name: string;
}

interface Seat {
  id: string;
  tableId: string;
  studentId: string | null;
}

interface Table {
  id: string;
  seats: Seat[];
}

interface Rule {
  id: string;
  type: 'keep-apart' | 'seat-together';
  student1Id: string;
  student2Id: string;
}

interface SeatingChart {
  id: string;
  name: string;
  tables: Table[];
  rules: Rule[];
}

export default function SeatingOrganiserPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [newName, setNewName] = useState('');
  const [charts, setCharts] = useState<SeatingChart[]>([]);
  const [currentChart, setCurrentChart] = useState<SeatingChart | null>(null);

  // Chart creation
  const [numTables, setNumTables] = useState(6);
  const [seatsPerTable, setSeatsPerTable] = useState(4);
  const [chartName, setChartName] = useState('');
  const [showNewChartModal, setShowNewChartModal] = useState(false);

  // Rules management
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [ruleType, setRuleType] = useState<'keep-apart' | 'seat-together'>('keep-apart');
  const [ruleStudent1, setRuleStudent1] = useState('');
  const [ruleStudent2, setRuleStudent2] = useState('');

  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkNames, setBulkNames] = useState('');

  // Load data
  useEffect(() => {
    const savedStudents = getStorageItem<Student[]>('seating-students-v2', []);
    const savedCharts = getStorageItem<SeatingChart[]>('seating-charts-v2', []);
    setStudents(savedStudents);
    setCharts(savedCharts);
    if (savedCharts.length > 0) {
      setCurrentChart(savedCharts[0]);
    }
  }, []);

  // Save data
  useEffect(() => {
    setStorageItem('seating-students-v2', students);
  }, [students]);

  useEffect(() => {
    setStorageItem('seating-charts-v2', charts);
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
    // Remove from charts and rules
    if (currentChart) {
      const updatedTables = currentChart.tables.map(table => ({
        ...table,
        seats: table.seats.map(seat =>
          seat.studentId === id ? { ...seat, studentId: null } : seat
        ),
      }));
      const updatedRules = currentChart.rules.filter(
        r => r.student1Id !== id && r.student2Id !== id
      );
      const updatedChart = { ...currentChart, tables: updatedTables, rules: updatedRules };
      setCurrentChart(updatedChart);
      setCharts(charts.map(c => c.id === currentChart.id ? updatedChart : c));
    }
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

  const createNewChart = () => {
    if (!chartName.trim()) return;

    const tables: Table[] = [];
    for (let i = 0; i < numTables; i++) {
      const seats: Seat[] = [];
      for (let j = 0; j < seatsPerTable; j++) {
        seats.push({
          id: `${i}-${j}`,
          tableId: `table-${i}`,
          studentId: null,
        });
      }
      tables.push({
        id: `table-${i}`,
        seats,
      });
    }

    const newChart: SeatingChart = {
      id: Date.now().toString(),
      name: chartName.trim(),
      tables,
      rules: [],
    };

    setCharts([...charts, newChart]);
    setCurrentChart(newChart);
    setChartName('');
    setShowNewChartModal(false);
  };

  const assignStudent = (seatId: string, tableId: string, studentId: string) => {
    if (!currentChart) return;

    const updatedTables = currentChart.tables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          seats: table.seats.map(seat =>
            seat.id === seatId ? { ...seat, studentId } : seat
          ),
        };
      }
      return table;
    });

    const updatedChart = { ...currentChart, tables: updatedTables };
    setCurrentChart(updatedChart);
    setCharts(charts.map(c => c.id === currentChart.id ? updatedChart : c));
  };

  const clearSeat = (seatId: string, tableId: string) => {
    if (!currentChart) return;

    const updatedTables = currentChart.tables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          seats: table.seats.map(seat =>
            seat.id === seatId ? { ...seat, studentId: null } : seat
          ),
        };
      }
      return table;
    });

    const updatedChart = { ...currentChart, tables: updatedTables };
    setCurrentChart(updatedChart);
    setCharts(charts.map(c => c.id === currentChart.id ? updatedChart : c));
  };

  const addRule = () => {
    if (!currentChart || !ruleStudent1 || !ruleStudent2 || ruleStudent1 === ruleStudent2) return;

    const newRule: Rule = {
      id: Date.now().toString(),
      type: ruleType,
      student1Id: ruleStudent1,
      student2Id: ruleStudent2,
    };

    const updatedChart = { ...currentChart, rules: [...currentChart.rules, newRule] };
    setCurrentChart(updatedChart);
    setCharts(charts.map(c => c.id === currentChart.id ? updatedChart : c));
    setRuleStudent1('');
    setRuleStudent2('');
  };

  const removeRule = (ruleId: string) => {
    if (!currentChart) return;

    const updatedChart = {
      ...currentChart,
      rules: currentChart.rules.filter(r => r.id !== ruleId),
    };
    setCurrentChart(updatedChart);
    setCharts(charts.map(c => c.id === currentChart.id ? updatedChart : c));
  };

  const randomizeSeating = () => {
    if (!currentChart) return;

    const shuffled = [...students].sort(() => Math.random() - 0.5);
    let studentIndex = 0;

    // Flatten all seats
    const allSeats: { tableId: string; seatId: string }[] = [];
    currentChart.tables.forEach(table => {
      table.seats.forEach(seat => {
        allSeats.push({ tableId: table.id, seatId: seat.id });
      });
    });

    // Try to assign with rules (simple implementation - may not satisfy all rules)
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      // Reset assignment
      const tempAssignment: { [seatId: string]: string } = {};
      const shuffledStudents = [...students].sort(() => Math.random() - 0.5);
      let valid = true;

      for (let i = 0; i < Math.min(shuffledStudents.length, allSeats.length); i++) {
        const student = shuffledStudents[i];
        const seat = allSeats[i];
        tempAssignment[seat.seatId] = student.id;
      }

      // Check rules
      for (const rule of currentChart.rules) {
        const student1Seat = Object.entries(tempAssignment).find(([_, id]) => id === rule.student1Id);
        const student2Seat = Object.entries(tempAssignment).find(([_, id]) => id === rule.student2Id);

        if (student1Seat && student2Seat) {
          const table1 = allSeats.find(s => s.seatId === student1Seat[0])?.tableId;
          const table2 = allSeats.find(s => s.seatId === student2Seat[0])?.tableId;

          if (rule.type === 'keep-apart' && table1 === table2) {
            valid = false;
            break;
          }
          if (rule.type === 'seat-together' && table1 !== table2) {
            valid = false;
            break;
          }
        }
      }

      if (valid) {
        // Apply assignment
        const updatedTables = currentChart.tables.map(table => ({
          ...table,
          seats: table.seats.map(seat => ({
            ...seat,
            studentId: tempAssignment[seat.id] || null,
          })),
        }));

        const updatedChart = { ...currentChart, tables: updatedTables };
        setCurrentChart(updatedChart);
        setCharts(charts.map(c => c.id === currentChart.id ? updatedChart : c));
        return;
      }

      attempts++;
    }

    // If we couldn't satisfy rules after max attempts, just do random assignment
    const updatedTables = currentChart.tables.map((table, tableIndex) => ({
      ...table,
      seats: table.seats.map((seat, seatIndex) => {
        const flatIndex = tableIndex * currentChart.tables[0].seats.length + seatIndex;
        return {
          ...seat,
          studentId: shuffled[flatIndex] ? shuffled[flatIndex].id : null,
        };
      }),
    }));

    const updatedChart = { ...currentChart, tables: updatedTables };
    setCurrentChart(updatedChart);
    setCharts(charts.map(c => c.id === currentChart.id ? updatedChart : c));
  };

  const clearAllSeats = () => {
    if (!currentChart) return;

    const updatedTables = currentChart.tables.map(table => ({
      ...table,
      seats: table.seats.map(seat => ({ ...seat, studentId: null })),
    }));

    const updatedChart = { ...currentChart, tables: updatedTables };
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
    const assignedIds = new Set(
      currentChart.tables.flatMap(t => t.seats.map(s => s.studentId).filter(Boolean))
    );
    return students.filter(s => !assignedIds.has(s.id));
  };

  return (
    <ToolLayout
      title="Seating Organiser"
      description="Create and manage table seating arrangements with rules."
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

          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Button onClick={loadFromShared} variant="secondary" size="small">
              Load Shared List
            </Button>
            <Button onClick={saveToShared} variant="secondary" size="small">
              Save to Shared
            </Button>
            <Button onClick={clearShared} variant="danger" size="small">
              Clear Shared
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
            <div style={{ display: 'flex', gap: 12 }}>
              {currentChart && (
                <Button onClick={() => setShowRulesModal(true)} variant="secondary">
                  Manage Rules ({currentChart.rules.length})
                </Button>
              )}
              <Button onClick={() => setShowNewChartModal(true)}>
                New Chart
              </Button>
            </div>
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
                    {chart.name} ({chart.tables.length} tables, {chart.tables[0]?.seats.length} seats each)
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
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: 20,
                  padding: 20,
                  background: 'var(--surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                {currentChart.tables.map((table, tableIndex) => (
                  <div
                    key={table.id}
                    style={{
                      background: 'var(--surface-base)',
                      border: '2px solid var(--border-muted)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        marginBottom: 12,
                        textAlign: 'center',
                      }}
                    >
                      Table {tableIndex + 1}
                    </div>
                    <div style={{ display: 'grid', gap: 8 }}>
                      {table.seats.map((seat) => {
                        const studentName = getStudentName(seat.studentId);
                        return (
                          <div
                            key={seat.id}
                            style={{
                              background: studentName ? 'var(--surface-subtle)' : 'var(--surface-muted)',
                              border: '1px solid var(--border-muted)',
                              borderRadius: 'var(--radius-sm)',
                              padding: 8,
                              minHeight: 40,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.875rem',
                              position: 'relative',
                            }}
                          >
                            {studentName ? (
                              <>
                                <div style={{ fontWeight: 500 }}>{studentName}</div>
                                <button
                                  onClick={() => clearSeat(seat.id, table.id)}
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
                                onChange={(e) => e.target.value && assignStudent(seat.id, table.id, e.target.value)}
                                value=""
                                style={{
                                  width: '100%',
                                  padding: '4px',
                                  border: 'none',
                                  borderRadius: 'var(--radius-xs)',
                                  fontSize: '0.8125rem',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                }}
                              >
                                <option value="">+ Add</option>
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
                ))}
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
            <li>Create a seating chart by specifying number of tables and seats per table</li>
            <li>Set rules for students (who should/shouldn't sit together at same table)</li>
            <li>Click on empty seats to assign students manually</li>
            <li>Use "Randomize" to auto-assign respecting rules (or random if rules can't be satisfied)</li>
            <li>Manage multiple charts for different arrangements</li>
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
            label="Number of Tables"
            type="number"
            min={1}
            max={12}
            value={numTables}
            onChange={(e) => setNumTables(Number(e.target.value))}
          />
          <Input
            label="Seats per Table"
            type="number"
            min={2}
            max={8}
            value={seatsPerTable}
            onChange={(e) => setSeatsPerTable(Number(e.target.value))}
          />
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 16 }}>
          Total seats: {numTables * seatsPerTable}
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

      {/* Rules Modal */}
      <Modal
        isOpen={showRulesModal}
        onClose={() => setShowRulesModal(false)}
        title="Manage Seating Rules"
        size="medium"
      >
        {currentChart && (
          <>
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '1rem', fontWeight: 600 }}>
                Add New Rule
              </h4>
              <div style={{ marginBottom: 12 }}>
                <Select
                  label="Rule Type"
                  value={ruleType}
                  onChange={(e) => setRuleType(e.target.value as 'keep-apart' | 'seat-together')}
                >
                  <option value="keep-apart">Keep Apart (different tables)</option>
                  <option value="seat-together">Seat Together (same table)</option>
                </Select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <Select
                  label="Student 1"
                  value={ruleStudent1}
                  onChange={(e) => setRuleStudent1(e.target.value)}
                >
                  <option value="">Select student</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Student 2"
                  value={ruleStudent2}
                  onChange={(e) => setRuleStudent2(e.target.value)}
                >
                  <option value="">Select student</option>
                  {students.filter(s => s.id !== ruleStudent1).map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Select>
              </div>
              <Button
                onClick={addRule}
                disabled={!ruleStudent1 || !ruleStudent2}
                style={{ width: '100%' }}
              >
                Add Rule
              </Button>
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px', fontSize: '1rem', fontWeight: 600 }}>
                Current Rules ({currentChart.rules.length})
              </h4>
              {currentChart.rules.length > 0 ? (
                <div style={{ display: 'grid', gap: 8 }}>
                  {currentChart.rules.map(rule => {
                    const student1 = students.find(s => s.id === rule.student1Id);
                    const student2 = students.find(s => s.id === rule.student2Id);
                    return (
                      <div
                        key={rule.id}
                        style={{
                          padding: 12,
                          background: 'var(--surface-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 500, marginBottom: 4 }}>
                            {student1?.name} & {student2?.name}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            {rule.type === 'keep-apart' ? '🚫 Keep at different tables' : '✓ Seat at same table'}
                          </div>
                        </div>
                        <button
                          onClick={() => removeRule(rule.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '1.25rem',
                            padding: '4px 8px',
                          }}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
                  No rules set. Add rules to enforce seating constraints during randomization.
                </div>
              )}
            </div>

            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setShowRulesModal(false)}>
                Done
              </Button>
            </div>
          </>
        )}
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
