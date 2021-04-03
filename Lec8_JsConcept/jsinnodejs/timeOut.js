var idx = 5;
function callMe(){
    setTimeout( cb , 5000);
    function cb(){
        console.log(idx);
    }
}
callMe();