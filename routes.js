var app;

exports.init = function(app)
{
    var chat = require('./controllers/chat');
    app.get('/', chat.index);

    var users = require('./controllers/users');
    app.get('/users/login', users.loginGet);
    app.post('/users/login', users.loginPost);
}