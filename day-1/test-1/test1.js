

// Sample Input:
// [
//   { name: "Roorkee", rainfall: [5, 6, 5, 5, 4, 7, 8] },
//   { name: "Pauri", rainfall: [3, 3, 3, 1, 2, 2, 2] },
// ];

// Sample Output:
// [
//   { name: "Roorkee", avgRainfall: 5.714285714285714 },
//   { name: "Pauri", avgRainfall: 2.2857142857142856 },
// ];
// function fun (data){
//     let ans =[];
//     for(let i in data){
//         let cdataObj = data[i]; 
//         let cans ={
//            name: cdataObj["name"],
//         };
//         let avgsum =0;
//         for(let j in cdataObj["rainfall"]){
//             avgsum+= cdataObj["rainfall"][j];
//         }
//         avgsum = avgsum/cdataObj["rainfall"].length;
//         cans["avgRainfall"]= avgsum;
//         ans.push(cans);
//     }
//     return ans;
// }
// console.log(fun([
//     { name: "Roorkee", rainfall: [5, 6, 5, 5, 4, 7, 8] },
//     { name: "Pauri", rainfall: [3, 3, 3, 1, 2, 2, 2] },
//   ]));

// function flatten(obj,parent,ans={}){
//     // let ans;
//     for(let i in obj){
//         let key = parent == ""? i :parent+"__"+i;
//         if(typeof obj[i] == 'object' && !Array.isArray(obj[i]) ){
//             flatten(obj[i],i,ans);
//         }else{
//             ans[key]= obj[i];
//         }
//     }
//     return ans;
// }

// console.log(flatten({
//     name: {
//         first: "robin",
//         last: "negi",
//     },
//     address: {
//         city: {
//         name: "Gwalior",
//         },
//         landmark: "Badri Marg",
//         street: "22",
//     },
//     }))
let arr = [1, 2, 3];
(function () {
  for (x in arr) arr.unshift(arr.pop());
  console.log(arr);
})();

let randomAdder = function (arr = ["a", "b"]) {
  arr[arr.length * arr.length] = arr.length * arr.length;
};

randomAdder(arr);
randomAdder();

console.log(arr[9]);
console.log(arr[8]);