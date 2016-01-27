const db = require('../models/persons.model');
const Person = require('../models/Person');

exports.all = function(req, res) {
  db.getAll(function(err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result.rows);
    }
  });
}

exports.register = function(req, res) {
  const person = new Person(req.body);
  if(!person.isValid) {
    res.status(400).send('Person is invalid.');
  }
  db.addPerson(person, function(err, results) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(results);
    }
  });
}
