const fs = require('fs');
const express = require('express');

const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

const { notes } = require('./db/notes');

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
}

app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
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