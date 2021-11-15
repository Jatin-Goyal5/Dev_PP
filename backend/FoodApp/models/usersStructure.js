const emailValidator=require("email-validator");
module.exports = {
    usersStructure:{
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            validate:
            function(){
                return emailValidator.validate(this.email);
            },
        },
        age:{
            type:Number,
            // required:true
        },
        password:{
            type:String,
            minlength:7,
            required:true
    
        },
        confirmPassword:{
            type:String,
            minlength:7,
            validate:function(){
                return this.password == this.confirmPassword
            },
            required:true
        },
        createdAt:{
            type:Date,
        }
    
    }
}