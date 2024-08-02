import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

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
})