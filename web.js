/**
 * Module dependencies.
 */

var express = require('express'),
    mongoose = require('mongoose')
    expressValidator = require('express-validator');

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
    app.use(expressValidator);

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

// Routes

require('./routes').init(app);

// DB connection

if(process.env.MONGOLAB_URI)
    db = mongoose.connect(process.env.MONGOLAB_URI);
else
    db = mongoose.connect('mongodb://localhost/lechat');


var port = process.env.PORT || 300;
app.listen(port, function()
{
    console.log("Listening on " + port);
});