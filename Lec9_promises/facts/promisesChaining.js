const fs = require("fs");


let f1kapendingpromise = fs.promises.readFile("./f1.txt");


// promises chaining

f1kapendingpromise.then(function(data){
    console.log(data+"");
    let f2kapendingpromise = fs.promises.readFile("./f2.txt");
    return f2kapendingpromise;
}).then(
   
    function(data){
        console.log(data+"");
        let f3kapendingpromise = fs.promises.readFile("./f3.txt");
        return f3kapendingpromise;
        // return 2;
    }
    
).then(function(data){
    console.log(data+"");

});