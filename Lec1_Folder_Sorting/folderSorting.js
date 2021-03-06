const fs = require("fs");
const path = require("path");
const extensions = require("./util");
let folderPath = "./assets";
let extfolderPath;

function createFolder(){
    fs.mkdirSync(extfolderPath);
}

function moveFile(fileName) {
    // copy file
    let sourceFilePath = `${folderPath}/${fileName}`; 
    let destinationFilePath = `${extfolderPath}/${fileName}`; 
    fs.copyFileSync(sourceFilePath , destinationFilePath);
  
    // delete file
    fs.unlinkSync(sourceFilePath);
  }

function checkFolder(extensionName){
     

    for(let key in extensions){
        if(extensions[key].includes(extensionName)){
            extfolderPath =folderPath;
            extfolderPath += "/"+key;
            break;
        }

    }
    return fs.existsSync(extfolderPath);

}

function sortFolder(folderPath){
    let content = fs.readdirSync(folderPath);
    console.log(content);
    for(let i =0 ; i < content.length ; i++)
    {
        let extensionName = path.extname(content[i]);
        console.log(extensionName);
        let isFolder = checkFolder(extensionName);
        if(isFolder){
            moveFile(content[i]);
        }else{
            createFolder();
            moveFile(content[i]);
        }
    }

}

sortFolder(folderPath);