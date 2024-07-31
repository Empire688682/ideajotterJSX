import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    pwdRepeat:{type:String, required:true},
    noteData:{type:Object, default:{}},
    date:{type:Date, default:Date.now}
},{minimize:false});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;