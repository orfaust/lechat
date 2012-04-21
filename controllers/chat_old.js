var Users = require("../models").users;
var messages = [];

exports.index = function(req, res) {
  var query;
  if (req.session.user) {
    query = {
      _id: req.session.user.id
    };
    return Users.findOne(query, function(err, result) {
      var locals;
      if (!err) {
        locals = {
          user: result,
          loggedUser: req.session.user,
          messages: messages
        };
        return res.render("chat/index", locals);
      }
    });
  } else {
    req.session.destroy();
    return res.redirect("/users/login");
  }
};