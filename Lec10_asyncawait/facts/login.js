const puppeteer = require("puppeteer");

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
        let createButton = tab.click('.btn.btn-green.backbone.pull-right');
        console.log(createButton);
    }catch(e){
        console.log('unable to open '+e)
    }
    

    
})();