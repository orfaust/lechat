(function ($) {

  $.fn.socketForm = function(socket) {
    return this.each(init);
    function init() {
      var $self = $(this);

      $self.submit(function() {
        return false;
      });

      $self.find('input').keyup(function (event) {
        if(event.keyCode == 13) {
          socket.emit($self.attr('action'));
        }
      });
    }
  };

})(jQuery);