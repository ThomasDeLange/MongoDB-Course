const assert = require('assert');
const User = require('../src/User');

describe('Posts', () => {
  it('can be created with a user', (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{title: 'PostTitle'}, {title: "SecondPost"}]
    })

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle')
        done()
      })
      .catch((error) => done(error))
  })
  it('can be added to an existing user', (done) =>{
    const joe = new User({
      name: "Joe",
      posts: []
    })

    joe.save()
      .then(() => User.findOne({name: "Joe"}))
      .then((user) => {
        user.posts.push({title: 'New Post'})
        return user.save()
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'New Post')
        done()
      })
      .catch((error) => done(error))
  })
  it('can be removed from an existing user', (done) =>{
    const joe = new User({
      name: "Joe",
      posts: [{title: "New Post"}]
    })

    joe.save()
      .then(() => User.findOne({name: "Joe"}))
      .then((user) => {
        user.posts[0].remove()
        return user.save()
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts.length === 0)
        done()
      })
      .catch((error) => done(error))
  })
})
