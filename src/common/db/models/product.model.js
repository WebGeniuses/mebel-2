const { Schema, default: mongoose, model, Types } = require("mongoose");

const ProductSchema = new Schema({
    name: String,
    destription:String,
    price:Number,
    photoId:{
        ref:"photo",
        type:Types.ObjectId,
    }
},{
    timestamps:true,
})

const ProductModel = new mongoose.model("Products",ProductSchema);
module.exports = {ProductModel};