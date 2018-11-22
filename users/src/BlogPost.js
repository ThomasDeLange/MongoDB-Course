const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "comment"
  }]
})

const BlogPost = Mongoose.model('blogPost', BlogPostSchema)
module.exports = BlogPost;
