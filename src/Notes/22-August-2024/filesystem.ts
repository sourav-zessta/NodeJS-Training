// fs Module Overview

/*
  The fs (filesystem) module in Node.js provides a way to interact with the file system. 
  It offers both synchronous and asynchronous methods to perform file and directory operations.
*/

// Importing the fs module
import fs from 'fs'; // Importing the entire fs module
// or
// import { readFile, writeFile } from 'fs'; // Importing individual methods from the module

// Asynchronous Methods

/*
  Asynchronous methods in the fs module use callbacks and are preferred in most 
  Node.js applications to avoid blocking the event loop.
*/

// Reading Files with Specified Encoding

fs.readFile('example.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err); // Handle error during file read
        return;
    }
    console.log('Contents of the file:', data); // Log the contents of the file
});

// Reading Files without Specifying Encoding

fs.readFile('example.txt', (err, data) => {
    if (err) throw err; // Handle error during file read
    console.log('Buffer object:', data); // Outputs a Buffer object
    console.log(data.toString('utf-8')); // Convert Buffer to String using UTF-8 encoding
});

// Writing Files

fs.writeFile('example.txt', 'Hello, world!', 'utf8', (err) => {
    if (err) {
        console.error('Error writing file:', err); // Handle error during file write
        return;
    }
    console.log('File written successfully'); // Confirm file was written
});

// Appending to Files

fs.appendFile('example.txt', ' Appended text.', 'utf8', (err) => {
    if (err) {
        console.error('Error appending file:', err); // Handle error during file append
        return;
    }
    console.log('Text appended successfully'); // Confirm text was appended
});

// Reading Directory Contents

fs.readdir('.', (err, files) => {
    if (err) {
        console.error('Error reading directory:', err); // Handle error during directory read
        return;
    }
    console.log('Directory contents:', files); // Log the contents of the directory
});

// Checking File/Directory Existence

fs.access('example.txt', fs.constants.F_OK, (err) => {
    if (err) {
        console.error('File does not exist'); // Handle case where file doesn't exist
        return;
    }
    console.log('File exists'); // Confirm file exists
});

// 1. fs.constants.F_OK
// Check if the file is visible (i.e., exists).

// 2. fs.constants.R_OK
// Check if the file is readable.

// 3. fs.constants.W_OK
// Check if the file is writable.

// 4. fs.constants.X_OK
// Check if the file is executable.

// You can combine these constants using the bitwise OR operator (|) to check multiple permissions at once:

// Example: Check if the file is readable and writable
fs.access('path/to/file', fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if (err) {
        console.error('File is not readable/writable');
    } else {
        console.log('File is readable and writable');
    }
});

// fs Promise-Based API

import fsPromises from 'fs/promises'; // Importing the promise-based API from the fs module
// or
import { readFile } from 'fs/promises'; // Importing individual promise-based methods

// Reading Files Using Promises

fsPromises.readFile('example.txt', 'utf8')
    .then(data => console.log('File contents:', data)) // Log the contents of the file
    .catch(err => console.error('Error reading file:', err)); // Handle error during file read

// Writing Files Using Promises

fsPromises.writeFile('example.txt', 'Hello, world!', 'utf8')
    .then(() => console.log('File written successfully')) // Confirm file was written
    .catch(err => console.error('Error writing file:', err)); // Handle error during file write

/*
  Instead of using promise chaining, you can also use async/await for better readability.
*/

// Synchronous Methods

/*
  Synchronous methods block the event loop and should be used cautiously in performance-critical applications.
*/

// Reading Files Synchronously

try {
    const data = fs.readFileSync('example.txt', 'utf8'); // Read file synchronously
    console.log('File contents:', data); // Log the contents of the file
} catch (err) {
    console.error('Error reading file:', err); // Handle error during file read
}

// Writing Files Synchronously

try {
    fs.writeFileSync('example.txt', 'Hello, world!', 'utf8'); // Write file synchronously
    console.log('File written successfully'); // Confirm file was written
} catch (err) {
    console.error('Error writing file:', err); // Handle error during file write
}
