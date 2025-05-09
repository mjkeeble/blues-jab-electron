import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      getNotes: () => Promise<{ id: number; title: string; content: string }[]>;
      addNote: (note: { title: string; content: string }) => Promise<{ id: number }>;
      updateNote: (note: { id: number; title: string; content: string }) => Promise<void>;
      deleteNote: (id: number) => Promise<void>;
    };
  }
}
