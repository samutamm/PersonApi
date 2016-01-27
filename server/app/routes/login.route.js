const login = require('../controllers/login.controller');

module.exports = function(app) {
  app.get('/login', login.checkCredentials);
  app.get('/check', login.checkToken);
}
