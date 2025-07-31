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

import { register } from './controllers/auth.js' //from controller ,logic to upload file

import authRoutes from "./routes/auth.js";

import userRoutes from "./routes/users.js"

import postRoutes from './routes/posts.js'

import { verifyToken } from './middleware/auth.js'

import { createPost } from './controllers/posts.js'

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url) //Converts a file URL (import.meta.url) to a standard file path.
// -> import.meta.url => Gives you the URL of the current module file (like file:///Users/sartik/app/index.js). Only available in ES Modules.
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
//express.static(...): Serves(output) static files from a directory and make them accessible at the route .../assets/filename
// path.join(__dirname, 'public/assets'): Resolves the absolute path to your public/assets folder.
// eg: for a file -> /public/assets/logo.png ,
// we can access via http://localhost:3000/assets/logo.png



/* FILE STORAGE */
const storage = multer.diskStorage({ //Handling form data that includes file input fields
    destination: function(req, file, cb){ //anytime someone uploads a file onto your website then it's destination is set to that path 
        cb(null, "public/assets"); //This sets the upload folder to public/assets, cb(null, ...) means "no error".
    }, //Every uploaded file will go to the "public/assets" folder.
    filename: function(req, file, cb){ //This keeps the original name of the uploaded file.
        cb(null, file.originalname); // cb stands for callback
    }
});

const upload = multer({ storage }) //anytime we are going to upload a file we are going to use uplaod.
//using multer we store the uploaded data to into storage that we defined



/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture") /* middleware to store*/, register /*logic of the endpoint logic to save data in db called controller*/);
//this is we using to upload file so it has to be in the index.js file

//when user posts it will post a pic
app.post("/post", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("./auth", authRoutes) //to set multiple routes from different file we use app.use() 
//User Route
app.use("/users", userRoutes)
//Post Route
app.use("/posts", postRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
}).catch((err)=>{
    console.log(`${err} did not connect`)
})