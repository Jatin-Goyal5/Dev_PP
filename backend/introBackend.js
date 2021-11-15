const express = require("express");

const app = express();

// mounting in express
const router = express.router();

app.use("/api/user",router);
function getUser(req,res){

}
function createUser(req,res){
    
}
function updateUser(req,res){
    
}
function deleteUser(req,res){
    
}

router.
    route('/').
    get(getUser)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser);


app.get("/",function(req,res){
    res.send("<h1>Hello</h1>");
})
let user= {
    "hero-name":"spider-man",
}
app.get("/hero",function(req,res){
    res.json(user);
})

app.listen("3000",function(){
    console.log("server started");
})