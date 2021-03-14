const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const json2xls = require("json2xls");

// let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

function matchInfo(url){
    request(url,cb);
}

function cb(request, response,body){
    let ch = cheerio.load(body);

    let bothInning = ch(".match-scorecard-page .Collapsible");
    for(let i =0 ; i < bothInning.length ; i++){
        let inning = ch(bothInning[i+'']);
        let teamName = inning.find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        // console.log(teamName);

        let batsmanTable = inning.find(".table.batsman tbody tr");

        for(let j =0 ; j < batsmanTable.length -1; ++j){
            let tdData =ch(batsmanTable[j]).find("td");
            if(tdData.length > 1){
                // valid tds
                let batsmanName = ch(tdData['0']).text().trim();
                let runs = ch(tdData['2']).text().trim();
                let balls = ch(tdData['3']).text().trim();
                let fours = ch(tdData['5']).text().trim();
                let sixes = ch(tdData['6']).text().trim();
                let strikeRate = ch(tdData['7']).text().trim();
                addingData(teamName, batsmanName , runs ,balls,fours,sixes,strikeRate);
            }

        }
    }


}

function updateBatsmanFile(batsmanPath,runs ,balls,fours,sixes,strikeRate){
    let stringifiedData = fs.readFileSync(batsmanPath);
    let batsmanArray = JSON.parse(stringifiedData);
    // console.log(batsmanArray);
    let cInning = {
        runs,
        balls,
        fours,
        sixes,
        strikeRate
    }
    batsmanArray.push(cInning);
    
    fs.writeFileSync(batsmanPath , JSON.stringify(batsmanArray));
}

function createBatsmanFile(batsmanPath,runs ,balls,fours,sixes,strikeRate){
    let batsmanArray = [];
    let cInning = {
        runs,
        balls,
        fours,
        sixes,
        strikeRate
    }
    

    batsmanArray.push(cInning);
    let stringifiedData = JSON.stringify(batsmanArray); 
    fs.writeFileSync(batsmanPath , stringifiedData  );

}

function addingData(teamName, batsmanName , runs ,balls,fours,sixes,strikeRate){
    let teamFolderPath = `./IPL/${teamName}`;           // teamFolder Path
    let batsmanPath =`${teamFolderPath}/${batsmanName}.json`;       // batsman Path
    if(fs.existsSync(teamFolderPath)){
       
        if(fs.existsSync(batsmanPath)){
            updateBatsmanFile(batsmanPath,runs ,balls,fours,sixes,strikeRate);      // update record of json with another inning
        }else{
            createBatsmanFile(batsmanPath,runs ,balls,fours,sixes,strikeRate);          // create Batsman json file
        }

    }else{
        fs.mkdirSync(teamFolderPath);                   // create teamFolder 
        createBatsmanFile(batsmanPath,runs ,balls,fours,sixes,strikeRate);  // create Batsman json file

    }
}



module.exports = matchInfo;