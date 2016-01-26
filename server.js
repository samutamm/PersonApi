process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('./server/config/express')
const postgres = require('./server/config/postgres');

postgres.init(function() {
  postgres.getAll(function(err, results) {
    console.log('DB contains ' + results.rows.length + ' persons.');
  });
});
const app = express();

app.set('port', (process.env.PORT || 3030));

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('PersonApi started at http://localhost:%s', port);
});

module.exports = app;
