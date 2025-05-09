
type TProps = {
  handleAddNote: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

const AddNoteDialog: React.FC<TProps> = ({handleAddNote}) => { 

  return (
    <form onSubmit={(event) => handleAddNote(event)}>
      <p>
        <label htmlFor='title'>
          Title:
          <input type="text" name="title" required />
        </label>
      </p>
      <p>
        <label htmlFor='content'>
          Content:
          <textarea name="content" required />
        </label>
      </p>
      <button>Add Note</button>
    </form>
  );
};

export default AddNoteDialog;
