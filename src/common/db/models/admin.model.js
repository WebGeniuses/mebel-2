const { Schema, default: mongoose, model } = require("mongoose");

const AdminSchema = new Schema({
    userName: {
        required:true,
        unique:true,
        type:String,
    },
    password: {
        required:true,
        type: String,
    },
    fullName:String,
    phoneNumber:Number,
    token:String,
},{
    timestamps:true,
})

const AdminModel = new mongoose.model("Admins",AdminSchema);
module.exports = {AdminModel};