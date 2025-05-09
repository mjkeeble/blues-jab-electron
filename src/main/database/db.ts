import Database, {Database as BetterSqliteDatabase} from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';

// Set up the path for the database file in the user's app data folder
const dbPath = path.join(app.getPath('userData'), 'app.db');

// Initialize the database
export const db: BetterSqliteDatabase = new Database(dbPath);
