const {Schema} = require("mongoose");
const {schema, model} = require('mongoose')

const UserModel = new Schema({
  username:{type:String, unique:true, required:true},
  password:{type:String, required:true},
  email:{type:String, unique:true, required:true}
})

const User = model('User', UserModel)

module.exports = User
