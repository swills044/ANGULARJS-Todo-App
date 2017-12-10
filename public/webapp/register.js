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
            setTimeout(function(){ $(".signup-btn").html("User Created.")});
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
        })
        .fail(function(error) {
            $('#register-button').removeClass('animated bounceIn');
            $('#register-button').addClass('animated shake');
            $("#register-button").html(error.responseText);
        });
    } else {
        $("#register-failed p.lead").text("Please check input.");
        $("#register-failed").show();
    }
}
