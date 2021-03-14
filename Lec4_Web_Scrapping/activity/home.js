const request = require("request");
const cheerio = require("cheerio");

let lastBallCommentary = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
let highestWicketTaker = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"

// let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
request(highestWicketTaker, cb);

function cb(error, response, body) {
  parseBody(body);
}

function parseBody(html) {
  // i will get html here of cricinfo ipl home page !!
  let ch = cheerio.load(html);
  let score = ch('table.table.bowler>tbody>tr');
//   let aTagKaData = ch(score['1']).text();
//   console.log(score.text());
let mwicket =0;
let winerName = "";
score.each((index, element) => {
    let wicket = ch(ch(element).find("td")[4]).text();
    let cName = ch(ch(element).find("td")[0]).text();
    if(mwicket < wicket){
        mwicket = wicket;
        winerName= cName;
    }
    // mwicket = mwicket < wicket?wicket:mwicket;
    console.log(wicket);
  });

  console.log("winner "+winerName);

}