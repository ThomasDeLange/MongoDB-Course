const Mongoose = require('mongoose');
const PostSchema = require('./Post')
const Schema = Mongoose.Schema;

//The schema
const UserSchema = new Schema ({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2 ,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  likes: Number,
  posts: [PostSchema],
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: "blogPost"
  }]
});

//Virtual properties
UserSchema.virtual("postCount").get(function() {
  return this.posts.length;
})

//Pre middelware
//The correct method is deleteOne() but it is still named 'remove'
UserSchema.pre('remove', function(next) {
  const BlogPost = Mongoose.model('blogPost')
  //Go trough every blogpost if the id is $in the list delete the blogPost
  BlogPost.deleteOne({ _id: { $in: this.blogPosts } })
    .then(() => next())
})

//Create a collection
const User = Mongoose.model('user', UserSchema);

module.exports = User
