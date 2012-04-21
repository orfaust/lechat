var all  = exports.all  = {},
    get  = exports.get  = {},
    post = exports.post = {};

get.index = function(req, res) {
  res.render('chat/index', {messages: ''});
};