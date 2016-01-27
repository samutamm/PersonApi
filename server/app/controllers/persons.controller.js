const db = require('../../config/postgres');

exports.all = function(req, res) {
  db.getAll(function(err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result.rows);
    }
  });
}
