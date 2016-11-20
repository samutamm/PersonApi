const db = require('../models/persons.model');
const crypto = require('../../config/crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

exports.checkCredentials = function(req, res) {
  const b64 = req.headers.authorization.split(' ')[1];
  const credentials = new Buffer(b64, 'base64').toString("ascii").split(':');
  db.getByUsername(credentials[0], function(err, results) {
    if(err) {
      res.status(500).end();
    } else if(results.rows < 1) {
      res.status(401).end();
    } else {
      const user = results.rows[0];
      if (crypto.decrypt(user.password) === credentials[1]) {
        const json = {
          username: credentials[0]
        };
        jwt.sign(json, config.secretKey,{ expiresIn: '1h' }, function(token) {
          json.token = token;
          res.status(200).send(JSON.stringify(json));
        });
      } else {
        res.status(401).send();
      }
    }
  });
}

exports.checkToken = function(req, res) {
  const headers = req.headers.authorization.split(' ');
  const jwtToken = headers[0];
  jwt.verify(jwtToken, config.secretKey, function(err, decoded) {
    if (err) {
      res.status(401).send(err);
    } else if (decoded.username === undefined) {
      res.status(401).send();
    } else {
      db.getByUsername(decoded.username, function(err, results) {
        if(results.rows.length > 0) {
          res.status(200).send();
        } else {
          res.status(401).send()
        }
      });
    }
  });
}
