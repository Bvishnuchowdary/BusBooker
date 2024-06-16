import jwt from 'jsonwebtoken'

const generateTokenandsetCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.jwt_secret,{
        expiresIn:"15d",
    })

    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httponly:true,
        samesite:"strict",

    })
}

export default generateTokenandsetCookie