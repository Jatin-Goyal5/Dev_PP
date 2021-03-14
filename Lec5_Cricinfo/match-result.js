const cheerio = require('cheerio');
const request = require("request");
const matchInfo = require('./match');



function getAllMatchesCard(url){
    request(url , cb);
}

function cb(req,response,body){
    let ch = cheerio.load(body);
    let scoreTag = ch('a[data-hover="Scorecard"]');
    for(let i = 0 ; i < scoreTag.length ; ++i){
        let scoreLink = ch(scoreTag[i]).attr("href");
        let scoreCompLink = "https://www.espncricinfo.com/"+scoreLink;
        // console.log(scoreCompLink);
        matchInfo(scoreCompLink);
    }
}


module.exports = getAllMatchesCard;