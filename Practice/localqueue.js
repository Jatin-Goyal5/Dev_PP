
// console.log(arr);
function queue(){
    let arr = [];
    return  function(op,val){
        if(op === "show"){
            console.log(arr);
        }else if(op === "insert"){
            arr.push(val);
        }else if(op === "out"){
            let k = arr.shift();
            return k;
        }   
       
    };

}
let f = queue();
f("insert",2);
f("insert",1);
f("insert",3);
f("out");
f("show");
