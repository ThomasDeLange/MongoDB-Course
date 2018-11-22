const DriversController = require('../controllers/driversController')

module.exports = (app) => {
  //What to to with what endpoint
  app.get('/api', DriversController.greeting)
  app.post('/api/drivers', DriversController.create);
  app.put('/api/drivers/:id', DriversController.edit);
  app.delete('/api/drivers/:id', DriversController.delete);

}
