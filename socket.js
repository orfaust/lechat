var sio = require('socket.io')

module.exports = function(app) {
  var io = sio.listen(app, {log: false});

  // heroku cedar configuration
  io.configure(function () { 
    io.set("transports", ["xhr-polling"]); 
    io.set("polling duration", 10); 
  });

  io.sockets.on('connection', onConnection);
};

function onConnection(socket) {
  console.log(socket.id);

  socket.get('logged', function (logged) {
    if(logged) {
      // login
    } else {
      socket.emit('request nickname');
    }
  });

  socket.on('set nickname', function(nickname) {

  });
};