import bcrypt from "bcrypt" //for hashing/encrpyt passwords
import jwt from 'jsonwebtoken' //token given to user for authorization 
import User from '../models/User.js'

/* REGISTER USER */
export const register = async (req, res)=>{ // Using async bcz going to make a call to the database, req.body is what we getting from frontend, res is what we are going to send
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            locations,
            occupation
        } = req.body; // is destructuring the req.body object — a shortcut in JavaScript to extract specific fields from an object and assign them to variables.
                    //req.body is the data sent by the frontend (usually from a form or API call). you're using object destructuring to pull out all needed fields at once.

        const salt = await bcrypt.genSalt() // a method provided by the bcrypt library in Node.js used for generating a cryptographic salt.
        //A salt is a random string added to a password before hashing to increase security. // It makes hash outputs unique, even if users have the same password.
        
        const passwrodHash = await bcrypt.hash(password, salt)
        
        const newUser = new User({ //creating a new instance of mode User
            firstName,
            lastName,
            email,
            password: passwrodHash,
            picturePath,
            friends,
            locations,
            occupation,
            viewedProfile: Math.floor(Math.random() *  10000), //random value
            impressions: Math.floor(Math.random() *  10000)
        })
        
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);

    } catch(err){
        res.status(500).json({ error: err })
    }
}

/* LOGGING IN */
export const login = async (req,res) => {
    try{
        const { email, password } = req.body //destructuring the req.body object to get email and password;
        const user = await User.findOne({ email:email }) //finding the user with this email, it will bring back all the info here
        if(!user) return res.status(400).json({ message: "User does not exist." })

        const isMatch = await bcrypt.compare(password, user.password)//password entered, password saved inside the db
        if(!isMatch) res.status(400).json({ message: "Invalid credentials." })

            //read about it in chatgpt
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);  // jwt.sign(payload, secret, options)
        //->jwt.sign(payload, secret): This creates a JSON Web Token (JWT). -> process.env.JWT_SECRET: The secret key used to sign the token. 
        //-> payload: { id: user._id } is the data you're encoding inside the token — typically the user ID.
        // JWT has 3 parts: HEADER.PAYLOAD.SIGNATURE

        delete user.password; // only deletes the password property from the JavaScript object in memory, just before sending the response.
        res.status(200).json({ token, user })

    } catch (err) {
        res.status(500).json({ error:err })
    }
}

