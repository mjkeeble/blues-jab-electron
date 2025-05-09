import {db} from './';
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
