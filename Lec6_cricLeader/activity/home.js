const cheerio = require('cheerio');
const request = require("request");
const fs = require("fs");

const getAllMatchesCard = require('./match-result')


let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url , cb);

function cb(req, response,body){
    let ch = cheerio.load(body);
    let aTag = ch('a[data-hover="View All Results"]');
    let clink = "https://www.espncricinfo.com/"+aTag.attr("href");
    console.log(clink);
    getAllMatchesCard(clink);    
}

