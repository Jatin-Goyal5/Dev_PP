const puppeteer = require("puppeteer");
const challenges = require('./challenges')
let email = "girige3831@kindbest.com";
let pass = "123456789";
// let tab;


(async function(){
    try{
       let browser =  await puppeteer.launch({
            headless: false,
            defaultViewport:null , 
          
            args:["--start-maximised"]
        });
        let allPages = await browser.pages();
       let tab = allPages[0];
        await tab.goto('https://www.hackerrank.com/auth/login');
        await tab.type("#input-1",email);
        await tab.type("#input-2",pass);
        await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
        await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
        await tab.click('div[data-analytics="NavBarProfileDropDown"]');
        await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
        await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');

        await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a' , {visible:true});
        let bothATags = await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');
        let manageChallengeATag = bothATags[1];
        await manageChallengeATag.click();

        /// naya page khula hai toh lagana padega wait
        await tab.waitForSelector('.btn.btn-green.backbone.pull-right' , {visible:true});
        let createButton = await tab.$('.btn.btn-green.backbone.pull-right');
        let createButtonLink = await tab.evaluate( function(elem){ 
            return elem.getAttribute("href");
        }  ,  createButton);
        createButtonLink = 'https://www.hackerrank.com'+createButtonLink;
        console.log(createButtonLink);

        for(let i =0 ; i < challenges.length ;++i){
           await createNewTab(createButtonLink,browser,challenges[i]);
        }
        // createNewTab(createButtonLink,browser,challenges[0]);

        
    }catch(e){
        console.log('unable to open '+e)
    }
    

    
})();

async function createNewTab(createButtonLink,browser,challengeInfo){

    // {
    //     "Challenge Name": "Pep_Java_1GettingStarted_1IsPrime",
    //     "Description": "Question 1",
    //     "Problem Statement": "Take as input a number n. Determine whether it is prime or not. If it is prime, print 'Prime' otherwise print 'Not Prime.",
    //     "Input Format": "Integer",
    //     "Constraints": "n <= 10 ^ 9",
    //     "Output Format": "String",
    //     "Tags": "Basics",
    //   },
    try{
        let newTab = await browser.newPage();
        await newTab.goto(createButtonLink);
        await newTab.waitForSelector('#name',{visible:true})
        await newTab.type('#name',challengeInfo["Challenge Name"]);
        await newTab.type('#preview',challengeInfo["Description"])
        await newTab.type('#problem_statement-container .CodeMirror textarea',challengeInfo["Problem Statement"])
        await newTab.type('#input_format-container .CodeMirror textarea',challengeInfo["Input Format"]);
        await newTab.type('#constraints-container .CodeMirror textarea',challengeInfo["Constraints"]);
        await newTab.type('#output_format-container .CodeMirror textarea',challengeInfo["Output Format"])
        await newTab.type('#tags_tag',challengeInfo["Tags"]);
        await newTab.keyboard.press('Enter');
        await newTab.click('.save-challenge.btn.btn-green');
        // await tab.waitForTimeOut(3000);
        await newTab.close();

    }catch(e){
        console.log(e);
    }
}

// async function waitAndEnter(selector , info,newTab){
//     await newTab.waitForSelector(selector,{visible:true})
//     await newTab.type(selector,info);
// }