import { useEffect, useState } from 'react';
import { Note } from 'src/types';
import AddNoteDialog from './AddNoteDialog';
import NoteListItem from './NoteListItem';

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch notes when the component mounts
    window.api.getNotes().then((fetchedNotes) => {
      setNotes(fetchedNotes);
    });
  }, []);

  const openAddNoteDialog = async (): Promise<void> => {
    setIsAddNoteDialogOpen(true);
  };

  const handleDeleteNote = async (id: number): Promise<void> => {
    window.api.deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    console.info('delete note', id);
  };

  const handleAddNote = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      content: { value: string };
    };

    const newNote = { title: target.title.value, content: target.content.value };
    const { id } = await window.api.addNote(newNote);
    setNotes((prevNotes) => [{ id, ...newNote }, ...prevNotes]);
    setIsAddNoteDialogOpen(false);
  };

  return (
    <div>
      <h1>Notes</h1>
      {!isAddNoteDialogOpen && <button onClick={() => openAddNoteDialog()}>Add Note</button>}
      <ul>
        {notes.map((note) => (
          <NoteListItem key={note.id} handleDeleteNote={handleDeleteNote} note={note} />
        ))}
      </ul>
      {isAddNoteDialogOpen && <AddNoteDialog handleAddNote={handleAddNote} />}
    </div>
  );
};

export default NoteList;
