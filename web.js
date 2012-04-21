var express = require("express"),
    mongoose = require("mongoose"),
    expressValidator = require("express-validator");

var app = module.exports = express.createServer(),
    basePath = __dirname;

var pubPath = basePath + "/public";

app.configure(function() {
  app.set("env", "development");
  app.set("views", basePath + '/views');
  app.set("view engine", "jade");
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(expressValidator);
  app.use(require("stylus").middleware({
    src: pubPath,
    compress: true
  }));
  app.use(express.cookieParser());

  var hour = 3600000;
  app.use(express.session({
    secret: 'f3f3%GGW$5gs6ryhgfgfd',
    key: 'lechat',
    cookie: { path: '/', httpOnly: true, maxAge: hour * 3 }
  }));
  app.use(app.router);
  app.use(express.static(pubPath));
});

app.configure("development", function() {
  app.set("view options", {
    layout: false,
    pretty: true
  });
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure("production", function() {
  app.set("view options", {
    layout: false
  });
  app.use(express.errorHandler());
  app.use(express.logger());
});

// controllers
require('./controllers')(app, {
  defaultController: 'chat',
  controllers: ['chat'],
  debug: true
});

//mongodb
var db;
if (process.env.MONGOLAB_URI) {
  db = mongoose.connect(process.env.MONGOLAB_URI);
} else {
  db = mongoose.connect("mongodb://localhost/lechat");
}

// init Socket.IO server
require('./socket')(app);

// listen
var port = process.env.PORT || 300;

app.listen(port, function() {
  console.log("Listening on " + port);
});
