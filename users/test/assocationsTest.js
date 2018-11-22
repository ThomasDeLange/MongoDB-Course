const Mongoose = require('mongoose')
const assert = require('assert');
const User = require('../src/User');
const Comment = require('../src/Comment');
const BlogPost = require('../src/BlogPost');

describe('Assocation', () => {
  let joe, blogPost, comment

  beforeEach('setup', (done) => {
    joe = new User({name: 'Joe'})
    blogPost = new BlogPost({title: 'MacOS > Windows', content: 'Yep it really is!'})
    comment = new Comment({content: 'What a great post!!!'})

    joe.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = joe

    Promise.all([
      joe.save(),
      blogPost.save(),
      comment.save() ])
    .then(() => done())
    .catch((error) => done(error))
  })

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({name: "Joe"})
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title  === 'MacOS > Windows')
        done()
      })
      .catch((error) => done(error))
  })

  it('saves a full user', (done) => {
    User.findOne({name: "Joe"})
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name = "Joe")
        assert(user.blogPosts[0].title = 'MacOS > Windows')
        assert(user.blogPosts[0].comments[0].content === 'What a great post!!!')
        assert(user.blogPosts[0].comments[0].user.name === "Joe")
        done()
      })
      .catch((error) => done(error))
  })
})
