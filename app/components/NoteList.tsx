import { Link } from '@remix-run/react';
import styles from './NoteList.css';
type Note = {
  id: string;
  title: string;
  content: string;
};
const NoteList: React.FC<{ notes: Note[] }> = ({ notes }) => {
  return (
    <ul id="note-list">
      {Array.isArray(notes) && notes.map((note, index) => (
  <li key={note.id} className="note">
    <Link to={note.id}>
      <article>
        <header>
          <ul className="note-meta">
            <li>#{index + 1}</li>
            <li>{note.title}</li>
          </ul>
          <h2>{note.title}</h2>
        </header>
        <p>{note.content}</p>
      </article>
    </Link>
  </li>
))}
    </ul>
  );
}

export default NoteList;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}