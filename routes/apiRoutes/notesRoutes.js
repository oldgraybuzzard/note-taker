const router = require("express").Router();
const { filterByQuery, findById, createNewNote, validateNotes, deleteNote, rewriteNotes } = require("../../lib/notes");
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
  res.send('Got a DELETE request at /api/notes/:id')

  const id = req.params.id;

  const idLess = notes.filter(function (less) {
      return less.id < id;
  });

  const idGreater = notes.filter(function (greater) {
      return greater.id > id;
  });

  // notes = idLess.concat(idGreater);

  rewriteNotes();
});



module.exports = router;