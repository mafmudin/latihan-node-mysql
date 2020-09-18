'use strict';

exports.ok = function(values, res) {
  var data = {
      'status': 200,
      'values': values
  };
  res.json(data);
  res.end();
};

exports.failed = function(values, res) {
  var data = {
      'status': 400,
      'values': values
  };
  res.status(400);
  res.json(data);
  res.end();
};