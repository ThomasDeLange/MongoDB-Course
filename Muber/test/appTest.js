const assert = require('assert')
const request = require('supertest')
const app = require('../app.js')

describe('The express app', () => {

  it('handels a GET request to /api', (done) => {
    request(app)
      .get('/api')
      .end((error, response) => {
        assert(response.body.Helloooo === 'wurld')
        done()
      })
  })
})
