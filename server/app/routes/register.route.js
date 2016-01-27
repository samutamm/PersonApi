const register = require('../controllers/login.controller');

module.exports = function(app) {
  app.post('/register', login.checkCredentials);
}
