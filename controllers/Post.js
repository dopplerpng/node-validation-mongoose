const express = require("express")
const router = express.Router()
const path = require('path')


//Router for db models
const PostModel= require('../models/Post')
const UserModel = require('../models/User')
const mongoose = require("mongoose")
const account = require('./User')

//Authentication
const auth = await UserModel.findOne({username:})
// ALL POSTS
router.post('/blog', (req,res)=>{



})

// PUBLISH POST
router.post('/blog/add', (req,res)=>{
  const token = await findOne(token)
    console.log("Test - router register")
    const {post, author, title} = req.body
})

// DELETE POST
router.put('/blog/delete', (req,res)=>{
    console.log("Test - router register")
})

// EDIT POST
router.get('/blog/edit', (req,res)=>{
    console.log("Test - router register")
})


module.exports= router
