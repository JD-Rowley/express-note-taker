const fs = require('fs');
const path = require('path');

function validateNote(note) {
    if (!note.title) {
        return false;
    }
    if (!note.text) {
        return false;
    }
    return true;
};

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

function createNewNote(body, notesArray) {
    const note = body;
    if (!validateNote(note)) {
        res.status(400).send('Both areas must contain text!');
    } else {
        notesArray.push(note);
        fs.writeFileSync(path.join(__dirname, '../db/notes.json'), JSON.stringify({ notes: notesArray }, null, 2));

        return note;
    }
};

module.exports = {
    findById,
    createNewNote
};