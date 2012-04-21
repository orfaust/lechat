var assert = function(condition, message)
{
  if (! condition) {
    throw new Error(message || 'assert');
  }
};

var controller = require('./controller.js');

module.exports = function(app, options)
{
  assert(options, 'Parameter required: options');
  assert(options.controllers, 'Option required: options.controllers');
  assert(Array.isArray(options.controllers), 'Array required: options.controllers');

  var defaultAction = options.defaultAction || 'index';

  options.controllers.forEach(function(name)
  {
    var params = {
      name: name,
      defaultAction: defaultAction,
      debug: options.debug
    }
    var methods = require('./' + name);
    controller(params, app, methods);

    // bind default controller to root route
    if(options.defaultController && name == options.defaultController) {
      app.get('/', methods.get[defaultAction]);
    }
    //console.log(controller);
  });
};