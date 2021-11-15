const express = require("express");
const app = express();
const port = 8080;
const userRouter = require("./Router/userRouter");
const planRouter = require('./Router/PlanRouter');
const authRouter = require('./Router/authRouter');
const cookieParser = require('cookie-parser');

app.use(express.static('public'))
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/plans",planRouter);



app.listen(port,function(){
    console.log("server Started");
})