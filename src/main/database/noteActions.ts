import { Note } from '../../types';
import { db } from './'; 

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
