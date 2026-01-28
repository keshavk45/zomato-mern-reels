const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required : true,
        
    },
    email :{
        type : String,
        required : true,
        umique : true,
    },
    password :{
        type : String,

    }
},
//timestamps ka kaam hota h user ne kab login kiya tha unn sabke baare m ek time stamp deta h yeh
{
    timestamps : true
})

const userModel = mongoose.model("user" , userSchema);

module.exports = userModel;// connect to database