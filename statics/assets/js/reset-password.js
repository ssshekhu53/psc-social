$('#forgot-password-form').validate({
    rules: {
        email: {
            required: true
        },
    },
    messages: {
        email: {
            required: "You missed email address",
            email: "Enter a valid email address"
        },
    },
    errorPlacement: function(error, element) {
        error.appendTo( element.parent().parent().children('.input-error') );
    },
    submitHandler: function (form) {
        let fd=new FormData(form);
        let url=$(form).attr('action');
        $.ajax({
            type: 'POST',
            url: url,
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            beforeSend: () => {
                $(form).find('input, textarea, button').attr('disabled', true);
                $(form).find('button[type="submit"]').text('Requesting');
                $('#form-messages .alert').hide().removeClass('alert-danger');
            },
            success: function(response) {
                console.log(response);
                $(form).find('input, textarea, button').attr('disabled', false);
                $(form).find('button[type="submit"]').text('Request Reset Link');
                if(response.code==200) {
                    Swal.fire({
                        icon: 'success',
                        text: 'An email containing reset link has been sent to your email address',
                    }).then((response) => { window.location.href="/login" });
                }
                else if(response.code==404) {
                    $('#form-messages .alert').addClass('alert-danger').html(`<p class="h5">No account with this email address</p>`).show();
                }
                else {
                    $('#form-messages .alert').addClass('alert-danger').html(`<p class="h5">${response.message}</p>`).show();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus+' '+jqXHR+' '+errorThrown);
                $(form).find('input, textarea, button').attr('disabled', false);
                $(form).find('button[type="submit"]').text('Request Reset Link');
                $('#form-messages .alert').addClass('alert-danger').html('<p class="h5">We are facing litle issue. Comeback after a while.</p>').show();
                setTimeout(() => { $('#form-messages .alert').fadeOut(1000, () => { $('#form-message .alert').removeClass('alert-danger'); }); }, 3000);
            }
        });
    }
});

$('#reset-password-form').validate({
    rules: {
        password: 'required',
        cpassword: 'required',
    },
    messages: {
        password: 'Enter password',
        cpassword: 'Confirm Password',
    },
    errorPlacement: function(error, element) {
        error.appendTo( element.parent().parent().children('.input-error') );
    },
    submitHandler: function (form) {
        let fd=new FormData(form);
        let url=$(form).attr('action');
        if(fd.get('password')!=fd.get('cpassword')) {
            $('#form-messages .alert').addClass('alert-danger').html(`<p class="h5">Passwords did not match</p>`).show();
            return;
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            beforeSend: () => {
                $(form).find('input, textarea, button').attr('disabled', true);
                $(form).find('button[type="submit"]').text('Resetting');
                $('#form-messages .alert').hide().removeClass('alert-danger');
            },
            success: function(response) {
                console.log(response);
                $(form).find('input, textarea, button').attr('disabled', false);
                $(form).find('button[type="submit"]').text('Reset Password');
                if(response.code==200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Password Reset Successful',
                    }).then((response) => { window.location.href="/login" });
                }
                else if(response.code==404) {
                    $('#form-messages .alert').addClass('alert-danger').html(`<p class="h5">No account with this email address</p>`).show();
                }
                else {
                    $('#form-messages .alert').addClass('alert-danger').html(`<p class="h5">${response.message}</p>`).show();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus+' '+jqXHR+' '+errorThrown);
                $(form).find('input, textarea, button').attr('disabled', false);
                $(form).find('button[type="submit"]').text('Reset Password');
                $('#form-messages .alert').addClass('alert-danger').html('<p class="h5">We are facing litle issue. Comeback after a while.</p>').show();
                setTimeout(() => { $('#form-messages .alert').fadeOut(1000, () => { $('#form-message .alert').removeClass('alert-danger'); }); }, 3000);
            }
        });
    }
});

$(document).on('click', '.show-pwd-btn', function () {
   let ele= $(this).prev('input[type="password"]');
   let type=$(ele).attr('type');
   if(type==='text') {
       $(ele).attr('type', 'password');
       $(this).children('span').removeClass('fa-eye');
       $(this).children('span').addClass('fa-eye-slash');
   }
   else {
       $(ele).attr('type', 'text');
       $(this).children('span').removeClass('fa-eye-slash');
       $(this).children('span').addClass('fa-eye');
   }
});