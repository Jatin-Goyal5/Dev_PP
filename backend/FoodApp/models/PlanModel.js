let {Db_link} = require('../secrets/secrets');
const mongoose = require("mongoose");
let {planStructure} = require('../models/planStructure');
mongoose.connect(Db_link).then(()=>{
    console.log('connected to db')
}).catch((e)=>{
    console.log('error connecting to db')
});

const planSchema = new mongoose.Schema(planStructure);

const planModel = mongoose.model("planModel",planSchema);
module.exports =planModel;