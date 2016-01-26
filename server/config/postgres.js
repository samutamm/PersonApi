const pg = require('pg');
const config = require('./config');
const conString = config.db.address;
const CryptoJS = require("crypto-js");

exports.getAll = function(callback) {
  pg.connect(conString, function(err, client, done) {
    const queryStr = "SELECT * FROM persons;";
    client.query(queryStr, function(err, results) {
      done();
      callback(err, results);
    });
  });
}

exports.init = function(callback) {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    const queryString =
    `CREATE TABLE IF NOT EXISTS persons (
      id    SERIAL PRIMARY KEY,
      name  TEXT,
      email TEXT,
      address TEXT,
      username TEXT,
      password TEXT,
      role TEXT
    );`;
    client.query(queryString, function(err, result) {
      const adminQuery = `SELECT name FROM persons
      WHERE username = \'admin\'`;
      client.query(adminQuery, function(err, results) {
        if(results.rows.length > 0) {
          console.log('Admin déjà exists.');
          done();
          callback();
        } else {
          const insertQuery =
          `INSERT INTO persons VALUES
          (DEFAULT, \'admin\', \'admin@mail.fr\', \'Lyon\', \'admin\', \'`
          + CryptoJS.AES.encrypt(config.db.admin, config.secretKey) +`\', \'ADMIN\');`;
          client.query(insertQuery, function(err, results) {
            done();
            console.log(result);
            callback();
          });
        }
      })
    });
  });
}
