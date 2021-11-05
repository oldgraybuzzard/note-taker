const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewNote,
    validateNotes,
    rewriteNotes,
    deleteNote,


} = require("../lib/notes.js");
const { notes } = require("../db/db");

jest.mock('fs');

test("create a note", () => {
    const note = createNewNote(
        { id: "1", title: "Note_Test2", text: "jhgdja3ng2" },
        notes
    );

    expect(note.title).toBe("Note_Test2");
    expect(note.text).toBe("jhgdja3ng2");
});

test("filters by query", () => {
    const startingNotess = [
        {
            id: "1",
            title: "Test Title2",
            text: "Test text2",
        },
    ];
  
    const updatedNotess = filterByQuery({ title: "Test Title2" }, startingNotess);
  
    expect(updatedNotess.length).toEqual(1);
  });
  
  test("finds by id", () => {
    const startingNotes = [
      {
        id: "1",
        title: "Test Title2",
        text: "Test text2",
      },
    ];
  
    const result = findById("1", startingNotes);
  
    expect(result.title).toBe("Test Title2");
  });
  
  test("delete a note", () => {
    const removeNote = deleteNote(
      { id: "1", title: "Note_Test2", text: "jhgdja3ng2" },
    ) 
  });

  test("rewrite a note", () => {
    const addBackNotes = rewriteNotes(
      { id: "1", title: "Note_Test2", text: "jhgdja3ng2" },
    )

  })