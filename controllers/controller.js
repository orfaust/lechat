module.exports = function(params, app, methods) {

  var self = this;
  self.root = '/' + params.name;
  //self.app = app;
  self.customRoutes = methods.customRoutes;

  (function() {
    var statements = [];

    // generate routing statements
    for (var methodName in methods) {
      var method = methods[methodName];
      if(methodName == 'customRoutes')
        continue;

      for (var actionName in method) {
        if (actionName == params.defaultAction) {
          var defaultStatement = getStatement(methodName, actionName, getRoute());
          //statements.push(defaultStatement);
          evalStatement(defaultStatement);
        }
        var action = method[actionName];
        var statement = getStatement(methodName, actionName);
        //statements.push(statement);
        evalStatement(statement);
      }
    }
  })();

  function evalStatement(statement) {
    if(params.debug) {
      console.log('executing', statement);
    }
    try {
      eval(statement);
    }
    catch(err) {
      throw new Error('could not execute ' + statement);
    }
  }

  function getRoute(actionName) {
    var action = actionName ? '/' + actionName : '';
    return "'" + self.root + action + "'";
  }

  function getStatement(methodName, actionName, route) {

    if(route === undefined) {
      if(self.customRoutes !== undefined) {
        var customRoutes = self.customRoutes[methodName];

        if(customRoutes !== undefined) {
          var customRoute = customRoutes[actionName];
          if(customRoute !== undefined)
            route = "'" + self.root + customRoute + "'";
        }
      }
    }
    if(route === undefined) {
      route = getRoute(actionName);
    }

    // statement sample: 'app.method(route, function);''
    return 'app.' + methodName + '(' + route + ', methods.' +
            methodName + '.' + actionName + ');';
  };
};