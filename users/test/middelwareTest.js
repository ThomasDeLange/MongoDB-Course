const Mongoose = require('mongoose')
const assert = require('assert');
const User = require('../src/User');
const BlogPost = require('../src/BlogPost');


describe('Middelware', () => {

  let joe, blogPost

  beforeEach('setup', (done) => {
    joe = new User({name: 'Joe'})
    blogPost = new BlogPost({title: 'MacOS > Windows', content: 'Yep it really is!'})

    joe.blogPosts.push(blogPost)

    Promise.all([joe.save(), blogPost.save()])
    .then(() => done())
    .catch((error) => done(error))
  })

  it('blogposts get removed when a user is deleted.', (done) => {
    joe.remove()
      .then(() => BlogPost.countDocuments())
      .then((count) => {
        assert(count === 0);
        done();
      })
      .catch((error) => done(error))
  })
})
