$('#signup-form').validate({
    rules: {
        name: 'required',
        username: 'required',
        email: {
            required: true,
            email: true
        },
        password: 'required'
    },
    messages: {
        name: "You must have a name, don't you?",
        username: "Create a username",
        email: {
            required: "You missed email address",
            email: "That's not a valid email address"
        },
        password: "You forgot the password!"
    },
    errorPlacement: function(error, element) {
        error.appendTo( element.parent().parent().children('.input-error') );
    },
    submitHandler: function (form) {
        // let fd=new FormData(form);
        // let url=$(form).attr('action');
        // $.ajax({
        //     type: 'POST',
        //     url: url,
        //     data: fd,
        //     cache: false,
        //     contentType: false,
        //     processData: false,
        //     dataType: 'json',
        //     beforeSend: () => {
        //         $(form).find('input, textarea, button').attr('disabled', true);
        //         $(form).find('button').text('Sending');
        //         $('#form-messages .alert').hide().removeClass('alert-danger');
        //     },
        //     success: function(response) {
        //         console.log(response);
        //         $(form).find('input, textarea, button').attr('disabled', false);
        //         $(form).find('button').text('Send');
        //         if(response.code==200) {
        //             Swal.fire({
        //                 icon: 'success',
        //                 title: 'Message Sent',
        //             });
        //             $(form).trigger('reset');
        //         }
        //         else {
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Message not sent',
        //                 text: 'Try after some time',
        //             });
        //         }
        //
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         console.log(textStatus+' '+jqXHR+' '+errorThrown);
        //         $(form).find('input, textarea, button').attr('disabled', false);
        //         $(form).find('button').text('Send');
        //         $('#form-messages .alert').addClass('alert-danger').html('<p class="h5">We are facing litle issue. Comeback after a while.</p>').show();
        //         setTimeout(() => { $('#form-messages .alert').fadeOut(1000, () => { $('#form-message .alert').removeClass('alert-danger'); }); }, 3000);
        //     }
        // });
    }
});

$(document).on('click', '#show-pwd-btn', function () {
   let ele= $(this).prev('input[name="password"]');
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