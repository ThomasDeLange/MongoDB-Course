const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const PostSchema = new Schema ({
  title: String
})

module.exports = PostSchema
