const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const app = express()

if (process.env.NODE_ENV !== 'test'){
  mongoose.connect('mongodb://localhost/muber' ,{ useNewUrlParser: true })
  mongoose.connection
    .once('open', () => console.log("Database is running in non test env"))
    .on('error', (error) => console.warn("Warning", error)
    )
}

//Be able to get the json from the body
app.use(bodyParser.json())

//Let routes do the routing
routes(app)

//Error handling
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message})
})

module.exports = app
