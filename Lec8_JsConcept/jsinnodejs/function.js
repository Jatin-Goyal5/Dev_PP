// function spoon(s)
// {
//     s = s.split(" ");
    
//     console.log(s[1].charAt(0));
//     let temp = s[0].charAt(0);
//     s[0].replace(s[0].charAt(0),s[1].charAt(0))
//     s[1].replace(temp,s[1].charAt(0))
    
//     console.log(s);

// }

// spoon("kite flying");

let obj = {"concept":""};

console.log(JSON.stringify(obj).slice(0, 12).slice(0,12));
console.log(
  JSON.parse(
    JSON.stringify(obj).slice(0, 12) + "JSON" + JSON.stringify(obj).slice(12)
  ).concept
);

// arguments and parameters
function callMe(param1 , param2){
  console.log(param1 , param2);
}

// function invoke +. known as arguments
let arg1 = 10;
let arg2 = 20;
callMe( arg1 , arg2  );