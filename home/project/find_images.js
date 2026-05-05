const fs = require('fs');
const path = require('path');

function findWebpFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        findWebpFiles(filePath, fileList);
      }
    } else if (filePath.endsWith('.webp')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allWebp = findWebpFiles(process.cwd());
console.log(allWebp.join('\n'));
