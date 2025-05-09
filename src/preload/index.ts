import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';
import { Note } from '../types';

// Custom APIs for renderer
const api = {
  getNotes: (): Promise<Note[]> => ipcRenderer.invoke('get-notes'),
  addNote: (note: { title: string; content: string }): Promise<{ id: number }> =>
    ipcRenderer.invoke('add-note', note),
  deleteNote: (id: number): Promise<void> => ipcRenderer.invoke('delete-note', id)
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
