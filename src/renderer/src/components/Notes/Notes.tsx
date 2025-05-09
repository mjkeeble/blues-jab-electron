import { useEffect, useState } from 'react';
import { Note } from 'src/types';

const NoteList = (): JSX.Element => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Fetch notes when the component mounts
    window.api.getNotes().then((fetchedNotes) => {
      setNotes(fetchedNotes);
    });
  }, []);

  const handleAddNote = async (): Promise<void> => {
    const newNote = { title: 'New Note', content: 'This is a new note.' };
    const { id } = await window.api.addNote(newNote);
    setNotes((prevNotes) => [{ id, ...newNote }, ...prevNotes]);
  };

  const handleDeleteNote = async (id: number): Promise<void> => {
    window.api.deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    console.info('delete note', id);
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => handleAddNote()}>Add Note</button>
      <ul>
        {notes.map((note) => (
          <NoteListItem key={note.id} handleDeleteNote={handleDeleteNote} note={note} />
        ))}
      </ul>
    </div>
  );
};

interface NoteListItemProps {
  note: Note;
  handleDeleteNote: (id: number) => Promise<void>;
}

const NoteListItem = ({ note, handleDeleteNote }: NoteListItemProps): JSX.Element => {
  return (
    <li key={note.id} style={{ border: '1px solid white', margin: '10px', padding: '10px' }}>
      <p>{note.content}</p>
      <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
    </li>
  );
};

export default NoteList;
