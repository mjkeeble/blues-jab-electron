export type Note = {
  id: number;
  title: string;
  content: string;
};

export type NoteWithTimestamp = {
  created_at: string;
} & Note;
