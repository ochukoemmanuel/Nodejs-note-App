const fs = require("fs");
const { title } = require("process");
const chalk = require("chalk");

let sn = 1;

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesTokeep = notes.filter((notes) => notes.title !== title);

  const foundNote = notes.filter((notes) => notes.title === title);

  if (notes.length !== notesTokeep.length && foundNote.length !== 0) {
    saveNotes(notesTokeep);
    console.log(chalk.inverse.red("Note removed!"));
  } else {
    console.log(chalk.green.inverse("No note found!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((notes) => notes.title === title
    );
    
    if (note) {
      console.log(chalk.bold(note.title));
      console.log("  " + note.body);
    } else {
      console.log(chalk.red.inverse("Note not found!"));
    }
  };

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  console.log(chalk.bold.underline("All Your notes"));
  const notes = loadNotes();
  const duplicateNotes = notes.forEach((note) =>
    console.log(chalk.bold(sn++, note.title + "\n"))
  );
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
