var tokenString;
var userId;
function login(event) {
    event.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();
    if (username.length > 0 && password.length > 0) {
        $('#login-button').removeClass('animated shake');
        $('#login-button').addClass('animated bounceIn');
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
            $("#login-button").html("Try Again");
            if (error)
                $("#login-failed p.lead").text(error);
            $("#login-failed").show();
            $("#login-failed").show();
        });
    } else {
        $("#login-failed p.lead").text("Please check input.");
        $("#login-failed").show();
    }
}

function signup(event){

    $('.login').addClass('hide');
    $('.register').removeClass('register')

}
