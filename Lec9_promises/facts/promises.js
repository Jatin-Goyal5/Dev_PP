const fs = require("fs");
let f1kapendingpromise = fs.promises.readFile("./f1.txt");


f1kapendingpromise.then(function(data){
    console.log(data+"");

    let f2kapendingpromise = fs.promises.readFile("./f2.txt")
    f2kapendingpromise.then(function(data){
        console.log(data+"");
        let f3kapendingpromise = fs.promises.readFile("./f3.txt")
        f3kapendingpromise.then(function(data){
            console.log(data+"");
        });
    });
});

// f1kapendingpromise.catch(function(e){
//     console.log(e);
// });




// f2kapendingpromise.catch(function(e){
//     console.log(e);
// });



// f3kapendingpromise.catch(function(e){
//     console.log(e);
// });

