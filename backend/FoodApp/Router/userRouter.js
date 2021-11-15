const userModel= require('../models/userModel');
const express = require('express');
const userRouter = express.Router();
const protectRoute= require("./authHelper");
userRouter
        .route("/:id")
        .get(getUserById)
        .delete(deleteUserById)
        .patch(updateUserById);

userRouter
        .get("/",protectRoute,getAllUser);


async function getUserById(req, res) {
    console.log(req.params);
        if(req.params){
                try{
                        let id = req.params.id;
                        // console.log(id)
                        let user =await userModel.findById(id);
                        console.log(user);
                        res.status(200).json({
                                message:"user available",
                                user,
                        })
                }catch(e){
                        res.status(400).send("invalid id");
                }
        }else{
                res.status(400).send("unable to find id");
        }
       
    
}
async function deleteUserById(req, res) {
        console.log(req.params);
            if(req.params){
                    try{
                            let id = req.params.id;
                            let user =await userModel.findByIdAndDelete(id);
                            res.status(200).json({
                                    message:"user available",
                                    user,
                            })
                    }catch(e){
                            res.status(400).send("invalid id");
                    }
            }else{
                    res.status(400).send("unable to find id");
            }
           
        
    }

async function updateUserById(req, res) {
        try{
                let id = req.params.id;
                let obj = req.body;
                // console.log(obj)
                let user = await userModel.findByIdAndUpdate(id,{$set:obj});
                res.status(200).json({
                        message:"user updated",
                        user,
                })
        }catch(e){
                console.log(e);
                res.status(400).send("unable to find id");
        }
    
}

async function getAllUser(req,res){
        try{
                let usersList= await userModel.find();
                return res.status(200).json({
                        message:"userList",
                        usersList,
                })
        }catch(e){
                console.log(err);
                return res.status(401).json({
                        message:"not found",
                })

        }
}
module.exports= userRouter;




