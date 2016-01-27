const pg = require('pg');
const config = require('../../config/config');
const conString = config.db.address;
const crypto = require('../../config/crypto');
const queries = require('./persons.queries.json');
const Person = require('./Person');

exports.init = function(callback) {
  pg.connect(conString, function(err, client, done) {
    if(err) return console.error('error fetching client from pool', err);
    client.query(getQuery(queries.createTable), function(err, result) {
      client.query(getQuery(queries.selectByUsername), ['admin'], function(err, results) {
        if(results.rows.length > 0) {
          console.log('Admin déjà exists.');
          done();
          callback();
        } else {
          const insertQuery =
          `INSERT INTO persons VALUES
          (DEFAULT, \'admin\', \'admin@mail.fr\', \'Lyon\', \'admin\', \'`
          + crypto.encrypt(config.db.admin) +`\', \'ADMIN\');`;
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

exports.getAll = function(callback) {
  pg.connect(conString, function(err, client, done) {
    client.query(getQuery(queries.selectAll), function(err, results) {
      done();
      callback(err, results);
    });
  });
}

exports.getByUsername = function(username, callback) {
  pg.connect(conString, function(err, client, done) {
    client.query(getQuery(queries.selectByUsername), [username], function(err, results) {
      done();
      callback(err, results);
    });
  });
}

exports.addPerson = function(person, callback) {
  pg.connect(conString, function(err, client, done) {
    const query = "INSERT INTO persons VALUES" +
    " (DEFAULT, $1, $2, $3, $4, $5, $6);";
    const list = person.asAList();
    console.log(list);
    client.query(query, list, function(err, results) {
      done();
      callback(err, results);
    });
  });

}

function getQuery(list) {
  return list.reduce(function(prev, current, i, arr) {
    return prev + current;
  });
}
