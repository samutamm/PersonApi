const pg = require('pg');
const config = require('../../config/config');
const conString = config.db.address;
const queries = require('./persons.queries.json');
const Person = require('./Person');

function addToDBIfNotExists(person, callback) {
  pg.connect(conString, function(err, client, done) {
    if(err) return console.error('error fetching client from pool', err);
    client.query(getQuery(queries.createTable), function(err, result) {
      client.query(getQuery(queries.selectByUsername), [person.username], function(err, results) {
        if(results.rows.length > 0) {
          done();
          callback(null, 'Username ' + person.username + ' is reserved.');
        } else {
          client.query(getQuery(queries.addPerson), person.asAList(), function(err, results) {
            done();
            callback(err, results);
          });
        }
      })
    });
  });
}

exports.init = function(callback) {
  const admin = new Person({
    name: 'admin', mail: 'admin@mail.fr',
    address: 'Lyon', username: 'admin',
    password: config.db.admin, role: 'ADMIN'
  });
  addToDBIfNotExists(admin, function(err, result) {
    console.log(err);
    console.log(result);
    callback()
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
  addToDBIfNotExists(admin, function(err, result) {
    callback(err, result)
  });
}

function getQuery(list) {
  return list.reduce(function(prev, current, i, arr) {
    return prev + current;
  });
}
