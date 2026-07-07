import express from "express";
import cors from 'cors';
import web from './routingsec/route.js';
import pqr from "./database/dbconnect.js";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

configDotenv()
const app= express();
const myport=process.env.PORT || 9000

app.use(express.json());
app.use(cors());
app.use(web);
app.use(cookieParser);

app.listen(myport,()=>{
    console.log(`server is running:${myport}`);
})
