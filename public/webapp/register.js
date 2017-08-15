function register(event) {
    event.preventDefault();
    var name = $('#name').val();
    var emailaddress = $('#emailaddress').val();
    var username = $('#username1').val();
    var password = $('#password1').val();

    if (name.length > 0 && username.length > 0 && emailaddress.length > 0 && password.length > 0) {
        $('#register-button').removeClass('animated shake');
        $('#register-button').addClass('animated bounceIn');
        $("#register-button").html("Creating User...");
        
        $.post(window.endpoint + 'register', {
            Name: name,
            UserName: username,
            EmailAddress: emailaddress,
            Password: password
        }, function(res) {
            setTimeout(function(){ $("#register-button").html("User Created."); setTimeout(function(){$('.login').removeClass('hide');$('.register').addClass('hide')}, 500)}, 500);
            
        console.log(res)

        })
        .fail(function(error) {
            $('#register-button').removeClass('animated bounceIn');
            $('#register-button').addClass('animated shake');
            $("#register-button").html("Try Again");
            if (error.responseJSON.error)
                $("#register-failed p.lead").text(error.responseJSON.error);
            $("#register-failed").show();
        });
    } else {
        $("#register-failed p.lead").text("Please check input.");
        $("#register-failed").show();
    }
}