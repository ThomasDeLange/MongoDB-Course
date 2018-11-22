const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
})

const Comment = Mongoose.model('comment', CommentSchema)
module.exports = Comment
