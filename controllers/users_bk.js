var usersModel = require('../models').users;

var getLoggedUserData = function(req, callback) {
  if(req.session && req.session.user) {
    var id = req.session.user.id;
    usersModel.getUserById(id, function(user) {
      callback(user);
    });
  }
  else callback(false);
}

exports.loginGet = function(req, res) {
  var tplVars;
  tplVars = {
    errors: false,
    loggedUser: req.session.user,
    values: {
      email: '',
      password: ''
    }
  };
  return res.render('users/login', {
    locals: tplVars
  });
};

exports.loginPost = function(req, res)
{
  req.assert('email', '&rarr; valid email required').isEmail();
  req.assert('password', '&rarr; 6 to 20 characters required').len(6, 20);

  var errors = req.validationErrors(true);

  if (errors) {
    res.render('users/login', {
      locals: {
        loggedUser: false,
        errors: errors,
        values: req.body
      }
    });
    return;
  }
  errors = false;

  email = req.param('email');

  usersModel.findOne({email: email}, function(err, result) {
    if (err) {
      res.end(JSON.stringify(err));
    }
    else if (result && result.password === req.param('password')) {
      req.session.user = {
        id: result.id,
        name: result.name,
        email: result.email
      };
      res.redirect('/');
    }
    else {
      res.render('users/login', {
        locals: {
          loggedUser: false,
          errors: {login: 'Login failed'},
          values: req.body
        }
      });
    }
  });
};

exports.index = function(req, res) {

  getLoggedUserData(req, function(loggedUser) {
    if(! loggedUser || loggedUser.isAdmin == 0) {
      res.redirect('/');
    }
    else {
      usersModel.find(function(err, results) {
        var tplVars;
        if (!err) {
          tplVars = {
            loggedUser: loggedUser,
            users: results
          };
          return res.render('users/index', {
            locals: tplVars
          });
        }
      });
    }
  });
};

exports.create = function(req, res) {
  var tplVars = {
    action: '/users/insert',
    loggedUser: req.session.user,
    method: 'put',
    user: {
      name: '',
      email: '',
      password: '',
      password_again: ''
    },
    errors: false
  };
  return res.render('users/form', {
    locals: tplVars
  });
};

exports.insert = function(req, res) {
  var data, errors, tplVars;

  req.assert('name', '&larr; required').notEmpty();
  req.assert('name', '&larr; max 20 characters allowed').max(20);
  req.assert('email', '&larr; valid email required').isEmail();
  req.assert('password', '&larr; 6 to 20 characters required').len(6, 20);
  req.assert('password_again', '&larr; should match the password').equals(req.param('password'));

  errors = req.validationErrors(true);

  if (errors) {
    tplVars = {
      action: '/users/create',
      loggedUser: req.session.user,
      method: 'put',
      user: req.body,
      errors: errors
    };
    res.render('users/form', {
      locals: tplVars
    });
  }
  else {
    data = req.body;
    data.isAdmin = true;

    usersModel.create(data, function(err, data) {
      if (err)
        res.send(err);
      else
        res.redirect('/');
    });
  }
};

exports.logout = function(req, res) {
  req.session.destroy();
  return res.redirect('/');
};

exports.edit = function(req, res) {
  getLoggedUserData(req, function(loggedUser) {
    var denyAccess = true;

    // allow access to admin user
    if(loggedUser && loggedUser.isAdmin) {
      denyAccess = false;
    }
    var tplVars = {
      loggedUser: loggedUser,
      errors: false
    };
    usersModel.getUserById(req.param('id'), function(user) {
      // allow access if logged user is edit user
      if(user && user.id == loggedUser.id) {
        denyAccess = false;
      }
      else if(denyAccess) {
        res.render('common/denied', tplVars);
        return;
      }

      tplVars.action = '/users/update/' + user.id;
      tplVars.method = 'post';
      tplVars.user = user;

      res.render('users/form', {
        locals: tplVars
      });
    });
  });
};

exports.update = function(req, res) {
  getLoggedUserData(req, function(loggedUser) {
    var denyAccess = true;

    // allow access to admin user
    if(loggedUser && loggedUser.isAdmin) {
      denyAccess = false;
    }
    var tplVars = {
      loggedUser: loggedUser,
      errors: false
    };
    usersModel.getUserById(req.param('id'), function(user) {

      // allow access if logged user is edit user
      if(user && user.id == loggedUser.id) {
        denyAccess = false;
      }

      if(denyAccess) {
        res.render('common/denied', tplVars);
        return;
      }

      req.assert('name', '&larr; required').notEmpty();
      req.assert('name', '&larr; max 20 characters allowed').max(20);
      req.assert('email', '&larr; valid email required').isEmail();
      req.assert('password', '&larr; 6 to 20 characters required').len(6, 20);
      req.assert('password_again', '&larr; should match the password').equals(req.param('password'));

      var errors = req.validationErrors(true);

      if (errors) {
        tplVars = {
          action: '/users/update/' + user.id,
          loggedUser: loggedUser,
          method: 'post',
          user: req.body,
          errors: errors
        };

        res.render('users/form', {
          locals: tplVars
        });
        return;
      }
      data = req.body;

      usersModel.update({_id: req.param('id')}, data, function(err) {
        if (err) {
          res.end(err);
          return;
        }
        res.redirect('/users');
      });
    });
  });
};

exports.remove = function(req, res) {
  getLoggedUserData(req, function(userData) {
    if(! userData || userData.isAdmin == 0) {
      res.redirect('/');
    }
    else {
      usersModel.remove({_id: req.param('id')}, function(err) {
        if (err) {
          console.log(err);
          res.end(JSON.stringify(err));
        }
        else {
          res.redirect('/users');
        }
      });
    }
  });
};
