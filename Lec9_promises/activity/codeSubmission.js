const puppeteer = require("puppeteer");

let email = "girige3831@kindbest.com";
let pass = "123456789";
let tab;
let idx;
let code;

let openBrowserPromises = puppeteer.launch({
    headless: false,
    defaultViewport:null , 
  
    args:["--start-maximised"]
});

openBrowserPromises.then(function(browser){
    // console.log(browser);
    let allBrowserPagesPromise = browser.pages();
    return allBrowserPagesPromise;
}).then(function(pages){
    tab= pages[0];
    // console.log(pages.length);
   let currentPagePromise = tab.goto("https://www.hackerrank.com/auth/login");
    return currentPagePromise;
}).then(function(page){
    let input_1promise = tab.type("#input-1",email);
    return input_1promise;
    // console.log("page opened");
}).then(
    function(){
        let input_2promise = tab.type("#input-2",pass);
        return input_2promise;
    }
).then(
    function(){
        let buttonPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
        return buttonPromise;
    }
).then(
   function(){
    let waitAndClickPomise = waitAndClick("#base-card-1-link");
    return waitAndClickPomise;
   }
).then(function(){
    let waitAndClickPomise = waitAndClick('a[data-attr1="warmup"]');
    return waitAndClickPomise;
}).then(function(){
    let waitPromise = tab.waitForSelector(".js-track-click.challenge-list-item");
    return waitPromise;
}).then(function(){
    // provide promise for ques tags
    let allAtagsPromise = tab.$$( ".js-track-click.challenge-list-item");
    return allAtagsPromise;
}).then(function(allAtagsPromise){
    /// sare ques kai link kai promise mil chuke hai hume 
    let listForQues =[];
    for(let i =0 ; i < allAtagsPromise.length ; ++i){
        let cQuesTag = allAtagsPromise[i];
        let ctagPromise = tab.evaluate(function(elem){
            return elem.getAttribute("href");},cQuesTag
            );
        listForQues.push(ctagPromise);
    }
    // console.log(listForQues);
    let allQuesPromise = Promise.all(listForQues);
    return allQuesPromise; 
}).then(function(allQuesPromise){
    let allQuesCompleteLink = allQuesPromise.map(function(data){
        return "https://www.hackerrank.com"+data;
    });
    let firstQuesPromise = solveQues(allQuesCompleteLink[0]);
    return firstQuesPromise;

}).then(function(){
    console.log("warmup challenge opened")
}).catch(function(e){
    console.log("unable to open reason "+e );
});




function waitAndClick(selector){
    return new Promise(function(resolve, reject){
        let waitPromise = tab.waitForSelector(selector,{visible:true});
        waitPromise.then(
           function(){
            let cPromise =  tab.click(selector);
            return cPromise;
           }
        ).then(function(){
            resolve();
        }).catch(function(e){
            reject(e);
        });
    });
}

function getCode(){
    return new Promise(function(resolve,reject){
        let contentPromise = tab.waitForSelector('.hackdown-content h3');
        contentPromise.then(function(){
            let allContentPromise = tab.$$('.hackdown-content h3');
            return allContentPromise;
        }).then(function(allContentPromise){
            // sari heading ka promise return kr dega hame 
            let allheadingTag = []; // promise ka array
            for(let i =0 ; i < allContentPromise.length ; ++i){
                let cheadingPromise = tab.evaluate(function(element){
                    return element.textContent;
                },allContentPromise[i]);
                    allheadingTag.push(cheadingPromise);
            }

            let allheadingPromise = Promise.all(allheadingTag);
            return allheadingPromise;

        }).then(function(allheadingName){
            // find kr dega index for c++
            for(let i =0 ; i < allheadingName.length; i++){
                if(allheadingName[i] == 'C++'){
                    idx =i;
                    break;
                }
            }
            // code ka promise dega 
            let allCodePromise = tab.$$('.hackdown-content .highlight');
            return allCodePromise;

        }).then(function(allCodePromise){
            let codeDiv = allCodePromise[idx];
            let codePromise = tab.evaluate(function(e){
                return e.textContent;
            },codeDiv);
            resolve(codePromise);
        }).catch(function(error){
            console.log(error);
            reject(error);
        });
    });
   
}

function pasteCode(){
    return new Promise(function(resolve , reject){
        let problemPromise = tab.click('div[data-attr2="Problem"]');
        problemPromise.then(function(){
            // fake editor ko checkbox pai click ka promise
            let fakeEditorPromise = waitAndClick('.custom-input-checkbox');
            return fakeEditorPromise;
        }).then(function () {
            let waitForTextBoxPromise = tab.waitForSelector(".custominput");
            return waitForTextBoxPromise;
        }).then(function(){
            let addCodePromise =tab.type('.custominput',code);
            return addCodePromise;
        }).then(function(){
            let controlkeyPromise = tab.keyboard.down('Control');
            return controlkeyPromise;
        }).then(function(){
            let akeyPromise = tab.keyboard.press('A');
            return akeyPromise;
        }).then(function(){
            let xkeyPromise = tab.keyboard.press('X');
            return xkeyPromise;
        }).then(function(){
            let realEditorPromise = tab.click('.monaco-scrollable-element.editor-scrollable.vs');
            return realEditorPromise;
        }).then(function(){
            let akeyPromise = tab.keyboard.press('A');
            return akeyPromise;
        }).then(function(){
            let vkeyPromise = tab.keyboard.press('V');
            return vkeyPromise;
        }).then(function(){
            let controlkeyPromise = tab.keyboard.up('Control');
            return controlkeyPromise;
        }).then(function(){
            resolve();
        }).catch(function(e){
            console.log(e);
            reject();
        })
    });
}

function solveQues(link){
    return new Promise(function(resolve,reject){
        let v = tab.goto(link);
        v.then(function(){
            let editorialPromise = waitAndClick('div[data-attr2="Editorial"]');
            return editorialPromise;
        }).then(function(){
            let getCodePromise = getCode();
            return getCodePromise;
        }).then(function(codePromise){
            code = codePromise;
            console.log(code);
            let pastCodePromise = pasteCode();
            return pastCodePromise;
        
        }).then(function(){
            let submitPromise = tab.click('.pull-right.btn.btn-primary.hr-monaco-submit')
            return submitPromise;
        }).then(function(){
            resolve();
        }).catch(function(){
            reject();
        });

    });
}
