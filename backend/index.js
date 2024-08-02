import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";


const app = express();
dotenv.config({});

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOption = {
    origin: ["http://localhost:5173"],
    credentials: true,
}
app.use(cors(corsOption));


app.get("/",(req,res)=>{
    res.send("Hello World");
})

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`SERVER running at port ${3000}`)
    connectDB();
})