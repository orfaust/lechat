(function ($) {

  $(function () {
    $('.element-handler').elementHandler();
  });

  $.fn.elementHandler = function() {
    return this.each(init);
    function init() {
      var $self = $(this);
      var $target = $($self.attr('href'));
      if($target.size() == 0) {
        throw new Error('target not found');
      }
      $target.hide();
      $self.click(function (event) {
        event.preventDefault();
        $self.hide();
        $target.show();
        $target.find('input:first').focus();
      });
    }
  };

})(jQuery);