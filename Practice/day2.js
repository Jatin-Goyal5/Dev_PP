// setTimeout and setInterval is not js function but an enviroment function i.e
// browser or node 
// setInterval keep executing function in cycle 
// setInterval(function(){
//     console.log("hello")
// },2000)

// 1sec = 1000 milisecond
setTimeout(function(){
    console.log("hello")
},2000);
function sayhi(){
    console.log("world");
}

sayhi();