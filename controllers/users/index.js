var all  = exports.all  = {},
    get  = exports.get  = require('./get'),
    post = exports.post = require('./post');

var customRoutes = exports.customRoutes = {  all: {
    initUser : '/:id/:op?'
  },
  get: {
    edit: '/:id/edit'
  },
  post: {
    update: '/:id/update'
  }
};

all.initUser = function(req, res, next) {
  req.user = {email: 'carlorfeo@gmail.com', name: 'orfaust'};
  next();
};