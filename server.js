// INITIAL CONFIG
require('dotenv').config()
const express = require("express")
const app = express()
const PORT = 5050
const {log} = require('mercedlogger')

// DB CONNECTION
const mongoose = require('mongoose')
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbOn = require('./helpers')

mongoose.connect( `mongodb+srv://${dbUser}:${dbPass}@cluster0.c10kehx.mongodb.net/?retryWrites=true&w=majority`)
    .then(dbOn)
    .catch(err => {err})

// MODULE-EXPORT'S
const routerUser = require('./controllers/User')

// MIDDLEWARES
app.use(express.static('./public'))
app.use(express.json())
app.use(routerUser)


app.listen(PORT, log.green('SERVER STATUS', 'CONNECTED'))
