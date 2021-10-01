const fs = require('fs');
const express = require('express');

const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

const { notes } = require('./db/notes');

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

// function createNewNote(body, notesArr) {
//     const note = body;
//     notesArr.push(note);
//     fs.writeFileSync(path.join(__dirname, './db/notes.json'), JSON.stringify({ notes: notesArr }, null, 2));

//     return note;
// };

function validateNote(note) {
    if (!note.title) {
        return false;
    }
    if (!note.text) {
        return false;
    }
    return true;
};

app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// app.get('/api/notes/:title', (req, res) => {
//     const selectedNote = req.params.note;

//     console.log(selectedNote);

//     for (let i = 0; i < notes.length; i++) {
//         if (selectedNote === notes[i].title) {
//             return res.json(notes[i]);
//         }
//     }

//     return res.json(false);
// });

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    if (!validateNote(newNote)) {
        res.status(400).send('Both areas must contain text!');
    } else {
        console.log(newNote);

        notes.push(newNote);

        res.json(newNote);
    }
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});