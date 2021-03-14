const fs = require('fs')
let array = JSON.parse(fs.readFileSync('./leaderboard.json'));

array.sort(function(a, b){return b.runs - a.runs});
console.table(array);