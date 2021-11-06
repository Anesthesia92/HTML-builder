const path = require('path');
const fs = require('fs');
const pathDirectory = path.join(__dirname, 'files');
const pathCopyDirectory = path.join(__dirname, 'files-copy');

async function copyDir (){
fs.mkdir(pathCopyDirectory, {recursive: true}, (err) => {
  if (err) { throw err };
});
fs.readdir(pathCopyDirectory, (err, files) => {
  if (err) { throw err };
  files.forEach(item => {
    fs.promises.unlink(path.join(pathCopyDirectory, item));
  })
});
fs.readdir(pathDirectory, (err, files) => {
  if (err) { throw err };
  files.forEach(file => {
    fs.promises.copyFile(path.join(pathDirectory, file), path.join(pathCopyDirectory, file));
  })
  console.log('Folder copied');
});
}
copyDir();
