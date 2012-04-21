class Users
  constructor: (app)->
    app.get '/users', @index
    app.get '/users/login', @login

  login: (req, res)->
    res.end 'login'

  index: (req, res)->
    res.end 'index'


module.exports = (app)->
  new Users app