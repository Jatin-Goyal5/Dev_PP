const userModel = require('../models/userModel');
const express = require('express');
const jwt = require('jsonwebtoken');
const authRouter= express.Router();
const {JWT_KEY} = require('../secrets/secrets');


authRouter
    .post("/signup", setCreatedAt, signupUser)
    .post("/login", loginUser);



    function setCreatedAt(req, res, next) {
        // {}
        let body = req.body;
        let length = Object.keys(body).length;
        if (length == 0) {
            return res.status(400).json({
                message: "can't create user when body i empty "
            })
        }
        req.body.createdAt = new Date().toISOString();
        next();
    }
    

async function signupUser(req, res) {
    //email,user name ,password
    let userObj = req.body;
    try {
        
        console.log("userObj", req.body);
        let user = await userModel.create(userObj);
        console.log("user", user);
        res.status(200).json({
            message: "user created",
            createdUser: user
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })

    }

}
async function loginUser(req,res){
    let {email,password} = req.body;
    try{
        if(req.body){
            let user = await userModel.findOne({email:email});
            console.log("available",user);
            if(user.password== password){
                let token = jwt.sign({id:user["_id"]},JWT_KEY);
                res.cookie("jwt",token,{
                    httpOnly:true
                });
                res.status(200).json({
                    message: "user found",
                    createdUser: user
                })
            }else {
                return res.status(401).json({
                    message: "Email or password is incorrect",
                })
            }
        }else{
            return res.status(403).json({
                message: "Email is not present",
            })
        }
    }catch(e){
        res.status(500).json({
            message: e.message
        })
    }
    
}

module.exports =authRouter;