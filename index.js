#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const program = require('commander');
  program 
    .option('-v, --validate')
    .option('-s, --stats')
    program.parse(process.argv);
let mdLinks = {};
const url = "https://es.wikipedia.org/wiki/Markdown";
const axios = require('axios');


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
  mdLinks.requestHTTP(urls);
  }
  return urls;
});

mdLinks.requestHTTP = async url => {
  let validateUrl = 0;
  let brokenUrl = 0;
for(let i = 0; i < url.length; i++) {
      try {
        const response = await axios.head(url[i]);
       const data = response.status;
       validateUrl++;
       console.log(url[i] + ' OK', data);
        } catch (error) {
        brokenUrl++;
        console.log(url[i] + ' Fail', error.message);
     }
    };
    if (program.stats) {
    console.log('\n Total: ' + urls.length + '\n Unique: ' + validateUrl + '\n Broken' + brokenUrl);
    }
  }
  


    


module.exports = mdLinks;

//module.exports = filePath => path.extname(filePath) === '.md';
