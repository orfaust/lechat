exports.index = function(req, res) {
  res.end('users/index');
};

exports.edit = function(req, res) {
  //res.end('users/edit');
  res.end(JSON.stringify(req.user));
};

exports.create = function(req, res) {
  res.end('users/create');
};