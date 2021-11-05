const fs = require("fs");
const path = require("path");
const notes = require("../db/db.json");


function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(note => note.title === note.title);
  }
  if (query.text) {
    filteredResults = filteredResults.filter(text => note.text === note.text);
  }
   return filteredResults;
}

function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({notes: notesArray}, null, 2)
  );
  return note;
}

function validateNotes(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }
  return true;
}

function deleteNote(note) {
  delete note.id;
};

function rewriteNotes() {
  fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
      if (err) {
          console.log("error")
          return console.log(err);
      }

      console.log("Success!");
  });
}



module.exports = {
  filterByQuery,
  findById,
  createNewNote,
  validateNotes,
  deleteNote,
  rewriteNotes
 };