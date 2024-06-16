import User from "../models/user.models.js"
import bcrypt from 'bcryptjs'
import generateTokenandsetCookie from "../utils/generateToken.js";
//SIGNUP
export const signup = async (req,res)=>{
    try {
        const {username,email,password,confirmpassword,phone,gender} = req.body;

        if(password!=confirmpassword){
            res.status(400).json({error:"password and confirm password donnot match"})
        }

        var user = await User.findOne({username})
        if(user){
            res.status(400).json({error:"Entered username already exists"})
        }
        user = await User.findOne({email})
        if(user){
            res.status(400).json({error:"Entered email already exists"})
        }
        user = await User.findOne({phone})
        if(user){
            res.status(400).json({error:"Entered phonenumber already exists"})
        }

        //password is encrypted here
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt)

        const newuser = new User({
            username:username,
            email:email,
            password:hashedpassword,
            phone: phone,
            isAdmin:false,
            gender:gender,
        })

        if(newuser){
            generateTokenandsetCookie(newuser._id,res)
            await newuser.save();

            res.status(201).json({
                _id:newuser.id,
                username:newuser.username,
                gender:newuser.gender,
                phone:newuser.phone,
            })
        }
        else{
            res.status(400).json({error:"Invalid details"})
        }

    } catch (error) {
        console.log("Error occured inside the signup page",error)
    }
}


//LOGIN 
export const login = async (req,res)=>{
    try {
        const {email,password}= req.body;

        var user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ error: "Entered username donnot exist" });
        }
        const ispasswordvalid = await bcrypt.compare(password,user.password) 
        if(!ispasswordvalid){
            return res.status(400).json({ error: "password is incorrect" });
        }
        if(user.isAdmin){
            return res.status(400).json({ error: "Invalid user credentials" });
        }

        generateTokenandsetCookie(user._id,res)
        console.log("user login successful")
        res.status(201).json({
            _id:user.id,
            username:user.username,
            gender:user.gender,
            phone:user.phone,
            message:"user login successful"
        })
        
    } catch (error) {
        console.log("Error occured inside the login page",error)
    }
}

//LOGOUT
export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Loggedout successfully"})
    } catch (error) {
        console.log("Error occured inside the Logout page",error)
    }
}