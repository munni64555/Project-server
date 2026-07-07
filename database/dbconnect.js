
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const db = process.env.DBURL;
console.log(db);
const pqr = mongoose.connect(db).then(()=>{
    console.log("database connected");
    
});

export default pqr