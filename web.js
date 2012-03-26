/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');

var app = module.exports = express.createServer();

// Configuration

var pubPath = __dirname + '/public';

app.configure(function()
{
    app.set('env', 'development');
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
      app.use(express.methodOverride());

    // user stylus css engine
    app.use(require("stylus").middleware({
        src: pubPath,
        compress: true
    }));

    app.use(express.cookieParser());
    app.use(express.session({ secret: "keyboard cat" }));

    app.use(app.router);
    app.use(express.static(pubPath));
});

app.configure('development', function()
{
    app.set('view options', { layout: false, pretty: true });
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function()
{
    app.set('view options', { layout: false });
    app.use(express.errorHandler());
    app.use(express.logger());
});

// DB connection

//db = mongoose.connect('mongodb://localhost/lechat');
//db = mongoose.connect('mongodb://orfaust:3$ch3r@ds031657.mongolab.com:31657/heroku_app3477456');

// Routes

require('./routes').init(app);


var port = process.env.PORT || 300;
app.listen(port, function()
{
    console.log("Listening on " + port);
});

//mongodb://<user>:<password>@ds031657.mongolab.com:31657/heroku_app3477456