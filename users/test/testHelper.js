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
  //lowercase all want mongoose is kut
  //Alles moet met een s ondanks dat ik dat nergens heb gezegd!
  const {users, comments, blogposts} = Mongoose.connection.collections;

  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done()
      })
    })
  });
})
