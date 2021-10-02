const fs = require('fs');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

const { notes } = require('./db/notes');
const { notStrictEqual } = require('assert');

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

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
        fs.writeFileSync(path.join(__dirname, './db/notes.json'), JSON.stringify({ notes: notesArray }, null, 2));

        return note;
    }
};

app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
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
    req.body.id = uuidv4();

    const note = createNewNote(req.body, notes);

    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    const indexToDelete = req.params.id;
    
    notes.splice(indexToDelete, 1);
    
    fs.writeFileSync(path.join(__dirname, './db/notes.json'), JSON.stringify({ notes }, null, 2));

    res.json(notes);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});