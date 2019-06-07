const {BrowserWindow} = require('electron').remote


// MINIMIZE MAXIMIZE AND CLOSE CUSTOM BUTTONS
// -----------------------------------------------------------
$('#close_button').click(function(){
    var window = BrowserWindow.getFocusedWindow();
    window.close();
});

$('#maximize_button').click(function(){
    var window = BrowserWindow.getFocusedWindow();
    if(window.isMaximized()){
        window.unmaximize();
    }else{
        window.maximize();
    }
});

$('#minimize_button').click(function(){
    var window = BrowserWindow.getFocusedWindow();
    window.minimize();
});
// -----------------------------------------------------------






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