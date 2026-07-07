import mongoose, {Mongoose}from "mongoose";
const dataobject = new mongoose.Schema({
    FullName:{
        type:String
    },
    Address:{
        type:String
    },
    Email:{
        type:String
    },
    Password:{
        type:String
    },
    DOB:{
        type:String
    },
    Course:{
        type:String
    },
    Profile:{
        type:String
    },
    Phone:{
        type:String
    }
})
const mymodel=mongoose.model("registerlist",dataobject)
export default mymodel;
