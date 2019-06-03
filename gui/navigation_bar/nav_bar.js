$('nav li').click(function() {
    $.ajax({
        type: 'GET',
        url: './'+$(this).data('content'),
        dataType: 'html',
        success: function(response) {
            $('#display-content').html(response);
        }
    });
});

$(document).ready(function(){
    $('#display-content').load("buttons/buttons.html");
 });