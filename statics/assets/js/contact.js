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

        $.ajax({
            type: 'POST',
            url: 'enquiries/add-enquiry',
            data: fd,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            beforeSend: () => {
                $(form).find('input, textarea, button').attr('disabled', true);
                $(form).find('button .visible').text('Sending');
                $('#form-messages .alert').hide().removeClass('alert-danger');
            },
            success: function(response) {
                console.log(response);
                $(form).find('input, textarea, button').attr('disabled', false);
                $(form).find('button .visible').text('Send Message');
                if(response.code==200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Message Sent',
                    }).then(result => window.location.reload());
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
                $(form).find('button .visible').text('Send Message');
                $('#form-messages .alert').addClass('alert-danger').html('<p class="h5">We are facing litle issue. Comeback after a while.</p>').show();
                setTimeout(() => { $('#form-messages .alert').fadeOut(1000, () => { $('#form-message .alert').removeClass('alert-danger'); }); }, 3000);
            }
        });
    }
})