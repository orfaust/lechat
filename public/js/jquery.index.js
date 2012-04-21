var $input = $('input').focus();
var $msgContainer = $('#messages-container');

var refreshDelay = 2000;
setTimeout(refresh, refreshDelay);
function refresh(skipLoop)
{
    console.log('refresh');

    $.ajax({
        url: 'messages'
      , success: ajaxSuccess
    });

    if(! skipLoop)
        setTimeout(refresh, refreshDelay);

    function ajaxSuccess(messages)
    {
        if(messages == 0 && messages.length == 0)
            return;

        for(var i in messages)
        {
            var message = messages[i];
            var $from = $('<span class="user"/>').text(message.from);
            var $msg = $('<span class="msg"/>').text(message.msg);
            $('<p/>')
                .append($from)
                .append(': ')
                .append($msg)
                .appendTo($msgContainer);
        }
        $msgContainer.parent().scrollTo($msgContainer.height());
    }
}

var $form = $('form');
$form.submit(function(event)
{
    event.preventDefault();
    var msg = $input.val().trim();
    if(msg.length == 0)
        return;

    $.ajax({
        url: $form.attr('action')
      , type: $form.attr('method')
      , data: $form.serialize()
      , success: ajaxSuccess
    });

    function ajaxSuccess(data)
    {
        $input.val('');
        refresh(true);
    }
});

$('.test').click(function()
{
    for(var x = 0; x < 1000; x ++)
    {
        $input.val(x);
        $form.submit();
    }
});