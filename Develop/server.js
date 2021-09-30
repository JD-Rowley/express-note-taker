const fs = require('fs');
const express = require('express');

const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

const notes = require('./db/db');

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

function createNewNote(body, notesArr) {
    const note = body;
    notesArr.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify({ notes: notesArr }, null, 2));

    return note;
};

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

app.post('/api/notes', (req, res) => {
    if (!validateNote(req.body)) {
        res.status(400).send('Both areas must contain text!');
    } else {
        const note = createNewNote(req.body, notes);

        res.json(note);
    }
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});