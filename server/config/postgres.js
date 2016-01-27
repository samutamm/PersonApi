const personsModel = require('../app/models/persons.model.js');
const async = require('async');

exports.init = function(done) {
  async.series({
    initPersons: function(callback) {
      personsModel.init(function() {
        callback(null, null);
      });
    }
  },
  function(err, results) {
    done();
  });
}
