const ctrl = require('../controllers/persons.controller');

module.exports = function(app) {
  app.get('/api/persons', ctrl.all);
}
