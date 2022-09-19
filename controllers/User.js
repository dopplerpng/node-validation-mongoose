const express = require("express")
const router = express.Router()
const path = require('path')
const bcrypt = require('bcrypt')
const {log} = require('mercedlogger')
const jwt = require('jsonwebtoken')

// THE SECRET keywords
const {SECRET = 'secret'} = process.env


//Router for db models
const UserModel= require('../models/User')
const mongoose = require("mongoose")

// REGISTER
router.post('/register', async (req,res)=>{
    const {username, password, email} = req.body

    if(!username){ res.json({msg:"Please, register with another Username."}) }
    if(!password){ res.json({msg:"Please, register with another Password."}) }
    if(!email){ res.json({msg:"Please, register with another email."}) }


    // creating a hash password
    const genSalt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, genSalt)

    // verify username
    const userExists = await UserModel.findOne({username:username})
    if(userExists){
      log.red('USER EXISTS?', 'YES')
      res.json({msg:'Try another username'})
    }
    // creating a new user
    const user = new UserModel({
        username,
        email,
        password: passwordHash
    })

    try{
      await user.save()
      res.status(201)
      log.yellow('USER CREATES','NEW USER CREATED IN DB')
    }catch(err){
      log.red('USER CREATES', err)
    }


})

// LOGIN
//login route verify a user and get a token
router.post('/login', async (req,res)=>{
    try{
        //check if the user exists
        const user = await UserModel.findOne({username:req.body.username})
        if(user){
            //check if the password matches
            const result = await bcrypt.compare(req.body.password, user.password)
            if(result){
                const token = await jwt.sign({username: user.username}, SECRET)
                console.log(token)
                res.json({
                    token:token
                })

            }else{res.status(400).json({error:'Password is wrong'})}
        }else{res.status(400).json({error:'user dont match'})}
        console.log('MARCHA!')
    }catch(e){console.log(e)}
})

module.exports= router
