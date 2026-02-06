const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');
const foodPartnermodel = require("../models/foodpartner.model");
//this package s used when your customers privacy or details is breached it is used to protect it
const jwt = require('jsonwebtoken');
async function registerUser(req,res){

    const { fullName , email , password} = req.body;
    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if(isUserAlreadyExists) {
        return res.status(400).json({
            message : "User already exists"
        })
    }


    const hashedPassword = await bcrypt.hash(password , 10);

    const user = await userModel.create({
        fullName , email,password : hashedPassword
    })
// ab user agar register toh ho gaya lekin agar jab woh baar baar aya toh pata chal sake ki woh kaha se register kar raha h toh uski details ko store karte h tokens m and unn tokens ko store karte h cookies m
//tokens kliye jasonwebpatocken aur cookies m token ko save k  k liye cookiesparcel
    const token = jwt.sign({
        id : user._id,
    } , process.env.JWT_SECRET)

    //TO ACCESSS JWT TOKENS WE USE PACKAGE DOTENV
    res.cookie("token" , token )
    res.status(201).json({
        message : "User registered successfully",
        user:{
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
        }
    })



}

async function loginUser(req,res){
    const { email , password} = req.body;
    const user = await userModel.findOne({ 
        email
    })

    if(!user) {
        return res.status(400).json({
            message : "invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid) {
        return res.status(400).json({
            message : "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id : user._id,
    } , process.env.JWT_SECRET)
    res.cookie("token" , token )

    res.status(200).json({
        message : "User logged in successfully",
        user:{
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
        }
    })
}

function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message : "User logged out successfully"
    })
}

async function registerFoodPartner(req,res){
    const { name , email , password} = req.body;
    const isAccountAlreadyExists = await foodPartnermodel.findOne({
        email
    })

    if(isAccountAlreadyExists) {
        return res.status(400).json({
            message : "Food Partner Account already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password , 10);
    const foodPartner = await foodPartnermodel.create({
        name , email,password : hashedPassword
    })  

    const token = jwt.sign({
        id : foodPartner._id,
    } , process.env.JWT_SECRET)
    res.cookie("token" , token )
    res.status(201).json({
        message : "Food Partner registered successfully",
        foodPartner:{
            _id : foodPartner._id,
            name : foodPartner.name,
            email : foodPartner.email,
        }
    })
}

async function loginFoodPartner(req,res){
    const { email , password} = req.body;
    const foodPartner = await foodPartnermodel.findOne({ 
        email
    })
    if(!foodPartner) {
        return res.status(400).json({
            message : "invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password , foodPartner.password);
    if(!isPasswordValid) {
        return res.status(400).json({
            message : "Invalid credentials"
        })
    }
    const token = jwt.sign({
        id : foodPartner._id,
    } , process.env.JWT_SECRET)
    res.cookie("token" , token )
    res.status(200).json({
        message : "Food Partner logged in successfully",
        foodPartner:{
            _id : foodPartner._id,
            name : foodPartner.name,
            email : foodPartner.email,
        }
    })
}

function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message : "Food Partner logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}