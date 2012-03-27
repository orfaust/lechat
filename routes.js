var app;

exports.init = function(app)
{
    var chat = require('./controllers/chat');
    app.get('/', chat.index);

    var users = require('./controllers/users');
    app.get('/users/login', users.loginGet);
    app.get('/users/create', users.create);
    app.put('/users', users.insert);
    app.get('/users', users.index);
    app.post('/users/login', users.loginPost);
}