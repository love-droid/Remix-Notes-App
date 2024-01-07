import fs from 'fs/promises';

// below are the utility methods which will be used to interact with the file system
export async function getStoredNotes() {
  const rawFileContent = await fs.readFile('notes.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;

  // return await prisma.note.findMany();
}

export async function storeNotes(notes) {
  return fs.writeFile('notes.json', JSON.stringify({ notes: notes || [] }));
  
  // for (let note of notes) {
  //   await prisma.note.create({
  //     data: {
  //       title: note.title,
  //       content: note.content
  //     }
  //   });
  // }
}

// below are the methods which will be used to interact with the notes
export async function deleteNote(noteId) {
  const notes = await getStoredNotes();
  const updatedNotes = await notes.filter(note => note.id !== noteId);
  console.log(updatedNotes);
  await storeNotes(updatedNotes.length > 0 ? updatedNotes : null);

  // await prisma.note.delete({
  //   where: {
  //     id: noteId
  //   }
  // });
}

export async function updateNote(noteId, updatedTitle, updatedDescription) {
  const notes = await getStoredNotes();
  const noteIndex = notes.findIndex(note => note.id === noteId);

  if (noteIndex !== -1) {
    notes[noteIndex].title = updatedTitle;
    notes[noteIndex].description = updatedDescription;
    await storeNotes(notes);
  } else {
    throw new Error('Note not found');
  }

  // await prisma.note.update({
  //   where: {
  //     id: noteId
  //   },
  //   data: {
  //     title: updatedTitle,
  //     content: updatedDescription
  //   }
  // });
}