const {Schema} = require("mongoose");
const {schema, model} = require('mongoose')

const PostModel = new Schema({
  post: {type: String, unique:false, required:true},
  date: new Date(),
  author: user.username,
  title: {type:String, unique:true, required:true}
})

const Post = model('Post', PostModel)

module.exports = Post
