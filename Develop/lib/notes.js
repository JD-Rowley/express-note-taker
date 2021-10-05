const fs = require('fs');
const path = require('path');

// function to validate whether each not has a title and a body
function validateNote(note) {
    if (!note.title) {
        return false;
    }
    if (!note.text) {
        return false;
    }
    return true;
};

// function to search for a note by its id
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

// function to create a new note and save it to the array
function createNewNote(body, notesArray) {
    const note = body;
    if (!validateNote(note)) {
        res.status(400).send('Both areas must contain text!');
    } else {
        // push notes array and update the server side array
        notesArray.push(note);
        fs.writeFileSync(path.join(__dirname, '../db/notes.json'), JSON.stringify({ notes: notesArray }, null, 2));

        return note;
    }
};

// export functions
module.exports = {
    findById,
    createNewNote
};