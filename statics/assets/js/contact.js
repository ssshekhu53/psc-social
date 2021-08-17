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

        $.ajax();
    }
})