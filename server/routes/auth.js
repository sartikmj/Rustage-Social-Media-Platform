import express from 'express'
import { login } from '../controllers/auth.js'

const router = express.Router(); //It helps you define routes in a modular and organized way. Instead of defining all routes in one file, you can create routes in separate files using router, then export and use them in your main app.

//instead of using app.use() we use this
router.post("/login", login); // /login will be suffix on /auth -> /auth/login/ 

export default router;