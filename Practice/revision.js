function fun(){
    let ans =0;
    if(arguments[0] == 'a'){
        for(let i =1 ; i < arguments.length ; i++)
            ans +=arguments[i];
    }else{
        ans = 1;
        for(let i =1 ; i < arguments.length ; i++)
            ans *=arguments[i];
    }
    return ans;
}

// string by nature are immutable
(()=>{

    // str.slice()
    // let str = "the end";
    // str = str.slice(2,4);
    // console.log(str);

    // str.replace() -> replace first occurance 
    // let str = "the moon is sweet";
    // str = str.replace("moon", "sugar");
    // console.log(str);
    

    // // upper case conversion

    // let str = "the end";
    // str = str.toUpperCase();
    // console.log(str);

    // // lower case conversion

    // let str = "the end";
    // str = str.toLowerCase();
    // console.log(str);

    //trim function -- remove space from start and end
    // use case 
    // when geting data from api sometime there is extra space type by user e.g in their fname or lname 
    // let str = "     the    end      ";
    // str = str.trim();
    // console.log(str);

    // str.charcodeAt(index) return ASCII value 
    // let str = "ABC";
    // console.log(str.charCodeAt(0));

    // str.split - split string into array
    let str = "the end";
    str = str.split(" ");
    console.log(str);


})()

console.log(fun('a',2,3))
console.log(fun('m',2,3))