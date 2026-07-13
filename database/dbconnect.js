import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const db = process.env.ATLASURL;

console.log("Connecting to:", db);

mongoose
  .connect(db)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:");
    console.log(err);
  });

export default mongoose;