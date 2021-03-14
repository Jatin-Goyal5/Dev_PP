const fs = require("fs");
const cheerio = require("cheerio");

const htmlKaData = fs.readFileSync("./index.html");
const ch = cheerio.load(htmlKaData);
// console.log(ch);

const pTag = ch(".main").text();
console.log(pTag);