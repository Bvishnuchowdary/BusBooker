import jwt from 'jsonwebtoken'
import User from '../models/user.models.js';

const protectroute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({ error: "unauthorised no token provided" });
        }

        const decoded = jwt.verify(token,process.env.jwt_secret)
        if(!decoded){
            return res.status(401).json({ error: "unauthorised no token provided" });
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(401).json({ error: "user not found inside protectroute.js" });
        }

        req.user = user

        next()


    } catch (error) {
        console.log("Error occurred in protectroute.js", error);
        return res.status(500).json({ error: "An error occurred in middleware protectroute.js" });
    }
}

export default protectroute