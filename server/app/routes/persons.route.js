const ctrl = require('../controllers/persons.controller');

module.exports = function(app) {
  app.get('/persons', ctrl.all);
}
