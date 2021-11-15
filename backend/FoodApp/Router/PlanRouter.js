const planModel = require('../models/planModel');
const express = require('express');
const { Mongoose } = require('mongoose');
const planRouter = express.Router();


planRouter
        .route("/")
        .post(createPlan)
        .get(getPlans)
        .patch(updatePlan)
        .delete(deletePlan);
async function getPlans(req,res){
    try{
        let plans = await planModel.find();
        res.status(200).json({
            message: 'all plans',
            plans:plans,
        })
    }catch(error){
        res.status(500).json({
            message: 'not Present',
        })
    }
}
async function createPlan(req,res){
    try{
        let planResponse = await planModel.create({
            "name": "Organic",
            duration:300,
            "price": 200,
            "ratingsAverage": 4,
            "discount":30,
            "review":["nice one "],
            "delivery": true,
            "averageRating": 3,
            "planImage": ["sndhfvsdvfvhjfds"]
        });
        res.status(200).json({
            message:"plan added",
            plan:planResponse,
        })
        console.log(planResponse.data);
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"unable to create",
            err:500,
        })
    }
}

function deletePlan(req,res){

}

function updatePlan(req,res){

}

module.exports= planRouter;