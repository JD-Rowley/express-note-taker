const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const {  findById, createNewNote } = require('../../lib/notes');
const { notes } = require('../../db/notes.json');
const { v4: uuidv4 } = require('uuid');

// read json file and parse data to page
router.get('/notes', (req, res) => {
    fs.readFile('./db/notes.json', 'utf8', function(err, data) {
        if (err) throw err;
        const { notes } = JSON.parse(data);
        res.json(notes);
    })
});

// find note by id and display
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

// post a new note
router.post('/notes', (req, res) => {
    // requires UUID npm
    req.body.id = uuidv4();

    // run createNewNote function
    const note = createNewNote(req.body, notes);

    res.json(note);
});

// delete a note
router.delete('/notes/:id', (req, res) => {
    const selectedId = req.params.id;
        
    // use filter to generate new note list without chosen id
    fs.writeFileSync(path.join(__dirname, '../../db/notes.json'), JSON.stringify({ notes: notes.filter(note => selectedId !== note.id) }, null, 2));
    
    res.json(notes);
});

module.exports = router;