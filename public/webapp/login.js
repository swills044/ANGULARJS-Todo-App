var tokenString;
var userId;
function login(event) {
    event.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();
    if (username.length > 0 && password.length > 0) {
        $("#login-button").html("Logging in...");
        $.post(window.endpoint + 'login', {
            UserName: username,
            Password: password
        }, function(token) {
            setTimeout(function() {

                tokenString = token.TokenString;
                userId = token.UserId;
                localStorage.setItem('tokenString', tokenString);
                localStorage.setItem('UserId', userId);
                location.href = 'webapp/index.html';

            }, 100);
        })
        .fail(function(error) {
            $('#login-button').removeClass('animated bounceIn');
            $('#login-button').addClass('animated shake');
            $("#login-button").html(error.responseText);
        });
    } else {
        $("#login-failed p.lead").text("Please check input.");
        $("#login-failed").show();
    }
}

$(document).on('click', '.below button', function(){
  var belowCard = $('.below'),
  aboveCard = $('.above'),
  parent = $('.form-collection');
  parent.addClass('animation-state-1');
  setTimeout(function(){
    belowCard.removeClass('below');
    aboveCard.removeClass('above');
    belowCard.addClass('above');
    aboveCard.addClass('below');
    setTimeout(function(){
      parent.addClass('animation-state-finish');
      parent.removeClass('animation-state-1');
      setTimeout(function(){
        aboveCard.addClass('turned');
        belowCard.removeClass('turned');
        parent.removeClass('animation-state-finish');
      }, 300)
    }, 10)
  }, 300);
});
