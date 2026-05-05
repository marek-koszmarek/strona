const fs = require('fs');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\/Zbiorczo\//g, '/zbiorczo/');
  fs.writeFileSync(filePath, content);
}

replaceInFile('src/pages/CaseStudies.tsx');
replaceInFile('src/components/Preloader.tsx');
console.log('Replaced successfully');
