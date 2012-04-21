(function ($) {

  var socket = io.connect();

  var $login;

  $(function () {
    $login = $('.login');

    $('.socket-form').socketForm(socket);

    // activate register socket-form plugin on handler click
    $('#register-handler').click(function() {
      $('#register-form').socketForm(socket);
    });

    socket.on('connect', function() {});
  });

  socket.on('request nickname', function() {
    $login.show()
      .find('input:first').focus();
  });

})(jQuery);