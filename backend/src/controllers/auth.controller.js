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
}