const fs = require('fs');

let files =['./f1.txt' , './f2.txt', './f3.txt'];

let f1kaPromise = fs.promises.readFile(files[0]);

for(let i =1 ; i < files.length ; ++i){
    f1kaPromise = f1kaPromise.then(function(data){
        console.log(data+'');
        let newFilePromise = fs.promises.readFile(files[i]);
        return newFilePromise;

    })
}

f1kaPromise.then(function(data){
    console.log(data+'');
});
