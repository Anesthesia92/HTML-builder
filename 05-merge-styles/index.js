const fs = require('fs')
const path = require('path')
const linkDir = path.join(__dirname, 'styles')
const bundleCss = fs.createWriteStream(path.join(__dirname, 'project-dist','bundle.css'))

async function filesCopy () {
try {
  fs.promises.readdir(linkDir, {withFileTypes: true})
    .then(files => {
      files.forEach(file => {
        const extFile = path.extname(file.name)
        if (file.isFile() && extFile === '.css') {
         const stream = fs.createReadStream(path.resolve(linkDir, file.name));
          stream.on('data', data => bundleCss.write(data));
        }
      });
    })
  console.log('styles copied');
}
catch (err) {
  console.log(err);
}
}

filesCopy ();