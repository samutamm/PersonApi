const db = require('../../config/postgres');
const crypto = require('../../config/crypto');

exports.all = function(req, res) {
  db.getAll(function(err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result.rows);
    }
  });
}

exports.checkCredentials = function(req, res) {
  const b64 = req.headers.authorization.split(' ')[1];
  const credentials = new Buffer(b64, 'base64').toString("ascii").split(':');
  db.getByUsername(credentials[0], function(err, results) {
    if(err) {
      res.status(500).end();
    } else if(results.rows < 1) {
      res.status(401).end();
    } else {
      const password = results.rows[0].password;
      if (crypto.decrypt(password) === credentials[1]) {
        res.status(200).end();
      } else {
        res.status(401).end();
      }
    }
  });
}
