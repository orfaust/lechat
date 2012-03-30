exports.init = function(app)
{
    var chat = require('./controllers/chat');
    app.get('/', chat.index);

    var users = require('./controllers/users');
    app.get('/users/login', users.loginGet);
    app.get('/users/create', users.create);
    app.get('/users/create/:encoded_email', users.create);
    app.put('/users', users.insert);
    app.get('/users', users.index);
    app.post('/users/login', users.loginPost);
    app.get('/users/logout', users.logout);
    app.del('/users/:id', users.remove);
    app.get('/users/:id', users.edit);
    app.post('/users/:id', users.update);
}