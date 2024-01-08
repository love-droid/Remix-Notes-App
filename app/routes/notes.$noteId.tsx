import { redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from "@remix-run/react";
import styles from "~/styles/noteDetails.css";
import { deleteNote , getNotes,updateNote} from '~/data/note.server';

interface Note {
  id: string;
  title: string;
}

interface Params {
  noteId: string;
}



export default function NoteDetailsPage() {
  const currData = useLoaderData();

  async function handleDelete() {
    try {
      await deleteNote(currData.id);
      return redirect('/notes');
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  }

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to Notes</Link>
        </nav>
        <h1>{currData.title}</h1>
      </header>
      <p id="note-details-content">{currData.content}</p>
      <UpdateNoteForm note={currData} />
      <Form method='delete' action={`/notes/${currData.id}`} onSubmit={handleDelete}>
        <button id="delete-note">Delete Note</button>
      </Form>
      
    </main>
  );
}

function UpdateNoteForm({ note } : { note: Note }) {
  return (
    <Form method='post' action={`/notes/${note.id}`} >
      <label>
        Title:
        <input type="text" name="title" defaultValue={note.title} />
      </label>
      
      <button type="submit">Update Note</button>
    </Form>
  );
}

export async function action({ request, params } ) {
  if (request.method === 'DELETE') {
    await deleteNote(params.noteId);
    console.log('delete this note ======>',params.noteId)
    return redirect('/notes');
  } else if (request.method === 'POST') {
    const body = new URLSearchParams(await request.text());
    const updatedTitle = body.get('title');
    // const updatedContent = body.get('content');

    try {
      await updateNote(params.noteId, updatedTitle);

      // After updating, store the updated notes
      console.log('updated note ======>', updatedTitle)
      return redirect('/notes');
    } catch (error) {
      // console.error('Failed to update note:', error.message);
      // Handle error, e.g., show an error message to the user
      return redirect(`/notes`); // Redirect back to the details page
    }
  }
}

export async function loader({ params } : { params: Params }) {
  const notes = await getNotes();
  const currentNode = notes.find((note) => note.id === params.noteId);
  return currentNode;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}







// import {  redirect} from '@remix-run/node';
// import { Form, Link, useLoaderData } from "@remix-run/react";
// import { deleteNote, getStoredNotes } from "~/data/notes";
// import styles from "~/styles/noteDetails.css";

// export default function NoteDetailsPage() {
//   const currData = useLoaderData();
//   console.log(currData);

  
//   return (
//     <main id="note-details">
//       <header>
//         <nav>
//             <Link to="/notes">Back to Notes</Link>
//         </nav>
//         <h1>{currData.title}</h1>
//       </header>
//       <p id="note-details-content">{currData.content}</p>
//       <Form method='delete' action={`/notes/${currData.id}`}>
//       <button id="delete-note">Delete Note</button>
//       </Form>
      
//     </main>
//   );
// }

// export async function action({ request, params }) {
//   if(request.method === 'DELETE'){
//     console.log('delete this note')
//     console.log("params id =======>",params.noteId)
//     await deleteNote(params.noteId);
//     return redirect('/notes');
  
//   }
// }

// export async function loader({params}){
//   const notes = await getStoredNotes();
//   const currentNode = notes.find((note) => note.id === params.noteId);
//   // console.log(currentNode);
//   return currentNode;
// }

// export function links() {
//   return [{ rel: "stylesheet", href: styles }];
// }