import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    try{
            let token = req.header("Authorization"); //from frontend we are grabbing the authorization header, frontend will be setting it and we will grab it here in the backend.
            
            if(!token){
                return res.status(403).send("Acess Denied!")
            }

            if(token.startsWith("Bearer")){ //we want token to be starting with Bearer , will be set on the frontend
                token = token.slice(7, token.length).trimLeft(); //taking everything from the right side of the bearer
            } //token will be placed after a space in the Bearer

            const verified = jwt.verify(token, process.env.JWT_SECRET)
            req.user = verified;
            next(); //to procees to the next step of the function 

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}