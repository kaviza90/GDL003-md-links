const path = require('path');
const fs = require('fs');
const program = require('commander');
let mdLinks = {};

//mdlinks
mdLinks.mdSearch = filePath => path.extname(filePath) === 'md';

mdLinks.readFile = fs.readFile('README.md', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))/g;
  const found = data.match(regex);
  const urls = [];
  for (let i = 0; i < found.length; i++) {
    urls.push(found[i]);
  }
  console.log(urls);

  if (program.validate) {
    requestHTTP(urls);
  }
  return urls;
});

module.exports = mdLinks;

//module.exports = filePath => path.extname(filePath) === '.md';
