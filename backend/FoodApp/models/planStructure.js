const mongoose = require("mongoose");
module.exports = {
    planStructure:{
       name: {
            type: String,
            required: [true, "kindly pass the name"],
            unique: true,
            // errors
            maxlength: [40, "Your plan length is more than 40 characters"],
        },
        duration: {
            type: Number,
            required: [true, "You Need to provide duration"]
        },
        price: {
            type: Number,
            required: true,
        },
        ratingsAverage: {
            type: Number,
        },
        discount: {
            type: Number,
            validate: {
                validator: function () {
                    return this.discount < this.price;
                },
                message: "Discount must be less than actual price",
            },
        },
        reviews: {
            //   array of object id 
            type: [mongoose.Schema.ObjectId],
            ref: "reviewModel"
        },
        averageRating: Number,
        planImages: {
            type: [String]
        }
    }

}