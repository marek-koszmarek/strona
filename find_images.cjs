const fs = require('fs');
const path = require('path');

function findImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist') continue;
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      findImages(path.join(dir, file), fileList);
    } else if (file.match(/\.(webp|png|jpg|jpeg)$/i)) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

console.log(findImages('.').join('\n'));
