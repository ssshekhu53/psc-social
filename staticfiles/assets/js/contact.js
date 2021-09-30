$('#contact-form').validate({
    rules: {
        name: 'required',
        email: {
            required: true,
            email: true,
        },
        phone: 'required'
    },
    messages: {
        name: "C'mon! You must gotta name",
        email: {
            required: "Don't hesitate to share your email",
            email: "You must be kidding, that's not an email"
        },
        phone: "C'mon! We don't drunk dial"
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
                $(form).find('button').text('Sending');
                $('#form-messages .alert').hide().removeClass('alert-danger');
            },
            success: function(response) {
                console.log(response);
                $(form).find('input, textarea, button').attr('disabled', false);
                $(form).find('button').text('Send');
                if(response.code==200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Message Sent',
                    });
                    $(form).trigger('reset');
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Message not sent',
                        text: 'Try after some time',
                    });
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus+' '+jqXHR+' '+errorThrown);
                $(form).find('input, textarea, button').attr('disabled', false);
                $(form).find('button').text('Send');
                $('#form-messages .alert').addClass('alert-danger').html('<p class="h5">We are facing litle issue. Comeback after a while.</p>').show();
                setTimeout(() => { $('#form-messages .alert').fadeOut(1000, () => { $('#form-message .alert').removeClass('alert-danger'); }); }, 3000);
            }
        });
    }
})