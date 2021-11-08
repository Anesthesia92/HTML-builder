const path = require('path');
const fs = require('fs');
const link = path.join(__dirname, 'secret-folder');

async function checkObj () {
  try {
    let files = await fs.promises.readdir(link, {withFileTypes: true});
    for (const file of files) {
      if (file.isFile()) {
        let linkOfFile = path.join(__dirname, `secret-folder/${file.name}`);
        let infoOfFile = path.parse(linkOfFile);
        let fileExt = infoOfFile.ext.slice(1);
        fs.stat(linkOfFile, (err, stats) => {
          console.log(`${infoOfFile.name} - ${fileExt} - ${Math.ceil(stats.size / 1024)}kb`);
        });
      }}
  } catch (err) {
    console.error(err);
  }
}
checkObj();

//В чате были споры, делить на 1000 или на 1024, по итогу решили, что на 1024. Плюс я округлила.