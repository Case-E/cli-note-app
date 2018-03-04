// console.log('starting app.js...');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a specific note', {
        title: titleOptions
    })
    .command('remove', 'Delete a note', {
        title: titleOptions
    })
    .help()
    .argv;

let command = argv._[0];
// console.log('Command: ', command);
// console.log('Process argv: ', process.argv);
// console.log('Yargs argv: ', argv);

if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body);
    if (_.isUndefined(note)) {
        console.log('Note with the same title already exists.');
    } else {
        console.log('Note Created');
        notes.logNote(note);
    }
} else if (command === 'list') {
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(note =>  notes.logNote(note));
} else if (command === 'read') {
    let note = notes.readNote(argv.title);
    if (_.isUndefined(note)) {
        console.log(`Note with title ${argv.title} doesn't exist.`);
    } else {
        console.log('Here\'s your note!');
        notes.logNote(note);
    }
} else if (command === 'remove') {
    let noteRemoved = notes.delNote(argv.title);
    let message = noteRemoved ? `Successfully deleted note - ${argv.title}` : `A note with that title (${argv.title}) wasn\'t found`;
    console.log(message);
} else {
    console.log('Command not recognised');
}