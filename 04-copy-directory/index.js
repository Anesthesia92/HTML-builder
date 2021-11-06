const path = require('path');
const fs = require('fs');
const pathDirectory = path.join(__dirname, 'files');
const pathCopyDirectory = path.join(__dirname, 'files-copy');


async function copyDir() {
  fs.mkdir(pathDirectory, { recursive: true }, (err) => {
    if (err) {
      console.log('Error');
    }
  });
}

copyDir();