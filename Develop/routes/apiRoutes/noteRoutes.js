const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const {  findById, createNewNote } = require('../../lib/notes');
const { notes } = require('../../db/notes.json');
const { v4: uuidv4 } = require('uuid');


router.get('/notes', (req, res) => {
    fs.readFile('./db/notes.json', 'utf8', function(err, data) {
        if (err) throw err;
        const { notes } = JSON.parse(data);
        res.json(notes);
    })
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4();

    const note = createNewNote(req.body, notes);

    res.json(note);
});

router.delete('/notes/:id', (req, res) => {
    const selectedId = req.params.id;
        
    fs.writeFileSync(path.join(__dirname, '../../db/notes.json'), JSON.stringify({ notes: notes.filter(note => selectedId !== note.id) }, null, 2));
    
    res.json(notes);
});

module.exports = router;