const fs = require('fs');
const path = require('path');
const router = require("express").Router();
const { filterByQuery, findById, createNewNote, validateNotes, deleteNote } = require("../../lib/notes");
const { notes } = require("../../db/db");

router.get("/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post("/notes", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNotes(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

router.delete("/notes/:id", function (req, res) {
  let jsonFilePath = path.join(__dirname, "../../db/db.json");

  // request to delete note by id.
  for (let i = 0; i < notes.length; i++) {
      if (notes[i].id == req.params.id) {
          // Splice takes i position, and then deletes the 1 note.
          console.log("found id");
          notes.splice(i, 1);
          break;
      }
  }
  // Write the db.json file again.
    fs.writeFileSync(jsonFilePath, JSON.stringify({ notes: notes}, null, 2), function (err) {

      if (err) {
          return console.log(err);
      } else {
          console.log("Your note was deleted!");
      }
  });
  res.json(notes);
});

module.exports = router;