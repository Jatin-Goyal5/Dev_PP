// converting one data type into another
// two types = > implicit and explicit'

// alert() do implicit conversion

// type of return string 
// e.g 
console.log(typeof(typeof(typeof(false))));

// output=> string
console.log(typeof(false));
// output-> "boolean"


// conversion of(undefined ) gives Nan 
console.log(Number(undefined)); // gives Nan
// while conversion of Number(null) gives 0
console.log(Number(0)); //  gives 0

console.log(Number("true")); //  gives Nan

console.log(Number(false)); //  gives 0

let s = "    5      ";
console.log(Number(s));  // gives 5
