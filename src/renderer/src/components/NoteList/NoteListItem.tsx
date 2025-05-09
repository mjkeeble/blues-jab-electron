import { Note } from 'src/types';

type TProps = {
  note: Note;
  handleDeleteNote: (id: number) => Promise<void>;
};

const NoteListItem: React.FC<TProps> = ({ note, handleDeleteNote }) => {
  return (
    <li key={note.id} style={{ border: '1px solid white', margin: '10px', padding: '10px' }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
    </li>
  );
};

export default NoteListItem;
