/* import express from "express";
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
app.use(cors({
    origin:"https://project-client1.onrender.com",
    credentials:true
}));
app.use(web);
app.use(cookieParser());
app.set("trust proxy" ,1)
app.listen(myport,()=>{
    console.log(`server is running:${myport}`);
})
 */


import express from "express";
import cors from "cors";
import web from "./routingsec/route.js";
import "./database/dbconnect.js";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";

configDotenv();

const app = express();
const myport = process.env.PORT || 9000;

// Middleware
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "https://project-client1.onrender.com",
    credentials: true,
  })
);

// Trust Render Proxy
app.set("trust proxy", 1);

// Routes
app.use(web);

// Server
app.listen(myport, () => {
  console.log(`Server is running on port ${myport}`);
});