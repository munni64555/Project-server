import mongoose from "mongoose";

const appicons = new mongoose.Schema({
    
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
    }
});

const appiconmodel = mongoose.model("addlist",appicons);
export default appiconmodel