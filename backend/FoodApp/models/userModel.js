let {Db_link} = require('../secrets/secrets');
const mongoose = require("mongoose");
let {usersStructure} = require('./usersStructure');
mongoose.connect(Db_link).then(function(db){
console.log("connected to db")
}).catch((err)=>{
    console.log(err);
})

const userSchema = new mongoose.Schema(usersStructure);
userSchema.pre("save",function(next){
    this.confirmPassword = undefined;
    next();
})
const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;