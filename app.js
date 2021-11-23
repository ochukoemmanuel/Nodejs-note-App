const yargs = require("yargs");
const notes = require("./note.js");

yargs.version("1.1.0");

//Create add command
yargs.command({
  command: "add",
  describe: "Add note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

// Creat list command
yargs.command({
  command: "list",
  describe: "Your notes",
  handler: () => {
    notes.listNotes();
  },
});

// Read note
yargs.command({
  command: "read",
  describe: "Read note",
  builder: {
    title: {
      describe: "Read your note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.readNote(argv.title);
  },
});

yargs.parse();
