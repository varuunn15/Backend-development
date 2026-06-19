const express = require('express')
const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require('crypto');


// /api/auth/register 
authRouter.post('/register', async(req,res)=>{
    const { email ,name ,password } = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"user already exists with this email"
        })

    }

    const hash = crypto.createHash('md5').update(password).digest("hex")

   const user = await userModel.create({
        email,password:hash ,name
    })

 const token = jwt.sign(
    {
    id:user._id
    },
    process.env.JWT_SECRET
 )
 
 res.cookie('jwt_token',token)

    res.status(201).json({
        message:"user registered successfullly",
        user,
        token
    })

})

//ye hmaara token laayega cookies storage se
/*
/api/auth/protected
*/
authRouter.post('/protected',(req,res)=>{
    console.log(req.cookies);

    res.status(200).json({
        message:"this is protected route"
    })
})

// /api/auth/login
authRouter.post('/login',async(req,res)=>{
    const{email, password} =req.body

    const user= await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"user not found with this email address"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")
    if(!isPasswordMatched){
        return res.status(401).json({
            message:"invalid password"
        })
    }
     const token = jwt.sign({
        id:user._id,
     }, process.env.JWT_SECRET)

     res.cookie('jwt_token', token)

     res.status(200).json({
        message:"user logged in sucessfully",
        user,
        token
     })
})


 module.exports = authRouter