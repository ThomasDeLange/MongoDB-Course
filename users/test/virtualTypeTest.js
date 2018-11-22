const assert = require('assert');
const User = require('../src/User');

describe('The virtual type', () => {
  it('returns the number of posts', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'PostOne'}, {title: 'Posttwo'}]
    })

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(joe.postCount === 2)
        done()
      })
      .catch((error) => done(error))
  })
})
