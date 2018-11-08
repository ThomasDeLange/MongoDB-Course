const Mongoose = require('mongoose')
Mongoose.Promise = global.Promise;

before((done) => {
  Mongoose.connect('mongodb://localhost:27017/usersTest', { useNewUrlParser: true });
  Mongoose.connection
    .once('open', () => {
      console.log('  Connection open');
      done();
    })
    .on('error', (error => {
      console.warn('Warning', error);
    }));
});


beforeEach((done) => {
  Mongoose.connection.collections.users.drop(() => {done()});
})
