/**
 * Utility functions for localStorage operations
 * Provides type-safe storage with JSON serialization
 */

export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}

export function clearStorage(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

/**
 * Hook-like function to sync state with localStorage
 */
export function createStorageSync<T>(key: string, defaultValue: T) {
  return {
    get: () => getStorageItem(key, defaultValue),
    set: (value: T) => setStorageItem(key, value),
    remove: () => removeStorageItem(key),
  };
}

/**
 * Shared student names management
 * Provides a global list of student names that can be used across all tools
 */
const SHARED_STUDENTS_KEY = 'shared-student-names';

export interface Student {
  id: string;
  name: string;
}

export function getSharedStudents(): Student[] {
  return getStorageItem<Student[]>(SHARED_STUDENTS_KEY, []);
}

export function setSharedStudents(students: Student[]): void {
  setStorageItem(SHARED_STUDENTS_KEY, students);
}

export function addSharedStudent(name: string): Student {
  const students = getSharedStudents();
  const newStudent: Student = {
    id: crypto.randomUUID(),
    name: name.trim(),
  };
  students.push(newStudent);
  setSharedStudents(students);
  return newStudent;
}

export function removeSharedStudent(id: string): void {
  const students = getSharedStudents();
  const filtered = students.filter(s => s.id !== id);
  setSharedStudents(filtered);
}

export function updateSharedStudent(id: string, name: string): void {
  const students = getSharedStudents();
  const updated = students.map(s =>
    s.id === id ? { ...s, name: name.trim() } : s
  );
  setSharedStudents(updated);
}

export function clearSharedStudents(): void {
  setSharedStudents([]);
}

export function hasSharedStudents(): boolean {
  return getSharedStudents().length > 0;
}
