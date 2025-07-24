import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'

//for the below two -> to work with file paths, because __dirname and __filename are not available in ESM by default.
import path from "path" 
import { fileURLToPath } from 'url' 

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url) //Converts a file URL (import.meta.url) to a standard file path.
const __dirname =  path.dirname(__filename) //Gets the directory name of the current file.

dotenv.config();
const app = express();

app.use(express.json())

app.use(helmet()) // Sets secure HTTP headers

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })) // Allows resources to be shared across origins

app.use(morgan("common"))  // Logs basic request details (method, status, URL)

app.use(bodyParser.json({ limit: "30mb", extended:true })) //Parses incoming JSON payloads

app.use(bodyParser.urlencoded({limit:"30mb", extended:true})) //Parses form submissions

app.use(cors())

app.use("/assets", express.static(path.join(__dirname, 'public/assets'))) //setting up the directory of where we keep our assets, like in our case it is the images,
// we are going to store this locally 
//express.static(...): Serves static files from a directory.
// path.join(__dirname, 'public/assets'): Resolves the absolute path to your public/assets folder.

/* FILE STORAGE */
const storage = multer.diskStorage({ //Handling form data that includes file input fields
    destination: function(req, file, cb){ //anytime someone uploads a file onto your website then it's destination is set to that path 
        cb(null, "public/assets"); //This sets the upload folder to public/assets, cb(null, ...) means "no error".
    }, //Every uploaded file will go to the "public/assets" folder.
    filename: function(req, file, cb){ //This keeps the original file namewhat is 
        cb(null, file.originalname); // cb stands for callback
    }
});

const upload = multer({ storage }) //anytime we are going to upload a file we are going to user uplaod.
//using multer store the uploaded data to into storage  that we defined

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
}).catch((err)=>{
    console.log(`${err} did not connect`)
})
