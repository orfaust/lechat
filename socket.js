var sio = require('socket.io')


module.exports = function(app) {
  var io = sio.listen(app, {log: false});
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