import dotenv from 'dotenv'
dotenv.config({ path: "./.env" });
import exp from 'express'
import {connect} from 'mongoose'
import cookieParser from 'cookie-parser'
import {userApp} from './APIs/UserAPI.js'
import {authorApp} from './APIs/AuthorAPI.js'
import { adminApp } from './APIs/AdminAPI.js'
import {commonApp} from './APIs/CommonAPI.js'
import { verifyToken } from './middlewares/verifyToken.js'
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=exp()

//Cookie parser middleware
app.use(cookieParser())

app.use(cors({
  origin:true,
  credentials:true
}))
//body parser middleware
app.use(exp.json())

//Path level middleware
app.use("/user-api",userApp)
app.use("/author-api",authorApp)
app.use("/admin-api",adminApp)
app.use("/auth",commonApp)

// Serve Frontend Static Files
app.use(exp.static(path.join(__dirname, "../frontend/dist")));

const connectDB=async ()=>{
    try{
        await connect(process.env.DB_URL)
        console.log("DB Server connected")

        //Assign port
        const port=process.env.PORT || 5000
        app.listen(port,()=>console.log(`Server listening on ${port}...`))
    }catch(err){
        console.log("Error in DB connection", err)
    }
}

connectDB()

// Handle React routing (Catch-all)
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

//Error handling middleware
app.use((err, req, res, next) => {
  console.log("Error message: ",err.message)
  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Error cause:", err.cause);
  console.log("Full error:", JSON.stringify(err, null, 2));
  //ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  //CastError
  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  //send server side error
  res.status(500).json({ message: "error occurred", error: "Server side error" });
});