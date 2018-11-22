const mongoose = require('mongoose')

before((done) => {
  mongoose.connect('mongodb://localhost/muberTest' ,{ useNewUrlParser: true })
  mongoose.connection
    .once('open', () => {console.log("Database is running in test env"); done()})
    .on('error', (error) => {console.warn("Warning", error); done(error)})

})

beforeEach((done) => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => done())
    .catch(() => done());
});
