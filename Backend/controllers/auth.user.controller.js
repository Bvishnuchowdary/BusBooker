import User from "../models/user.models.js"
import bcrypt from 'bcryptjs'
import generateTokenandsetCookie from "../utils/generateToken.js";
//SIGNUP
export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmpassword, phone, gender } = req.body;

        // Check if password and confirm password match
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Password and confirm password do not match" });
        }

        // Check if username already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Entered username already exists" });
        }

        // Check if email already exists
        user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Entered email already exists" });
        }

        // Check if phone number already exists
        user = await User.findOne({ phone });
        if (user) {
            return res.status(400).json({ error: "Entered phone number already exists" });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        // Create new user instance
        const newUser = new User({
            username,
            email,
            password: hashedpassword,
            phone,
            isAdmin: false,
            gender,
        });

        // Save user to database
        await newUser.save();

        // Generate token and set cookie
        generateTokenandsetCookie(newUser._id, res); // Ensure this function only sets cookies, doesn't send response

        // Respond with user data
        return res.status(201).json({
            _id: newUser.id,
            username: newUser.username,
            gender: newUser.gender,
            phone: newUser.phone,
        });

    } catch (error) {
        console.error("Error occurred inside the signup page", error);
        return res.status(500).json({ error: "Server error" });
    }
};


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