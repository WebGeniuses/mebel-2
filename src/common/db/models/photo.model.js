const { Schema, default: mongoose, model, Types } = require("mongoose");



const PhotoSchema =  new Schema({
    path: String,
    name: String
},{
    timestamps:true
})
 const PhotoModel = mongoose.model("photo",PhotoSchema);

 module.exports = {PhotoModel};