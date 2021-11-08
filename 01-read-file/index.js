const path = require('path');
const fs = require('fs');

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'));
stream.on('data', (data) =>
{
  console.log(data.toString());
});

//У меня все тесты в заданиях работают нормально, хотя некоторые папки и файлы очень долго создаются.(
