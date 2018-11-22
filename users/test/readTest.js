const assert = require('assert');
const User = require('../src/User');

describe('The reader', () => {

  let joe, christine, alex, bert;

  beforeEach('Add the user joe.', (done) => {
    joe = new User({name: "Joe"});
    christine = new User({name: "Christine"});
    alex = new User({name: "Alex"});
    bert = new User({name: "Bert"});

    Promise.all([ alex.save(), joe.save(), christine.save(), bert.save() ])
      .then(() => done())
      .catch((error) => done(error))
  });

  it('finds all users with a name of joe.', (done) => {
    User.find({name: "Joe"})
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString())
        done();
      });
  });

  it('find a user with a particular id.', (done) => {
    User.findOne({_id: joe._id})
      .then((user) => {
        assert(user.name === 'Joe')
        done();
      })
  })

  it.only('can skip & limit the result set', (done) => {
    //Only get back the second and third
    User.find({})
      .sort({name: 1})
      .skip(1).limit(2)
        .then((users) => {
          assert(users.length === 2)
          assert(users[0].name === "Bert")
          assert(users[1].name === "Christine")
          done()
        })
      .catch((error) => done(error))
  })
});
