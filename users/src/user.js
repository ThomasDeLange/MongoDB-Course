const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const userSchema = new Schema ({
  name: String
});

const User = Mongoose.model('user', userSchema);

module.exports = User
