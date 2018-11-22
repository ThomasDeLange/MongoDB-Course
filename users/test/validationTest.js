const assert = require('assert');
const User = require('../src/User');

describe('The validator', () => {
  it('wants a name', () => {
    const user = new User({name: undefined})
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name

    assert(message === 'Name is required.')
  });
  it('wants a name longer than two characters', () => {
    const user = new User({name: "al"})
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name

    assert(message === 'Name must be longer than 2 characters.')
  });
  it('doesn\'t save wrong names to the database', (done) => {
    const user = new User({name: 'Al'})
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name

        assert(message === "Name must be longer than 2 characters.")
        done();
      })
      .catch((error) => done(error))


  })
});
