const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewNote,
    validateNotes,
} = require("../lib/notes.js");
const { notes } = require("../db/db");

jest.mock('fs');

test("create a note", () => {
    const note = createNewNote(
        { id: "1", date: "11/4/2021", title: "Note_Test2", text: "jhgdja3ng2" },
        notes
    );

    expect(note.title).toBe("Note_Test2");
    expect(note.text).toBe("jhgdja3ng2");
});

// test("filters by query", () => {
//     const startingAnimals = [
//         {
//             id: "3",
//             name: "Erica",
//             species: "gorilla",
//             diet: "omnivore",
//             personalityTraits: ["quirky", "rash"],
//         },
//         {
//             id: "4",
//             name: "Noel",
//             species: "bear",
//             diet: "carnivore",
//             personalityTraits: ["impish", "sassy", "brave"],
//         },
//     ];
  
//     const updatedAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);
  
//     expect(updatedAnimals.length).toEqual(1);
//   });
  
  test("finds by id", () => {
    const startingNotes = [
      {
        id: "1",
        date: "11/4/2021",
        title: "Test Title2",
        text: "Test text2",
      },
    ];
  
    const result = findById("1", startingNotes);
  
    expect(result.title).toBe("Test Title2");
  });
  