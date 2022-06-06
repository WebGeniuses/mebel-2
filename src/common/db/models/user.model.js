const mongoose = require("mongoose")

const {Schema,Types} = require("mongoose");


const UserSchema =  new Schema({
    name: String,
    phoneNumber: String
},{
    timestamps:true
})
 const UserModel = mongoose.model("users",UserSchema);

 module.exports = {UserModel};