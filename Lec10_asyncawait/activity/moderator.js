const puppeteer = require("puppeteer");
const challenges = require('./challenges')
let email = "girige3831@kindbest.com";
let pass = "123456789";
 let tab;


(async function(){
    try{
       let browser =  await puppeteer.launch({
            headless: false,
            defaultViewport:null , 
          
            args:["--start-maximised"]
        });
        let allPages = await browser.pages();
        tab = allPages[0];
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
        await tab.waitForSelector('.table-body.mlB.text-center a',{visible:true})
        let allAtagChallenge = await tab.$$('.table-body.mlB.text-center a');
        for(let i =0 ; i < allAtagChallenge.length ; ++i ){
            let ctag = allAtagChallenge[i];
            let createButtonLink = await tab.evaluate( function(elem){ 
            return elem.getAttribute("href"); }  ,  ctag);
            createButtonLink = 'https://www.hackerrank.com'+createButtonLink;
            console.log(createButtonLink);
            await moderatorTab(createButtonLink,browser);
        }
        // await allAtagChallenge[0].click();
        // moderatorTab(allAtagChallenge[0]);

        
    }catch(e){
        console.log('unable to open '+e)
    }
    

    
})();

async function moderatorTab(moderatorLink,browser){

    let newTab = await browser.newPage();
    newTab.goto(moderatorLink);
    // await moderatorLink.click();
    await newTab.waitForSelector('li[data-tab="moderators"] a',{visible:true});
    await newTab.click('li[data-tab="moderators"] a');
    await newTab.waitForSelector('#moderator',{visible:true});
    await newTab.type('#moderator','iubh');
    await newTab.click('.btn.moderator-save');
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.close();

}