#!/usr/bin/env node
let fs = require("fs");
//input
let inputArr = process.argv.slice(2);
console.log(inputArr);
//options
let optionArr = [];
let filesArr = [];
//identify options
for(let i=0; i<inputArr.length;i++) {
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-"){
        optionArr.push(inputArr[i]);
    }
    else{
        filesArr.push(inputArr[i]);
    }
}
//options check 
let isBothPresent = optionArr.includes("-b") && optionArr.includes("-n");
if(isBothPresent) {
    console.log("either enter -n or -b option");
    return;
}
//existence
for(let i=0 ; i< filesArr.length ; i++){
    let isPresent = fs.existsSync(filesArr[i]);
    if(isPresent == false){
        console.log(`file ${filesArr[i]} is not present`);
        return;
    }
}
//read

let content = "";
for(let i=0;i<filesArr.length;i++){
    let bufferContent = fs.readFileSync(filesArr[i]);
    content += bufferContent+"\n";
}
//console.log(content);
let contentArr=content.split("\r\n");
//console.log(contentArr);


// -s -> convert big line break into a singular line break
let isSPreset = optionArr.includes("-s");
if (isSPreset == true) {
    for(let i=1 ; i<contentArr.length ; i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] = null;
        } else if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for(let i=0 ; i<contentArr.length ; i++) {
        if(contentArr[i] != null) {
          tempArr.push(contentArr[i])
        }
    }
    contentArr = tempArr;
}
console.log("``````````````````````````");
//console.log(contentArr.join("\n"));

// -n -> give numbering to all the lines
let isNPresent = optionArr.includes("-n");
if(isNPresent == true){
    for(let i=0 ; i<contentArr.length ; i++) {
        contentArr[i] = `${i + 1} ${contentArr[i]}`;
    }
}
//console.log(contentArr.join("\n"));
 

// -b ->give numbering to non-empty lines
let isBPresent = optionArr.includes("-b");
if(isBPresent == true) {
    let counter = 1
    for(let i=0 ; i< contentArr.length ; i++){
        if(contentArr[i] != "") {
            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
    }
}  
console.log(contentArr.join("\n"));  

// node wcat f1.txt f2.txt -b -s > f6.txt -> this will make new file f6 and copy content of f1 f2 in f6

