import {  redirect} from '@remix-run/node';
import NewNotes , {links as NewNotesCssLinks} from '../components/NewNotes';
import {getStoredNotes} from 'app/data/notes';
import {storeNotes, getNotes} from 'app/data/note.server'
import NoteList,{links as NoteListCss} from '~/components/NoteList';
import { useLoaderData,  } from '@remix-run/react';

export default function NotesPage() {
  // You can use the data fetched in the loader function here.
  
 const data = useLoaderData(); 

  return (
    <main>
      <NewNotes/>
      <NoteList notes = {data}/>
    </main>
  );
}

export function links() {
  // link surfacing 
  return [...NewNotesCssLinks(), ...NoteListCss()];
}

export async function loader({request}: {request: any}) {
  const notes = await getNotes();
  console.log('notes ======>', notes)
  return notes;

}

// backend handling of form submission
export async function action({request}: {request: any}) {
  const formdata = await request.formData();
  // const noteData = {
    // title : formdata.get('title'),
    // content : formdata.get('content')
  // }
  // instead of above way we can also use below syntax

  const noteData = Object.fromEntries(formdata.entries());

  // validation 
  if(noteData.title.trim().length < 4){
    return {message : 'Title must be at least 4 characters long'}
  }
  
  // const existingNotes = await getStoredNotes();
  // noteData.id = new Date().toISOString();
  // const updatedNotes = existingNotes.concat(noteData);
  
  await storeNotes(noteData);
  console.log('noteData ======>', noteData)
  await new Promise((resolve) => setTimeout(resolve, 500));
  // checkConnection();
  return redirect('/notes');
}


