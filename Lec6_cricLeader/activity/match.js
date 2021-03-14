const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

// const json2xls = require("json2xls");
let leaderArray =[];

// let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let count =0;
function matchInfo(url){
    count++;
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
                runs= Number(runs);
                balls= Number(balls);
                fours= Number(fours);
                sixes= Number(sixes)
                strikeRate= Number(strikeRate);
                addingLeaderBoard(teamName, batsmanName , runs ,balls,fours,sixes,strikeRate);
            }

        }
    }
    count--;
    if(count ==0){
        
        // let i =JSON.parse( fs.readFileSync('./leaderboard.json'));
        console.table(leaderArray);
        sortArray();

    }

}

function createLeader(teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    
    let firstObj = {
        teamName,
        batsmanName,
        runs,
        balls,
        fours,
        sixes,
        strikeRate,
    };
    leaderArray.push(firstObj);
    let stringifiedData = JSON.stringify(leaderArray); 
    fs.writeFileSync('./leaderboard.json' , stringifiedData  );
}

function processLeaderBoard(teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    let leaderBordPath = `./leaderboard.json`;
    let stringifiedData = fs.readFileSync(leaderBordPath);
    leaderArray = JSON.parse(stringifiedData);
    // console.log(batsmanArray);
    for(let i =0 ; i < leaderArray.length ; ++i){
        let obj = leaderArray[i];
        if(obj.teamName == teamName && obj.batsmanName == batsmanName){
            obj.runs += runs;
            obj.balls += balls;
            obj.fours += fours;
            obj.sixes += sixes;
            fs.writeFileSync(leaderBordPath , JSON.stringify(leaderArray));
            return;
        }
        
    }
    let firstObj = {
        teamName,
        batsmanName,
        runs,
        balls,
        fours,
        sixes,
        strikeRate,
    };
    leaderArray.push(firstObj);
    
    fs.writeFileSync(leaderBordPath , JSON.stringify(leaderArray));
}

function addingLeaderBoard(teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    let leaderBordPath = `./leaderboard.json`;
    if(fs.existsSync(leaderBordPath)){
        processLeaderBoard(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
    }else{
       createLeader(teamName,batsmanName,runs,balls,fours,sixes,strikeRate); 
    }

}




module.exports = matchInfo;