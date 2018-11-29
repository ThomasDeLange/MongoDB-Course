const mongoose = require('mongoose')

before.skip('Connect to test database', (done) => {
  mongoose.connect('mongodb://localhost/muberTest' ,{ useNewUrlParser: true })
  mongoose.connection
    .once('open', () => {console.log("Database is running in test env"); done()})
    .on('error', (error) => {console.warn("Warning", error); done(error)})

})
