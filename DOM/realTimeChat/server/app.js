const express = require("express");
const { Server } = require("socket.io");
// server is created !!!
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let userList =[];

io.on("connection",function(socket){
    // console.log(socket.id+ "");
    socket.on("userConnected",function(username){
        let user ={
            id:socket.id,
            username,
        }
        userList.push(user);
        socket.emit("onlineList",userList);
        socket.broadcast.emit("join",user);

        console.log(userList);
    });

    // sending message to other
    socket.on("chat",function(chatObj){
        socket.broadcast.emit("message",chatObj);
    });
    // disconnect
    socket.on("disconnect",function(){
        let leftUser;
        let remainUser = userList.filter(function(user){
            if(user.id == socket.id){
                leftUser = user;
                return false;
            }
            return true;
        });
        userList = remainUser;
        socket.broadcast.emit("leave",leftUser);
    });
})






app.get("/home",function(req,res){
    res.send("heLLo World");

});


server.listen(3000,function(){
    console.log("server started");
});