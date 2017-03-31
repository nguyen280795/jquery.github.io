//gửi dữ liệu qua file php
function  load_ajax(){
    error_username();
    error_password();
    error_email();
    if (error_username() === true && error_password() === true && error_email() === true) {
        $.ajax({
            url: "server/formajax.php",
            type: "post",
            dateType: "text",
            data: {
                username: $('#username').val(),
                password: $('#password').val(),
                email: $('#email').val()
            },
            success: function (result) {
                alert(result);
            }
        });
    }

}
//////////////////////Validate///////////////////
//validate username
function error_username() {
    var username =$('#username').val();
    if (username.length < 8) {
        $('#error_username').html('Username length min 8 letter');
        return false;
    } else {
        $('#error_username').html('');
        return true;
    }
}
//validate password
function error_password() {
    var password =$('#password').val();
    if (password.length < 8) {
        $('#error_password').html('Password length min 8 letter');
        return false;
    } else {
        $('#error_password').html('');
        return true;
    }
}
// validate email
function error_email() {
    var email =$('#email').val();
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
        $('#error_email').html('Email wrong format');
        return false;
    }
    else {
        $('#error_email').html('');
        return true;
    }
}