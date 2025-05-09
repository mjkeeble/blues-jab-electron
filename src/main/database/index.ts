import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';
import { Note } from '../../types';

// Set up the path for the database file in the user's app data folder
const dbPath = path.join(app.getPath('userData'), 'app.db');

// Initialize the database
const db = new Database(dbPath);

// Function to initialize the database schema
export const initializeDatabase = (): void => {
  // Create the "notes" table if it doesn't already exist
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `
  ).run();
};

// Function to retrieve all notes
export const getAllNotes = (): Note[] | unknown[] => {
  return db.prepare('SELECT * FROM notes ORDER BY created_at DESC').all();
};

// Function to add a new note
export const addNote = (note: { title: string; content: string }): { id: number } => {
  const stmt = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)');
  const result = stmt.run(note.title, note.content);
  return { id: Number(result.lastInsertRowid) };
};

// Function to update an existing note
export const updateNote = (note: { id: number; title: string; content: string }): void => {
  const stmt = db.prepare('UPDATE notes SET title = ?, content = ? WHERE id = ?');
  stmt.run(note.title, note.content, note.id);
};

// Function to delete a note by ID
export const deleteNote = (id: number): void => {
  const stmt = db.prepare('DELETE FROM notes WHERE id = ?');
  stmt.run(id);
};
