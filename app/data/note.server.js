import {prisma} from './database.server.js';
export async function storeNotes(notesData){
    try{    
        console.log("Inside storeNotes");
        return await prisma.note.create({
            data:{
                title:notesData.title,
                content:notesData.content
            }
        })
    
}
catch(error){
    console.log(error);
    throw new Error('Error while storing notes');
}  
}


export async function getNotes() {
    try {
        console.log("Inside getNotes");
        const notes = await prisma.note.findMany();
        return notes;
    } catch (error) {
        console.log(error);
        throw new Error('Error while retrieving notes');
    }
}

export async function deleteNote(id) {
    try {
        console.log("Inside deleteNote");
         await prisma.note.delete({
            where: {
                id: id,
            },
        });
        // return note;
    } catch (error) {
        console.log(error);
        throw new Error('Error while deleting note');
    }
}


export async function updateNote(id, newTitle) {
    try {
        console.log("Inside updateNote");
        const note = await prisma.note.update({
            where: {
                id: id,
            },
            data: {
                title: newTitle,
            },
        });
        return note;
    } catch (error) {
        console.log(error);
        throw new Error('Error while updating note');
    }
}